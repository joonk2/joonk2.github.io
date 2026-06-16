# Google SEO 노출 진단 보고서

**대상 사이트:** [https://joonk2.github.io](https://joonk2.github.io)  
**저장소:** `joonk2.github.io` (Jekyll + Chirpy 테마)  
**진단 일자:** 2026년 6월 17일  
**총 포스트 수:** 128개

---

## Executive Summary

| 항목 | 결과 |
|------|------|
| **종합 판정** | 🟡 **조건부 양호 — 배포 후 개선 효과 기대** |
| **종합 점수** | **62 / 100** (현재 라이브 기준) |
| **배포 후 예상 점수** | **78 / 100** (로컬 SEO 리팩토링 push 반영 시) |

이 블로그는 **기술 인프라(사이트맵, robots.txt, GSC 인증, Chirpy SEO 태그)** 는 갖추었고, **알고리즘·코딩테스트 롱테일 키워드**에 강한 콘텐츠 잠재력이 있습니다.

다만 **로컬에서 완료한 SEO 리팩토링이 아직 GitHub Pages에 배포되지 않았고**, meta description·사이트명·영문 title 등 **검색 CTR을 떨어뜨리는 요소**가 남아 있습니다.  
우선 **push → 색인 재요청**이 가장 시급합니다.

---

## 1. 영역별 점수

| 영역 | 점수 | 상태 | 요약 |
|------|------|------|------|
| 크롤링·인덱싱 인프라 | 85/100 | 🟢 양호 | sitemap 311 URL, robots.txt 정상, GSC 인증 완료 |
| 메타태그·SNS 공유 | 45/100 | 🔴 미흡 | 포스트별 description 거의 없음, og:image 미설정 |
| Title·키워드 최적화 | 55/100 | 🟡 보통 | 로컬 45건 SEO title / 라이브는 구 title 노출 |
| 본문·콘텐츠 품질 | 75/100 | 🟢 양호 | 알고리즘 풀이 깊이 충분, TOC·코드·설명 구조 양호 |
| 이미지 SEO | 70/100 | 🟡 보통 | _posts alt 개선 완료(로컬), info 탭 잔존 |
| 내부 링크·사이트 구조 | 72/100 | 🟢 양호 | 카테고리·태그 아카이브, 시리즈 링크(로컬) |
| 브랜딩·CTR | 40/100 | 🔴 미흡 | 사이트명 "개발일지"가 지나치게 일반적 |
| 분석·측정 | 30/100 | 🔴 미흡 | Google Analytics 미설정 |

---

## 2. 잘 되어 있는 것 (강점)

### 2-1. 크롤링 기본 인프라 ✅

```
robots.txt (라이브 확인)
─────────────────────────
User-agent: *
Allow: /
Sitemap: https://joonk2.github.io/sitemap.xml
```

- `jekyll-sitemap` 플러그인으로 **sitemap.xml 정상 생성** (약 **311개 URL** 등록)
- `jekyll-seo-tag`로 canonical, Open Graph, Twitter Card 자동 출력
- Google Search Console **사이트 소유권 인증** 설정됨 (`_config.yml` + `googled9c0376146a0ac2a.html`)
- URL 구조 깔끔: `/posts/:year/:month/:day/:title/`
- `lang: ko`, `timezone: Asia/Seoul` — 한국어 검색에 유리
- `jekyll-archives`로 `/categories/`, `/tags/` 아카이브 페이지 생성 → 내부 링크 허브 역할

### 2-2. 콘텐츠 자산 ✅

| 지표 | 수치 |
|------|------|
| 총 포스트 | 128개 |
| 코딩테스트·알고리즘 | 80개 |
| 수학·선형대수 | 26개 |
| 블로그·개발 가이드 | 9개 |

- 프로그래머스·백준·SWEA 풀이 → **"문제명 + 풀이 + 알고리즘"** 롱테일 검색에 적합
- 대부분 포스트에 TOC, Java 코드, 접근 설명 포함 → 체류 시간·전문성 신호 양호
- Utterances 댓글, RSS feed, PWA 지원

### 2-3. 최근 로컬 SEO 리팩토링 (배포 대기) ✅

로컬 `_posts` 기준으로 이미 적용됨 (라이브 미반영):

- MathJax 중복 `<script>` **0건**
- `![Desktop View]` alt 텍스트 **0건**
- SEO 형식 title **45건** (프로그래머스·백준·블로그)
- 블로그 시리즈 내부 링크 **6편**
- robots.txt·토너먼트 공식 등 교정
- **description 추가** **35건** (프로그래머스·백준 문제 풀이 20건 + 개념·자료구조 글 15건)

---

## 3. 문제점 및 리스크 (약점)

### 🔴 Critical — 즉시 조치

#### (1) SEO 변경사항이 라이브에 반영되지 않음

| 구분 | 로컬 (수정 후) | 라이브 (현재) |
|------|----------------|---------------|
| 서버 증설 횟수 title | `[프로그래머스/Java] LV2 서버 증설 횟수 풀이 - DP 알고리즘` | `[programmers-lv2] 서버 증설 횟수` |
| og:title | (동일하게 SEO title) | `[programmers-lv2] 서버 증설 횟수` |

→ **Git commit + push 없이는 SEO 작업 효과 0%**  
→ Search Console에 제출된 sitemap도 **구 title 기준 페이지**를 가리킴

**조치:** `_posts` + `scripts/` 변경사항 push → GitHub Actions 배포 완료 후 GSC에서 URL 검사·색인 요청

---

#### (2) 포스트별 meta description 부재 — 84/128건 (66%)

`_config.yml`의 사이트 공통 description만 모든 포스트에 반복 적용:

```
고준환의 블로그입니다. 알고리즘 문제 풀이와 개발 관련 글을 공유합니다.
```

**문제:** Google 검색 결과(SERP)에서 모든 글이 **동일한 설명**으로 노출 → 클릭률(CTR) 저하  
**좋은 예 (9건만 존재):**

```yaml
description: "SWEA 등산로 조성 문제를 JAVA를 이용해 dfs으로 범위 조건문을 통해 해결하는 방법으로 설명합니다."
```

**조치:** 알고리즘 풀이 글마다 Front Matter `description: "..."` 추가 (120자 내외, 문제명+알고리즘+Java)
- **2026-06-17 업데이트:** 프로그래머스·백준 문제 풀이 20건과 개념·자료구조 글 15건에 description 추가 완료 (총 35건)

---

### 🟠 High — 1~2주 내 조치

#### (3) 사이트 title이 지나치게 일반적

```yaml
# _config.yml
title: 개발일지
tagline: 알고리즘
```

모든 페이지 `<title>` 형식: `{포스트 제목} | 개발일지`

**문제:** "개발일지"는 검색 경쟁 키워드도 아니고 브랜드 인지도도 낮음  
**권장 변경 예:**

```yaml
title: "고준환의 알고리즘 블로그"
tagline: "프로그래머스·백준 풀이와 CS 학습 기록"
description: >-
  프로그래머스, 백준, SWEA 알고리즘 문제 풀이와 Java, 자료구조, 수학 학습 노트를
  공유하는 고준환의 기술 블로그입니다.
```

---

#### (4) SEO 미적용 title 잔존 — 83/128건 (65%)

| 유형 | 예시 | 한국어 검색 적합도 |
|------|------|-------------------|
| 영문 단어 title | `limit`, `PCA`, `Heap`, `prim`, `subset` | ❌ 매우 낮음 |
| 짧은 영문 title | `DP`, `Greedy`, `Dijikstra` | ❌ 낮음 |
| 구형 프로그래머스 title | `[programmers-lv2] ...` (라이브) | 🟡 보통 |
| SEO 형식 (로컬) | `[프로그래머스/Java] LV2 ...` | ✅ 높음 |

**영문-only title 13건, 15자 미만 title 25건**

**조치:** 수학·개념 글도 한글 SEO title로 확장

```
limit          → [미적분] 극한(limit) 개념 정리 - ε-δ 정의와 성질
PCA            → [선형대수] PCA 주성분 분석 개념과 적용
DFS && BFS     → [알고리즘] DFS와 BFS 차이점 및 Java 구현 정리
```

---

#### (5) Open Graph / SNS 미리보기 이미지 미설정

```yaml
# _config.yml
social_preview_image:   # 비어 있음
```

- 카카오톡·트위터·슬랙 공유 시 **기본 summary 카드**만 표시
- SNS 유입 및 간접 SEO 신호 손실

**조치:** 1200×630px 대표 이미지 제작 후 `social_preview_image: "/assets/img/og-default.png"` 설정

---

#### (6) Google Analytics 미설정

```yaml
analytics:
  google:
    id:   # 비어 있음
```

색인 여부와 CTR을 측정할 수 없어 **SEO 개선 효과 검증 불가**

---

### 🟡 Medium — 중기 개선

#### (7) LV 레벨 미반영 프로그래머스 3건

| 파일 | 현재 title |
|------|-----------|
| `programmers-42884` | `[프로그래머스/Java] 단속카메라 풀이 - 그리디 알고리즘` |
| `programmers-86971` | `[프로그래머스/Java] 전력망을 둘로 나누기 풀이 - BFS 알고리즘` |
| `programmers-42898` | `[프로그래머스/Java] 등굣길 풀이 - DP 알고리즘` |

#### (8) 구 도메인 참조 잔존

일부 구형 블로그·에러 글 본문에 `joonhwan2.github.io` 언급 (7개 파일)  
→ 신뢰도·일관성에 미세한 악영향

#### (9) `_tabs/info.md` alt 텍스트 미개선

```markdown
![Desktop View](/assets/img/me.jpg)
```

→ 소개 페이지 이미지 SEO 미흡 (블로그 `_posts` 외 페이지)

#### (10) 일부 포스트 콘텐츠 얇음

- `2026-06-14-tournament.md` — 수학 노트 형태, 검색 의도 대비 분량 적음
- 개념 글 중 코드·설명 없이 이미지만 있는 경우 → E-E-A-T 신호 약함

---

## 4. 라이브 사이트 기술 점검 결과

| URL | HTTP | 비고 |
|-----|------|------|
| `https://joonk2.github.io/` | 200 | 정상 |
| `https://joonk2.github.io/robots.txt` | 200 | Allow: / |
| `https://joonk2.github.io/sitemap.xml` | 200 | 311 URLs |
| `https://joonk2.github.io/feed.xml` | 200 | RSS 정상 |
| 포스트 상세 페이지 | 200 | canonical 정상 |
| `google-site-verification` meta | ✅ | GSC 연동 가능 |

**포스트 페이지 meta (라이브, 2026-06-05-programmers-389479 기준):**

| 태그 | 현재 값 | 문제 |
|------|---------|------|
| `<title>` | `[programmers-lv2] 서버 증설 횟수 \| 개발일지` | 구 title |
| `meta description` | 사이트 공통 description | 포스트별 고유 description 없음 |
| `og:title` | `[programmers-lv2] 서버 증설 횟수` | 구 title |
| `twitter:card` | `summary` | og:image 없어 large image 불가 |
| `canonical` | `https://joonk2.github.io/posts/2026/06/05/programmers-389479/` | ✅ 정상 |

---

## 5. 키워드·검색 노출 전망

### 노출 가능성 높음 (배포 + description 추가 후)

| 검색 의도 예시 | 근거 |
|----------------|------|
| `프로그래머스 LV2 서버 증설 횟수 풀이` | SEO title + 풀이 본문 + Java 코드 |
| `백준 34218 숭고한 마법학교 BFS` | SEO title + BFS 풀이 |
| `깃허브 블로그 Jekyll 구글 검색 노출` | 블로그 시리즈 + 내부 링크 |
| `프로그래머스 LV2 지게차와 크레인` | LV title + BFS 설명 |

### 노출 가능성 낮음 (현재 상태)

| 검색 의도 예시 | 이유 |
|----------------|------|
| `limit` | 영문 5글자 title, 경쟁 과다 |
| `PCA` | 너무 짧고 일반적 |
| `개발일지` | 사이트명 일반어, 차별화 없음 |

### 경쟁 환경

- 프로그래머스·백준 풀이 블로그는 **경쟁이 매우 치열**
- 차별화 포인트: **Java 풀이 + 여러 접근법 + 개인적 사고 과정** → "완전 복붙형 풀이"보다 유리
- SEO title + description만 갖춰도 **롱테일(4~6어절) 키워드**에서는 충분히 상위 노출 가능

---

## 6. 우선순위 액션 플랜

### 🔴 P0 — 이번 주 (필수)

| # | 작업 | 예상 효과 |
|---|------|-----------|
| 1 | `_posts` SEO 변경사항 **git push → GitHub Pages 배포** | title·alt·MathJax 개선 즉시 반영 |
| 2 | Google Search Console → **Sitemap 재제출** + 주요 URL **색인 요청** | 신규 title 크롤링 가속 |
| 3 | `_config.yml` **description** 키워드 강화 | 사이트 전체 SERP 품질 개선 |

### 🟠 P1 — 2주 내

| # | 작업 | 예상 효과 |
|---|------|-----------|
| 4 | 알고리즘 포스트 **84건 description** 추가 | CTR 대폭 개선 |
|   | (2026-06-17: 35건 추가 완료, 84건 잔존) | |
| 5 | `_config.yml` **title·tagline** 브랜드화 | 브랜드 검색·신뢰도 |
| 6 | 영문 title **26개** 한글 SEO title로 변환 | 수학·개념 글 검색 유입 |
| 7 | `social_preview_image` 설정 | SNS 공유 CTR |

### 🟡 P2 — 1개월 내

| # | 작업 | 예상 효과 |
|---|------|-----------|
| 8 | Google Analytics 4 연동 | SEO 성과 측정 |
| 9 | LV 미지정 프로그래머스 3건 title 보완 | 일관성 |
| 10 | `_tabs/info.md` alt 텍스트 수정 | 소개 페이지 이미지 SEO |
| 11 | `problems.json` 재생성 (Python 환경) | 챗봇·사이트 내 검색 연동 |

---

## 7. 배포 후 Google Search Console 체크리스트

```
□ sitemap.xml 상태 "성공" 확인
□ 주요 포스트 3~5개 URL 검사 → "색인 생성됨" 확인
□ title이 [프로그래머스/Java] LV2 ... 형식으로 크롤링되었는지 확인
□ "제목이 긴 페이지" / "중복 title" 리포트 확인
□ Core Web Vitals (모바일) 이상 없는지 확인
□ 2~4주 후 "검색 실적"에서 노출수·클릭수 추이 확인
```

---

## 8. 최종 결론

### Q. 구글에 노출 잘 될까?

**A. "잘 될 수 있는 조건은 갖췄지만, 아직 핵심 개선이 배포되지 않아 현재 라이브 상태로는 아쉽다."**

| 관점 | 평가 |
|------|------|
| **지금 당장** | 🟡 보통 — 인프라는 OK, title·description이 검색 의도와 불일치 |
| **push 배포 후** | 🟢 양호 — 프로그래머스·백준 롱테일 키워드 유입 기대 |
| **description + site title 개선 후** | 🟢 우수 — CTR·브랜드 신호까지 갖춤 |

### 한 줄 요약

> **128개의 알고리즘 풀이라는 자산은 충분히 가치 있다.  
> 로컬 SEO 리팩토링을 push하고, 포스트별 description을 채우면  
> "프로그래머스 ○○ 풀이 Java"류 검색에서 실질적 노출이 시작될 것이다.**

---

## 부록 A. 포스트 통계 (자동 수집)

```
총 포스트:              128
description 없음:       84 (66%)
tags 없음:              1
미래 날짜 포스트:       0
SEO 형식 title (로컬):  45 (35%)
영문-only title:        13
15자 미만 title:        25
```

**2026-06-17 업데이트:** description 35건 추가 (프로그래머스·백준 20건 + 개념·자료구조 15건)

## 부록 B. 관련 문서

- [SEO 리팩토링 스크립트 가이드](./SEO_REFACTOR_README.md)
- [SEO 리팩토링 실행 스크립트](./seo_refactor_posts.rb)
- [통계 수집 스크립트](./seo_audit_stats.rb)

---

*본 보고서는 저장소 소스 코드, `_config.yml`, `_posts` Front Matter, 라이브 사이트 HTTP 응답을 기반으로 작성되었습니다.*
