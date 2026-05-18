---
title:  "AI챗봇 도우미 (글 자동 감지)"
layout: post
categories: [etc, blog]
description: "블로그 특화 AI 챗봇 '비사'를 Cloudflare Worker + Gemini API로 구축하고, GitHub Actions로 포스트를 자동 감지·연동하는 전 과정을 기록합니다."
tags: [blog, cloudflare, gemini, github-actions, jekyll]
toc: true
toc_sticky: true
date: 2026-05-18
---

# AI챗봇 도우미, 봇이 자동으로 글 감지

## 🙋‍♂️ 들어가며

블로그에 글을 올릴 때마다 챗봇이 자동으로 새 포스트를 인식해서 방문자 질문에 답해준다면 어떨까?

이번에 특화된 알고리즘 학습 블로그 전용 AI 챗봇 **'비사'** 를 만들면서 딱 그 구조를 완성했다. Cloudflare Worker를 백엔드로 삼고, Gemini API를 두뇌로, GitHub Actions를 자동화 파이프라인으로 연결한 시스템이다.

아래에서 전체 구조와 삽질 과정을 정리한다.

---

## 1. 전체 구조 한눈에 보기

```text
[글 작성] *.md push
    ↓
[GitHub Actions] sync-problems-json.yml
    ↓
[scripts] generate_problems_json.py 실행
    ↓
[산출] problems.json × 2 (_posts/… + assets/data/)
    ↓
[Jekyll 배포] https://joonk2.github.io/assets/data/problems.json
    ↓
[챗봇 Worker] 5분 캐시 후 fetch → Gemini API → 답변 생성
```

핵심은 세 가지다.

