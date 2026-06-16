# Jekyll 블로그 SEO 일괄 리팩토링 — 스크립트 가이드

이 문서는 `_posts` 마크다운 SEO 최적화 작업과 `scripts/` 폴더에 추가된 파일들의 역할, 이후 진행 방법을 정리합니다.

---

## 1. 지금까지 적용된 내용 (요약)

| 태스크 | 내용 | 상태 |
|--------|------|------|
| **A. Title SEO** | 프로그래머스·백준·블로그 글 title을 검색 친화적 한글 형식으로 변환 | 적용 완료 |
| **B. MathJax 정리** | 본문 개별 `<script>` MathJax 블록 제거, Front Matter `math: true` 유지 | 적용 완료 |
| **C. Alt 텍스트** | `![Desktop View]` → 맥락 기반 한글 설명으로 교체 | 적용 완료 |
| **D. 가독성** | Java 코드 주변 설명 추가, 블로그 시리즈 내부 링크 삽입 | 적용 완료 |
| **개별 교정** | 토너먼트 공식, `robots.txt` 오타, 블로그 어조 통일 | 적용 완료 |

**변경 규모:** `_posts` 내 약 119개 파일 수정 (일부 title·LV 레벨은 수동 보완 포함)

---

## 2. `scripts/` 파일별 역할

### ✅ `seo_refactor_posts.rb` — **메인 스크립트 (권장)**

| 항목 | 설명 |
|------|------|
| **언어** | Ruby 3.x |
| **실행 환경** | 이 PC에 Ruby 설치됨 (`C:\software\Ruby33-x64\bin\ruby.exe`) |
| **역할** | `_posts/**/*.md` 전체를 순회하며 SEO 리팩토링 규칙을 일괄 적용 |
| **대상 경로** | `../_posts` (저장소 루트 기준) |

**수행 작업:**

1. Front Matter `title` SEO 변환 (프로그래머스 / 백준 / 블로그 패턴)
2. 본문 MathJax `<script>` 블록 삭제
3. `![Desktop View]` alt 텍스트 구체화
4. 토너먼트 공식·`robots.txt` 등 특수 교정
5. 블로그 글 하십시오체 통일
6. 블로그 시리즈 글 하단 `## 📚 관련 글` 내부 링크 추가
7. 코딩테스트 글 Java 코드 블록 주변 설명 문단 보강

**실행:**

```powershell
cd C:\Users\withj\OneDrive\Desktop\joonk2.github.io
ruby scripts/seo_refactor_posts.rb
```

**실행 후 출력 예시:**

```
Processed 128 files
  MathJax removed: ...
  Titles updated: ...
  Alt text updated: ...
  Series footers added: ...
VERIFY MathJax remaining: 0
VERIFY Desktop View remaining: 0
```

**커스터마이징:** 파일 상단의 상수를 수정합니다.

- `PROG_OVERRIDES` — 프로그래머스 문제 ID별 `[문제명, LV, 알고리즘]` 매핑
- `BOJ_OVERRIDES` — 백준 문제 번호별 매핑
- `BLOG_TITLE_MAP` — 블로그 시리즈 title 매핑
- `SERIES_LINKS` — 블로그 연작 글 footer 내부 링크

---

### ⚠️ `seo_refactor_posts.py` — Python 대안 (참고용)

| 항목 | 설명 |
|------|------|
| **언어** | Python 3 |
| **역할** | `seo_refactor_posts.rb`와 **동일한 로직**의 Python 버전 |
| **현재 상태** | 이 PC에 Python 실행 환경이 없어 **실제 실행은 Ruby로 대체**됨 |

Windows Store용 `python.exe` 스텁만 있고 실제 인터프리터가 없는 환경에서는 동작하지 않습니다.  
Python 환경이 있는 PC에서는 아래처럼 실행할 수 있습니다.

```bash
python scripts/seo_refactor_posts.py
```

---

### ⚠️ `seo_refactor_posts.ps1` — PowerShell 대안 (미사용)

| 항목 | 설명 |
|------|------|
| **언어** | PowerShell |
| **역할** | Ruby/Python과 동일 목적의 Windows 네이티브 스크립트 |
| **현재 상태** | 한글 인코딩 문제로 **실행 실패** → Ruby 버전으로 대체 |

삭제해도 무방합니다. Ruby 스크립트 하나만 유지하는 것을 권장합니다.

---

### 📌 `generate_problems_json.py` — 기존 스크립트 (별도 목적)

| 항목 | 설명 |
|------|------|
| **역할** | `_posts/coding-test/datastructure-algorithm/` 포스트에서 `assets/data/problems.json` 생성 |
| **SEO 스크립트와의 관계** | **무관** — 챗봇·검색용 문제 목록 JSON을 만드는 용도 |

SEO 리팩토링 후 코딩테스트 글 title이 바뀌었다면, 배포 전에 이 스크립트도 다시 실행해 `problems.json`을 갱신하는 것이 좋습니다.

```bash
python scripts/generate_problems_json.py
```

