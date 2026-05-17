# problems.json 자동화 — 3개 구성요소 변경 요약

블로그 코딩테스트 글(`_posts/coding-test/datastructure-algorithm/*.md`)을 기반으로  
문제 메타데이터 JSON을 **자동 생성·배포·챗봇 연동**할 수 있게 만든 변경 사항 정리.

---

## 한눈에 보기

| 구성요소 | 역할 | Before | After |
|----------|------|--------|-------|
| `scripts/` | JSON **생성 로직** | 수동으로 JSON 작성·갱신 | 마크다운 스캔 → 규칙에 맞게 자동 생성 |
| `assets/data/` | **공개 배포**용 JSON | 없음 | 사이트 URL로 챗봇이 fetch 가능 |
| `.github/workflows/sync-problems-json.yml` | **자동 실행·커밋** | 없음 | md push 시 Actions가 스크립트 실행 후 JSON 커밋 |

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
[챗봇 Worker] 5분 캐시 후 fetch (별도 연동)
```

---

## 1. `scripts/` — 생성 엔진

### 추가된 파일

```
scripts/generate_problems_json.py
```

### 하는 일

1. `_posts/coding-test/datastructure-algorithm/` 아래 `.md` 파일을 파일명 순으로 읽음
2. **제외:** 파일명에 `boj` 포함, `.md`가 아닌 파일
3. frontmatter의 `title`, `tags`와 파일명(`programmers-`, `swea-`)으로 항목 생성
4. 아래 **두 경로에 동일한 JSON**을 씀

| 출력 경로 | 용도 |
|-----------|------|
| `_posts/coding-test/datastructure-algorithm/problems.json` | 레포 안에서 diff·리뷰 |
| `assets/data/problems.json` | Jekyll 정적 파일 → 챗봇 URL |

### JSON 항목 형식

```json
{
  "test": "",
  "title": "",
  "problem_num": "",
  "level": "",
  "algorithm": ""
}
```

- **programmers** / **swea** / **개념 글** 분류는 파일명·title 규칙 적용
- `algorithm`은 허용 15종만 (`dp`, `bfs`, `backtracking` 등)
- programmers는 `PROG_REF` 맵으로 level·title·algorithm 보정 (29문항)

### 로컬 실행

```bash
python scripts/generate_problems_json.py
```

- 현재 기준 **59개** 항목 생성 (boj 9개 md 제외)
- 내용 변경 없으면 `unchanged`만 출력하고 파일 덮어쓰지 않음

### 이전 대비 변화

| 이전 | 이후 |
|------|------|
| Cursor/수동으로 JSON 배열 작성 | 글만 올리면 스크립트가 전체 재생성 |
| 규칙 불일치·누락 가능 | tags/파일명 규칙을 코드로 고정 |
| 한 곳만 관리 | 레포용 + 배포용 2곳 동시 갱신 |

---

## 2. `assets/data/` — 배포·챗봇용 공개 JSON

### 추가된 파일

```
assets/data/problems.json
```

### 하는 일

- Jekyll 빌드 시 `assets/` 하위 파일은 **그대로 사이트 루트에 복사**됨
- 배포 후 브라우저·Worker에서 HTTP로 접근 가능

### 공개 URL

```
https://joonk2.github.io/assets/data/problems.json
```

### 이전 대비 변화

| 이전 | 이후 |
|------|------|
| JSON이 `_posts/` 안에만 있으면 URL로 안 열릴 수 있음 | 정적 asset으로 **항상 200 JSON** 제공 |
| 챗봇이 글 목록을 알기 어려움 | Worker가 한 URL로 전체 문제 목록 로드 가능 |

### 왜 `_posts/.../problems.json`과 둘 다 두나?

| 위치 | 이유 |
|------|------|
| `_posts/.../problems.json` | 코딩테스트 폴더와 같이 두어 관리·PR diff 편의 |
| `assets/data/problems.json` | **챗봇·외부 도구**가 fetch하는 공식 엔드포인트 |

내용은 스크립트가 **항상 동일하게** 맞춤.

---

## 3. `.github/workflows/sync-problems-json.yml` — CI 자동화

### 추가된 파일

```
.github/workflows/sync-problems-json.yml
```

### 트리거

| 이벤트 | 조건 |
|--------|------|
| `push` | 브랜치 `main` + 경로 변경 |
| `workflow_dispatch` | Actions 탭에서 수동 실행 |

**감시 경로 (`paths`):**

- `_posts/coding-test/datastructure-algorithm/**/*.md`
- `scripts/generate_problems_json.py`

→ **JSON만 바뀐 커밋은 workflow를 다시 돌리지 않음** (무한 루프 방지).

### 실행 단계

1. `checkout`
2. Python 3.11 설치
3. `python scripts/generate_problems_json.py`
4. `problems.json` 2개 파일 diff 확인
5. 변경 있으면 `github-actions[bot]`으로 커밋 후 push  
   - 메시지: `chore: sync problems.json from coding-test posts`

### 권한

```yaml
permissions:
  contents: write
```

→ bot이 JSON 커밋·push 가능.

### 이전 대비 변화

| 이전 | 이후 |
|------|------|
| 글 push 후 JSON을 사람이 따로 갱신 | **md push만 하면** JSON이 자동 커밋 |
| 배포 URL JSON이 최신이 아닐 수 있음 | Actions → 커밋 → Jekyll 배포까지 연쇄 반영 |
| 로컬에서만 스크립트 실행 | 서버(CI)에서도 동일 규칙으로 생성 |

---

## 전체 흐름 (사용자 관점)

1. `26-05-20-programmers-12345.md` 같은 글을 작성해 `main`에 push
2. **sync-problems-json** workflow 자동 실행
3. `scripts/generate_problems_json.py`가 59→60개 항목으로 JSON 재생성
4. bot이 `problems.json` 2곳 커밋
5. Jekyll 배포 후 `assets/data/problems.json` URL 갱신
6. 챗봇 Worker가 (5분 캐시 후) 새 목록 반영

**사용자가 직접 할 일:** 마크다운 글 작성·push (+ programmers 신규 문제면 `PROG_REF`에 한 줄 추가).

---

## 관련 문서

| 문서 | 내용 |
|------|------|
| `docs/coding-test-problems-json-sync.md` | 요구사항·규칙 전체 |
| `docs/worker-problems-cache-example.js` | 챗봇 Worker 5분 캐시 예시 |

---

## 체크리스트 (적용 후 확인)

- [ ] `main`에 workflow·script·`assets/data/problems.json` push 됨
- [ ] Actions → **Sync problems.json** 성공
- [ ] `https://joonk2.github.io/assets/data/problems.json` 접속 시 JSON 배열 표시
- [ ] 테스트 md push 후 bot 커밋 `chore: sync problems.json...` 생성
- [ ] Worker에 fetch + 캐시 코드 반영 (선택)