- **Cloudflare Worker**: API 키를 숨기고 Gemini를 중계하는 백엔드
- **scripts/ + assets/data/**: 포스트 메타데이터를 JSON으로 자동 생성·배포
- **GitHub Actions**: md 파일 push만 해도 JSON이 자동 커밋되는 CI


<br>
_챗봇이 블로그 포스트를 인식하는 전체 흐름_

---

<br><br><br><br><br><br>

## 2. Cloudflare Worker 설정 (백엔드)
### 왜 Cloudflare인가
API 키처럼 공개되면 안 되는 값을 안전하게 관리하려면 서버가 필요하다. 비용 없이 쓸 수 있는 옵션을 찾다가 **Oracle Cloud**와 **Cloudflare**를 알게 됐다.

Oracle Cloud는 무료 티어가 꽤 넉넉하다고 알려져 있지만, 신청 절차가 복잡하고 심사 과정에서 계정 생성에 실패한 적이 있었다. 이미 한 번 막혀본 경험이 있으니 다시 도전하기가 꺼려졌다.

반면 Cloudflare Workers는 가입 후 바로 배포할 수 있고, 무료 티어에서 하루 10만 건의 요청을 처리할 수 있어 개인 블로그 수준에서는 충분하다. 그래서 Cloudflare를 선택했다.

### 왜 Worker를 백엔드로 쓰는가

HTML/JS에 Gemini API 키를 그대로 두면 누구나 소스를 열어 키를 볼 수 있다. Worker가 키를 환경 변수로 보관하고 프론트엔드는 Worker URL만 호출한다.

### 2-1. Worker 생성 및 기본 코드

Cloudflare 대시보드에서 `blog-chatbot`이라는 이름의 Worker를 생성하고 아래 코드를 배포한다.

- **Worker 주소**: `https://blog-chatbot.with-joonk.workers.dev`

```javascript
export default {
  async fetch(request, env) {
    // CORS 설정: 모든 도메인에서의 요청 허용
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // Preflight 요청 처리
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // POST 요청만 허용
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const body = await request.json();
      const message = body.message;

      // Gemini API 호출 (Worker 환경 변수에 저장된 GEMINI_API_KEY 사용)
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }]
          })
        }
      );

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: corsHeaders
      });
    }
  }
}
```

### 2-2. 환경 변수(Secret) 설정

API 키 노출을 막기 위해 Worker 설정에서 환경 변수를 등록한다.

- **경로**: `Settings → Variables → Environment Variables`
- **Variable name**: `GEMINI_API_KEY`
- **Value**: 발급받은 실제 Gemini API 키

### 2-3. 블로그 프론트엔드 수정

기존에는 `localStorage`로 API 키를 관리하며 Google API를 직접 호출하는 구조였다. Worker 도입 후 두 가지를 바꿨다.

**삭제한 것:**
- `localStorage`를 사용하던 `API_KEY` 변수 및 `saveApiKey` 함수
- 사용자에게 키를 입력받던 `#api-key-overlay` HTML 요소 및 관련 CSS

**변경한 것:** `sendMessage` 함수가 Google API 대신 Worker URL을 호출하도록 수정

```javascript
async function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    input.value = '';
    document.getElementById('typing-indicator').style.display = 'block';

    try {
        const response = await fetch('https://blog-chatbot.with-joonk.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: `(프롬프트 내용 포함) 사용자 질문: ${text}` 
            })
        });
        
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '응답이 없어요 😿';
        appendMessage('bot', reply);
    } catch (e) {
        console.error('Chat Error:', e);
        appendMessage('bot', '서버 연결 실패 😿');
    } finally {
        document.getElementById('typing-indicator').style.display = 'none';
    }
}
```

이로써 클라이언트 코드(HTML/JS)에 API 키가 전혀 남지 않아 탈취 위험이 사라졌다.

### 2-4. V2: 블로그 포스트 자동 인식

단순 API 중계에서 한 발 더 나아가, Worker가 블로그 JSON을 실시간으로 읽어 Gemini에 컨텍스트로 넘기도록 업그레이드했다.

**작동 원리:**
1. 사용자가 질문하면 Worker가 블로그의 `assets/js/data/search.json`을 실시간으로 읽는다
2. 최신순으로 포스트 10개의 정보를 추출한다
3. 추출된 정보를 Gemini에게 "이게 주인장의 최신 활동이야"라고 알려주며 답변을 생성한다

기존 코드를 모두 지우고 아래 코드로 교체한다.

```javascript
export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

    try {
      const { message } = await request.json();

      // 1. 블로그의 최신 포스트 정보 가져오기
      const searchRes = await fetch("https://joonk2.github.io/assets/js/data/search.json");
      const posts = await searchRes.json();

      // 최신 포스트 10개 요약 (날짜, 제목, 카테고리)
      const recentPostsSummary = posts
        .slice(0, 10)
        .map(p => `- ${p.date.split(' ')[0]}: ${p.title} (${p.categories})`)
        .join('\n');

      // 2. 고양이 집사 페르소나와 최신 정보를 조합한 시스템 프롬프트 구성
      const systemPrompt = `너는 고준환(Joonhwan.K)의 기술 블로그 '어서오시게'의 집사 고양이야.
[응답 규칙]
1. 아주 친절하고 귀엽게 말하되, 답변은 핵심만 간단히 3~4문장 이내로 해줘냥.
2. 말끝에 '냥', '야옹'을 꼭 붙여줘냥.
3. 아래 [최근 포스트 정보]를 참고해서 주인장의 최근 활동(문제 번호, 알고리즘 종류 등)을 정확하게 답변해줘냥.

[최근 포스트 정보]
${recentPostsSummary}

사용자 질문: ${message}`;

      // 3. Gemini API 호출
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
          }),
        }
      );

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  }
}
```

이렇게 하면 주인장이 새 글을 올릴 때마다 챗봇이 자동으로 그 글을 인식한다.

---

<br><br><br><br><br><br>

## 3. 3개 구성요소: JSON 자동화 파이프라인
### 3-1. `scripts/` — JSON 생성 엔진
`scripts/generate_problems_json.py`가 `_posts/coding-test/datastructure-algorithm/` 아래 `.md` 파일을 스캔하여 아래 형식의 JSON을 만든다.

```json
{
  "test": "",
  "title": "",
  "problem_num": "",
  "level": "",
  "algorithm": ""
}
```

- `boj`가 파일명에 포함된 글은 제외 (개인 연습용)
- `programmers-` / `swea-` 파일명으로 출처 자동 분류
- 알고리즘 태그는 `dp`, `bfs`, `backtracking` 등 15종 허용

로컬 실행:

```bash
python scripts/generate_problems_json.py
```

### 3-2. `assets/data/` — 공개 배포용 JSON

Jekyll은 `assets/` 하위 파일을 그대로 사이트 루트에 복사한다. 덕분에 배포 후 아래 URL이 항상 200으로 열린다.

```
https://joonk2.github.io/assets/data/problems.json
```

챗봇 Worker가 이 URL 하나로 전체 문제 목록을 로드하는 공식 엔드포인트다.

| 위치 | 이유 |
|------|------|
| `_posts/.../problems.json` | PR diff·리뷰 편의 |
| `assets/data/problems.json` | 챗봇 Worker가 fetch하는 공개 엔드포인트 |

### 3-3. `.github/workflows/sync-problems-json.yml` — CI 자동화

```yaml
on:
  push:
    branches: [main]
    paths:
      - '_posts/coding-test/datastructure-algorithm/**/*.md'
      - 'scripts/generate_problems_json.py'
  workflow_dispatch:

permissions:
  contents: write
```

md 파일을 push하면 Actions가 스크립트를 돌리고 변경이 있을 때만 자동 커밋한다.

```
chore: sync problems.json from coding-test posts
```

JSON만 바뀐 커밋은 workflow를 다시 트리거하지 않아 무한 루프가 발생하지 않는다.

---

위의 과정을 거치고 직접 테스트를 해보았는데, 어라? 응답이 이상하다

![Desktop View](/assets/img/blog/chatbot/2026-05-18/problem_cognition.jpg)

<br>

이에 트러블슈팅을 하게 되었고, 이는 다음과 같은 문제들을 찾을 수 있었다.

<br><br><br><br><br><br>

## 4. 트러블슈팅 모음

만들면서 만난 대표적인 문제들이다.

### ❌ 문제 1: Gemini API 지역 제한

Cloudflare Worker는 전 세계 노드에서 실행되는데, 특정 노드(유럽 등)에서 API를 호출하면 `"User location is not supported"` 에러가 발생했다.

**해결:** `v1beta` 대신 안정적인 `v1` 엔드포인트로 전환하고, "안녕", "ㅎㅇ" 같은 단순 인사말은 API를 거치지 않고 Worker 내부에서 즉시 응답하도록 `isGreeting` 로직을 추가해 API 호출 빈도를 줄였다.

### ❌ 문제 2: 블로그 링크 404

챗봇이 추천한 링크를 클릭하면 404가 떴다. 원인은 URL 슬러그 불일치였다. `generate_problems_json.py`가 파일명 전체(`26-02-11-title.md`)를 슬러그로 썼는데, Jekyll은 앞의 날짜 부분을 뺀 제목만 슬러그로 쓰고 있었다.

**해결:** `build_post_url` 함수에 정규표현식으로 날짜 패턴을 제거하는 로직을 추가했다.

### ❌ 문제 3: 멀티 알고리즘 태그 미지원

BFS + 그리디처럼 여러 알고리즘이 섞인 문제는 검색 결과에 한쪽만 나왔다. 데이터 구조가 알고리즘 태그를 하나만 허용했기 때문이다.

**해결:** 콤마(`,`)로 구분된 복수 태그를 처리하도록 스크립트와 챗봇 검색 엔진을 수정했다. 예시: `"algorithm": "bfs, greedy"`.

### ❌ 문제 4: 단순 텍스트 URL 불편

추천 결과가 텍스트 URL이라 복사해서 주소창에 붙여넣어야 했다.

**해결:** 봇 응답에서 마크다운 링크와 URL을 감지해 클릭 가능한 `🚀 풀이 보기` 버튼으로 자동 변환하는 함수를 `chatbot.html` 프론트엔드에 추가했다.

---

<br><br>

트러블 슈팅 이후 결과는 다음과 같게 , `풀이보기` 클릭시 링크 이동이 된다.

#### 📌 소개
![Desktop View](/assets/img/blog/chatbot/2026-05-18/chatbot-hi.jpg)

<br><br>

#### 📌 맞춤형 학습
![Desktop View](/assets/img/blog/chatbot/2026-05-18/chatbot-link.jpg)

<br><br><br><br><br><br>

## 5. 최종 개선 결과

| 항목 | 이전 | 이후 |
|------|------|------|
| API 키 관리 | 클라이언트 코드에 노출 | Cloudflare 환경 변수로 격리 |
| 포스트 인식 | 수동 JSON 관리 | md push → Actions → 자동 커밋 |
| 챗봇 링크 | 404 발생 | 실제 블로그 URL과 100% 일치 |
| 알고리즘 검색 | 단일 태그만 지원 | 복합 태그 지원 |
| UI | 좁은 모바일 프레임 (380px) | 카카오톡 스타일 (최대 600px) |
| 링크 형태 | 텍스트 URL | 클릭 가능한 버튼 |

---

<br><br><br><br><br><br>

## 🔗 관련 파일

| 파일 | 역할 |
|------|------|
| `scripts/generate_problems_json.py` | 포스트 스캔 → JSON 생성 |
| `assets/data/problems.json` | 챗봇 Worker용 공개 엔드포인트 |
| `.github/workflows/sync-problems-json.yml` | md push 시 JSON 자동 커밋 |
| `chatbot.html` | 카카오톡 스타일 프론트엔드 |