(Python 환경 필요)

---

## 3. 지금부터 하면 되는 것 (체크리스트)

### Step 1. 변경 내용 로컬 확인

```powershell
cd C:\Users\withj\OneDrive\Desktop\joonk2.github.io
git status
git diff _posts --stat
```

특히 아래 파일들을 눈으로 한번 확인하세요.

- 블로그 시리즈: `_posts/etc/blog/2022-08-12-creating-githubblog.md`
- 검색 노출: `_posts/etc/blog/2022-08-14-google-search-engine.md`
- 프로그래머스 LV title: `_posts/coding-test/datastructure-algorithm/2026-02-10-programmers-388353.md` 등

### Step 2. Jekyll 로컬 미리보기

```powershell
bundle install   # 최초 1회
bundle exec jekyll serve
```

브라우저에서 `http://localhost:4000` 접속 후 확인합니다.

- title이 블로그 목록·상세 페이지에 올바르게 표시되는지
- 수식(`math: true`)이 정상 렌더링되는지
- 이미지 alt가 깨지지 않았는지
- 시리즈 글 하단 `## 📚 관련 글` 링크가 동작하는지

### Step 3. Git 커밋 & GitHub Pages 배포

내용에 문제가 없으면 커밋 후 push합니다.

```powershell
git add _posts scripts/
git commit -m "SEO: _posts title·alt·MathJax 일괄 최적화 및 리팩토링 스크립트 추가"
git push origin main
```

GitHub Pages는 push 후 몇 분 내 자동 배포됩니다.

### Step 4. (선택) problems.json 갱신

Python이 있는 환경에서:

```bash
python scripts/generate_problems_json.py
git add assets/data/problems.json
git commit -m "chore: SEO title 변경 반영 problems.json 갱신"
git push
```

### Step 5. 새 포스트 작성 시

알고리즘·블로그 글을 새로 추가한 뒤, 아래 중 하나를 선택합니다.

**방법 A — 스크립트 재실행 (권장)**

```powershell
ruby scripts/seo_refactor_posts.rb
```

새 글에 `PROG_OVERRIDES` / `BOJ_OVERRIDES`에 없는 문제가 있으면, 스크립트 상단 매핑에 항목을 추가한 뒤 실행합니다.

**방법 B — Front Matter를 처음부터 SEO 형식으로 작성**

```
title: "[프로그래머스/Java] LV2 문제명 풀이 - BFS 알고리즘"
math: true   # 수식 사용 시 (본문에 <script> 넣지 않음)
```

---

## 4. title 형식 참고 (복사용)

### 프로그래머스

```
[프로그래머스/Java] LV2 서버 증설 횟수 풀이 - DP 알고리즘
[프로그래머스/Java] LV1 택배 상자 꺼내기 풀이 - 구현 알고리즘
[프로그래머스/Java] PCCP LV2 석유 시추 풀이 - BFS·구현 알고리즘
```

### 백준

```
[백준/Java] 34218번 숭고한 마법학교 풀이 - BFS 알고리즘
```

### 깃허브 블로그

```
[깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 1편 기초 세팅
[깃허브 블로그] 구글 서치 콘솔 검색 노출 설정 - sitemap·robots.txt
```

---

## 5. 아직 수동 확인이 필요한 항목

| 항목 | 설명 |
|------|------|
| **LV 미지정 프로그래머스 3건** | `단속카메라`, `전력망을 둘로 나누기`, `등굣길` — LV 레벨 미반영 |
| **중복 스크립트 정리** | `seo_refactor_posts.py`, `.ps1` 삭제 여부 결정 (Ruby만 유지 권장) |
| **problems.json** | Python 환경에서 재생성 필요 여부 확인 |

---

## 6. 파일 구조 한눈에 보기

```
scripts/
├── SEO_REFACTOR_README.md      ← 이 문서
├── seo_refactor_posts.rb       ← ✅ 메인 (Ruby, 사용 권장)
├── seo_refactor_posts.py       ← Python 대안 (참고용)
├── seo_refactor_posts.ps1      ← PowerShell 대안 (미사용, 삭제 가능)
└── generate_problems_json.py   ← problems.json 생성 (별도 목적)
```

---

## 7. 문제 발생 시

| 증상 | 조치 |
|----------|------|
| MathJax 수식이 안 보임 | Front Matter에 `math: true` 있는지 확인. 본문 `<script>`는 넣지 않음 |
| title이 이상하게 바뀜 | `PROG_OVERRIDES` / `BOJ_OVERRIDES`에 해당 문제 추가 후 `git checkout -- _posts/...`로 되돌리고 스크립트 재실행 |
| Front Matter 깨짐 | `---` 구분선이 본문 `---`와 충돌하지 않는지 확인 |
| 스크립트를 되돌리고 싶음 | `git checkout -- _posts` (커밋 전) 또는 `git revert` (커밋 후) |

---

*최종 업데이트: 2026년 6월 — SEO 일괄 리팩토링 작업 기준*
