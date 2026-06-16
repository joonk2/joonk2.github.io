---
title:  "구글 검색 노출을 위해 SEO 최적화 작업을 진행했습니다"
description: "Jekyll 블로그의 구글 검색 노출을 개선하기 위해 SEO 진단을 실시하고, title 최적화, description 추가, MathJax 정리 등의 최적화 작업을 진행한 과정을 공유합니다."
layout: post
categories: [etc, blog] 
tags: [jekyll, seo, google-search-console]
toc: true
toc_sticky: true
date: 2026-06-17
---

## 🙋‍♂️ 들어가며

블로그를 운영하면서 가장 중요한 것 중 하나는 **검색 엔진 노출**입니다. 아무리 좋은 글을 써도 구글에서 검색되지 않으면 아무도 찾아오지 않기 때문입니다.

최근 제 블로그의 구글 검색 노출 현황을 점검해보니, 여러 가지 문제점이 발견되었습니다. 이에 SEO(검색 엔진 최적화) 진단을 실시하고, 문제점을 개선하기 위한 최적화 작업을 진행했습니다.

이 글에서는 진단 결과와 개선 작업 내용을 정리해보겠습니다.

---

## 🔍 SEO 진단 결과

### 1. 기술 인프라는 양호

먼저 기술적인 측면에서는 큰 문제가 없었습니다.

- ✅ `robots.txt` 정상 설정
- ✅ `sitemap.xml` 생성 (311개 URL 등록)
- ✅ Google Search Console 사이트 소유권 인증 완료
- ✅ `jekyll-seo-tag` 플러그인으로 meta 태그 자동 생성
- ✅ URL 구조 깔끔함 (`/posts/:year/:month/:day/:title/`)

### 2. 콘텐츠 자산 충분

- 총 128개의 포스트
- 코딩테스트·알고리즘 80개
- 수학·선형대수 26개
- 블로그·개발 가이드 9개

프로그래머스, 백준, SWEA 풀이 글은 롱테일 키워드 검색에 적합한 콘텐츠입니다.

### 3. 하지만 검색 노출에는 문제가 있었습니다

#### 🔴 문제 1: 포스트별 meta description 부재 (93%)

가장 큰 문제는 **description 필드가 거의 없다는 것**이었습니다.

```yaml
# 대부분의 포스트에서 이런 상태였습니다
---
title: "[programmers-lv2] 서버 증설 횟수"
---
```

모든 포스트에 사이트 공통 description만 적용되어 있어, 구글 검색 결과에서 모든 글이 동일한 설명으로 노출되었습니다. 이는 클릭률(CTR)을 크게 떨어뜨리는 요인입니다.

#### 🔴 문제 2: SEO 친화적 title 부족

영문-only title이나 짧은 영문 title이 많았습니다.

| 유형 | 예시 | 한국어 검색 적합도 |
|------|------|-------------------|
| 영문 단어 title | `limit`, `PCA`, `Heap` | ❌ 매우 낮음 |
| 짧은 영문 title | `DP`, `Greedy`, `DFS` | ❌ 낮음 |
| 구형 프로그래머스 title | `[programmers-lv2] ...` | 🟡 보통 |

#### 🔴 문제 3: 로컬 변경사항이 배포되지 않음

로컬에서 SEO 리팩토링을 진행했지만, 아직 GitHub Pages에 배포되지 않아 라이브 사이트에는 반영되지 않았습니다.

---

## 🛠️ 최적화 작업 내용

### 1. Title 최적화

프로그래머스·백준 문제 풀이 글의 title을 검색 친화적 한글 형식으로 변경했습니다.

**변경 전:**
```yaml
title: "[programmers-lv2] 서버 증설 횟수"
```

**변경 후:**
```yaml
title: "[프로그래머스 LV2] 서버 증설 횟수 Java 풀이"
```

이 형식은 "프로그래머스 LV2 서버 증설 횟수 풀이"와 같은 롱테일 검색에 적합합니다.

### 2. Description 추가

각 포스트에 고유한 description을 추가했습니다. (2026-06-17 기준 35건 완료)

**예시:**
```yaml
---
title: "[프로그래머스 LV2] 서버 증설 횟수 Java 풀이"
description: "프로그래머스 LV2 서버 증설 횟수 문제를 Java로 해결한 풀이입니다. 우선순위 큐와 시뮬레이션 접근법을 설명합니다."
---
```

description은 120자 내외로 작성하며, 문제명 + 알고리즘 + 언어를 포함하도록 했습니다.

### 3. MathJax 정리

본문에 개별적으로 추가된 MathJax `<script>` 블록을 제거하고, Front Matter에 `math: true`만 남겼습니다.

**변경 전:**
```markdown
<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
$$
```

**변경 후:**
```yaml
---
math: true
---
```

이를 통해 페이지 로딩 속도를 개선하고 중복 스크립트를 제거했습니다.

### 4. Alt 텍스트 개선

`![Desktop View]`와 같은 의미 없는 alt 텍스트를 맥락 기반 한글 설명으로 변경했습니다.

### 5. 기타 개선

- 토너먼트 공식 오타 교정
- `robots.txt` 오타 수정
- 블로그 시리즈 내부 링크 추가
- Java 코드 블록 주변 설명 보강

---

## 📊 개선 효과 예상

| 항목 | 개선 전 | 개선 후 |
|------|---------|---------|
| description 없음 | 119건 (93%) | 84건 (66%) |
| SEO 형식 title | 45건 (35%) | 45건 (35%) + 추가 작업 예정 |
| MathJax 중복 스크립트 | 다수 존재 | 0건 |

**예상 효과:**
- 프로그래머스·백준 롱테일 키워드 검색 노출 개선
- 검색 결과 CTR(클릭률) 향상
- 페이지 로딩 속도 개선
- 브랜드 검색 신호 강화

---

## 🎯 향후 계획

### P0 (이번 주)
- [x] 로컬 SEO 변경사항 적용
- [ ] Git commit + push → GitHub Pages 배포
- [ ] Google Search Console에서 Sitemap 재제출
- [ ] 주요 URL 색인 요청

### P1 (2주 내)
- [ ] 나머지 84건 description 추가
- [ ] `_config.yml` title·tagline 브랜드화
- [ ] 영문 title 26개 한글 SEO title로 변환
- [ ] `social_preview_image` 설정

### P2 (1개월 내)
- [ ] Google Analytics 4 연동
- [ ] LV 미지정 프로그래머스 3건 title 보완

---

## 💡 배운 점

SEO는 단순히 "좋은 글을 쓰는 것"만으로는 부족합니다. 검색 엔진이 콘텐츠를 이해하고, 사용자가 클릭하고 싶어 만들어야 합니다.

특히 **description**과 **title**은 검색 결과에서 첫인상을 결정하는 중요한 요소입니다. 이번 작업을 통해 SEO의 중요성을 다시 한번 깨달았습니다.

---

## 📚 관련 글

- [깃허브 블로그] 구글 서치 콘솔 검색 노출 설정 - sitemap·robots.txt](/posts/2022/08/14/google-search-engine/)
- [깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 1편 기초 세팅](/posts/2022/08/12/creating-githubblog/)

---

*이 글은 `scripts/SEO_AUDIT_REPORT.md`와 `scripts/SEO_REFACTOR_README.md`를 기반으로 작성되었습니다.*
