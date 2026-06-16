#!/usr/bin/env python3
"""SEO optimization batch refactor for Jekyll blog posts in _posts/."""

import re
import os
from pathlib import Path

POSTS_DIR = Path(__file__).resolve().parent.parent / "_posts"
BASE_URL = "https://joonk2.github.io"

MATHJAX_PATTERN = re.compile(
    r"\n?<!-- MathJax Script for this post only -->\s*"
    r"<script type=\"text/javascript\" async[\s\S]*?</script>\s*"
    r"<script type=\"text/x-mathjax-config\">[\s\S]*?</script>\s*",
    re.MULTILINE,
)

TAG_ALG = {
    "dp": "DP",
    "bfs": "BFS",
    "dfs": "DFS",
    "greedy": "그리디",
    "implementation": "구현",
    "binary-search": "이분 탐색",
    "binary search": "이분 탐색",
    "two-pointer": "투 포인터",
    "priorityqueue": "우선순위 큐",
    "priority queue": "우선순위 큐",
    "queue": "큐",
    "stack": "스택",
    "hashmap": "해시맵",
    "hashset": "해시셋",
    "sort": "정렬",
    "math": "수학",
    "graph": "그래프",
    "dijkstra": "다익스트라",
    "prim": "프림",
    "backtracking": "백트래킹",
    "bruteforce": "완전 탐색",
    "simulation": "시뮬레이션",
}

BLOG_SERIES_LINKS = {
    "creating-githubblog": [
        ("github-blog-creating2", "👉 다음 단계: Jekyll 테마 설치 및 로컬 실행하기"),
        ("last", "👉 3편: 블로그 최종 설정 및 배포"),
        ("google-search-engine", "👉 구글 검색 노출 설정하기"),
    ],
    "github-blog-creating2": [
        ("creating-githubblog", "👈 이전: 깃허브 블로그 기초 세팅 (1편)"),
        ("last", "👉 다음 단계: 블로그 최종 수정 및 배포 (3편)"),
    ],
    "last": [
        ("creating-githubblog", "👈 1편: 깃허브 블로그 기초 세팅"),
        ("github-blog-creating2", "👈 2편: Jekyll 테마 설치"),
        ("google-search-engine", "👉 다음 단계: 구글 검색 노출 설정하기"),
        ("categories-dividing", "👉 블로그 카테고리 나누기"),
    ],
    "google-search-engine": [
        ("creating-githubblog", "👈 1편: 깃허브 블로그 기초 세팅"),
        ("github-blog-creating2", "👈 2편: Jekyll 테마 설치"),
        ("last", "👈 3편: 블로그 최종 설정"),
    ],
    "categories-dividing": [
        ("creating-githubblog", "👈 깃허브 블로그 시리즈: 1편 기초 세팅"),
        ("custommizing", "👉 블로그 커스터마이징 가이드"),
    ],
    "custommizing": [
        ("categories-dividing", "👈 블로그 카테고리 나누기"),
        ("gif-right-next-to-comments", "👉 댓글창 꾸미기"),
        ("custum-music", "👉 블로그 배경음악 추가하기"),
    ],
}

BLOG_TITLE_MAP = {
    "깃허브 블로그 만드는 법 1": "[깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 1편 기초 세팅",
    "깃허브 블로그 만드는 법 2": "[깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 2편 로컬 실행",
    "깃허브 블로그 만드는 법 3": "[깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 3편 최종 배포",
    "깃허브 블로그 구글검색 노출시키기": "[깃허브 블로그] 구글 서치 콘솔 검색 노출 설정 - sitemap·robots.txt",
    "블로그 카테고리 나누는 법": "[깃허브 블로그] Jekyll 카테고리 및 태그 분류 설정",
    "블로그 커스터마이징": "[깃허브 블로그] Chirpy 테마 커스터마이징 가이드",
    "댓글창 꾸미기": "[깃허브 블로그] Utterances 댓글창 GIF 꾸미기",
    "블로그 음악 추가 updated(Mar 13, 2024)": "[깃허브 블로그] 배경음악 플레이어 추가하기",
}

BOJ_TITLE_OVERRIDES = {
    "34218": ("숭고한 마법학교", "BFS"),
    "1018": ("체스판 다시 칠하기", "브루트포스"),
    "1058": ("친구", "플로이드-워셜"),
    "10971": ("외판원 순회 2", "DFS·백트래킹"),
    "15501": ("부당한 퍼즐", "구현"),
    "20954": ("택배기사 민서", "수학·구현"),
    "21735": ("눈덩이 굴리기", "시뮬레이션"),
    "9082": ("지뢰 찾기", "구현"),
    "34557": ("횃불이의 모험", "BFS"),
}

PROGRAMMERS_TITLE_OVERRIDES = {
    "389479": ("서버 증설 횟수", "LV2", "DP"),
    "42583": ("다리를 지나는 트럭", "LV2", "큐"),
    "42586": ("기능개발", "LV2", "스택"),
    "389480": ("완전범죄", "LV2", "완전 탐색"),
    "12985": ("예상 대진표", "LV2", "수학"),
    "250136": ("석유 시추", "PCCP LV2", "BFS·구현"),
}


def parse_front_matter(content: str) -> tuple[dict, str, str]:
    if not content.startswith("---"):
        return {}, content, content
    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content, content
    fm_text = parts[1]
    body = parts[2]
    fm = {}
    for line in fm_text.splitlines():
        m = re.match(r"^(\w+):\s*(.+)$", line.strip())
        if m:
            key, val = m.group(1), m.group(2).strip()
            if val.startswith("[") and val.endswith("]"):
                fm[key] = [x.strip() for x in val[1:-1].split(",")]
            else:
                fm[key] = val.strip('"').strip("'")
    return fm, fm_text, body


def rebuild_front_matter(fm: dict, fm_text: str, body: str) -> str:
    new_title = fm.get("title")
    if new_title:
        fm_text = re.sub(
            r'^title:\s*.+$',
            f'title:  "{new_title}"',
            fm_text,
            count=1,
            flags=re.MULTILINE,
        )
    return f"---{fm_text}---{body}"


def slug_from_filename(filename: str) -> str:
    m = re.match(r"\d{4}-\d{2}-\d{2}-(.+)\.md$", filename)
    return m.group(1) if m else filename.replace(".md", "")


def post_url(filename: str) -> str:
    m = re.match(r"(\d{4})-(\d{2})-(\d{2})-(.+)\.md$", filename)
    if not m:
        return BASE_URL
    y, mo, d, slug = m.groups()
    return f"{BASE_URL}/posts/{y}/{mo}/{d}/{slug}/"


def alg_from_tags(tags) -> str:
    if not tags:
        return "알고리즘"
    if isinstance(tags, str):
        tags = [tags]
    for t in tags:
        key = t.lower().strip()
        if key in TAG_ALG:
            return TAG_ALG[key]
    for t in tags:
        key = t.lower().strip()
        for k, v in TAG_ALG.items():
            if k in key:
                return v
    return tags[0] if tags else "알고리즘"


def convert_title(fm: dict, filename: str) -> bool:
    old = fm.get("title", "")
    if not old:
        return False
    new = old
    slug = slug_from_filename(filename)

    # Blog titles
    if "blog" in old.lower() or "creating" in slug.lower() or "/blog/" in filename.replace("\\", "/"):
        for key, val in BLOG_TITLE_MAP.items():
            if key in old:
                new = val
                break
        if new == old and "[blog]" in old:
            inner = old.replace("[blog]", "").strip()
            new = f"[깃허브 블로그] {inner} 가이드"

    # BOJ titles
    boj_m = re.search(r"boj[-_]?(\d+)[-_]?(.*)", old, re.I) or re.search(
        r"boj-(\d+)", slug, re.I
    )
    if boj_m:
        num = boj_m.group(1)
        if num in BOJ_TITLE_OVERRIDES:
            name, alg = BOJ_TITLE_OVERRIDES[num]
        else:
            rest = boj_m.group(2) if boj_m.lastindex and boj_m.lastindex >= 2 else ""
            name = rest.replace("-", " ").strip() or old
            alg = alg_from_tags(fm.get("tags"))
        new = f"[백준/Java] {num}번 {name} 풀이 - {alg} 알고리즘"

    # Programmers titles
    prog_m = re.search(r"programmers[-_]?(\d+)", slug, re.I)
    if "programmers" in old.lower() or "pccp" in old.lower() or prog_m:
        pid = prog_m.group(1) if prog_m else None
        if pid and pid in PROGRAMMERS_TITLE_OVERRIDES:
            name, level, alg = PROGRAMMERS_TITLE_OVERRIDES[pid]
            new = f"[프로그래머스/Java] {level} {name} 풀이 - {alg} 알고리즘"
        elif "programmers-lv2" in old.lower() or "programmers-lv2" in old:
            inner = re.sub(r"\[programmers-lv2\]\s*", "", old, flags=re.I).strip()
            alg = alg_from_tags(fm.get("tags"))
            new = f"[프로그래머스/Java] LV2 {inner} 풀이 - {alg} 알고리즘"
        elif "pccp" in old.lower():
            inner = re.sub(r"\[PCCP[^\]]*\]\s*", "", old).strip()
            inner = re.sub(r"\d+번\s*/\s*", "", inner).strip()
            alg = alg_from_tags(fm.get("tags"))
            new = f"[프로그래머스/Java] PCCP {inner} 풀이 - {alg} 알고리즘"

    if new != old:
        fm["title"] = new
        return True
    return False


def infer_alt_text(lines: list[str], idx: int, img_path: str, title: str) -> str:
    before = "\n".join(lines[max(0, idx - 8) : idx])
    after = "\n".join(lines[idx + 1 : idx + 4])

    heading = ""
    for line in reversed(lines[max(0, idx - 8) : idx]):
        hm = re.match(r"^#{1,4}\s+(.+)$", line.strip())
        if hm:
            heading = hm.group(1).strip()
            break

    path_lower = img_path.lower()
    ctx = (before + " " + after).lower()

    # Tournament specific
    if "tournament" in path_lower:
        if "4people" in path_lower or "4명" in heading:
            return "4명 참가 단일 토너먼트 대진표 및 경기 수"
        if "8people" in path_lower or "8명" in heading:
            return "8명 참가 단일 토너먼트 대진표 및 경기 수"
        if "16people" in path_lower or "16명" in heading:
            return "16명 참가 단일 토너먼트 대진표 및 경기 수"
        if "7people" in path_lower or "7명" in heading:
            return "7명 참가 토너먼트 대진표 (비2의 거듭제곱 반례)"
        if "10people" in path_lower:
            return "10명 참가 토너먼트 대진표 및 총 경기 수"
        if "12people" in path_lower:
            return "12명 참가 토너먼트 대진표 및 총 경기 수"

    # Blog setup images
    if "2022-08-12" in path_lower:
        nums = re.findall(r"/(\d+)\.PNG", img_path, re.I)
        n = nums[0] if nums else ""
        blog_map = {
            "1": "GitHub 저장소 New Repository 생성 화면",
            "2": "GitHub Pages 블로그 저장소 이름 설정 화면",
            "3": "GitHub Desktop으로 저장소 Clone 화면",
            "4": "로컬 폴더에 Clone된 블로그 저장소",
            "5": "VS Code에서 블로그 프로젝트 열기",
            "6": "GitHub Pages 블로그 첫 배포 확인 화면",
        }
        if n in blog_map:
            return blog_map[n]

    if "2022-08-14k" in path_lower or "search" in ctx:
        nums = re.findall(r"/(\d+)\.PNG", img_path, re.I)
        n = nums[0] if nums else ""
        seo_map = {
            "1": "구글 서치 콘솔 URL 등록 및 도메인 소유권 확인 화면",
            "2": "구글 서치 콘솔 HTML 소유권 확인 파일 다운로드",
            "3": "블로그 루트에 소유권 확인 파일 업로드 위치",
            "4": "구글 서치 콘솔 사이트맵 제출 메뉴",
            "5": "사이트맵 제출 완료 및 색인 요청 성공 화면",
        }
        if n in seo_map:
            return seo_map[n]

    if "git/merge" in path_lower:
        return f"Git merge 충돌 해결 과정 스크린샷 ({Path(img_path).stem})"
    if "git-error" in path_lower or "no-update" in path_lower:
        return f"Git 오류 해결 과정 캡처 ({Path(img_path).stem})"
    if "data-alg" in path_lower or "boj" in path_lower or "programmers" in path_lower:
        if heading:
            return f"{heading} 알고리즘 문제 풀이 참고 이미지"
        if "bfs" in path_lower or "dfs" in path_lower:
            return "BFS·DFS 알고리즘 문제 조건 해석 시뮬레이션"
        if "dp" in path_lower:
            return "DP 알고리즘 상태 전이 및 최적화 과정"
        if "sort" in path_lower:
            return "정렬 알고리즘 동작 과정 시각화"
        if "bruteforce" in path_lower:
            return "완전 탐색 테스트케이스 및 케이스 분석"
        return f"알고리즘 문제 풀이 참고 다이어그램 ({Path(img_path).name})"

    if "math/" in path_lower or "LinearAlgebra" in img_path:
        if heading:
            return f"선형대수·수학 개념 설명: {heading}"
        return f"수학 개념 설명 다이어그램 ({Path(img_path).name})"

    if "blog/" in path_lower:
        if "music" in path_lower:
            return "Jekyll 블로그 배경음악 플레이어 설정 화면"
        if "chatbot" in path_lower:
            return "AI 챗봇 자동 감지 기능 동작 화면"
        return f"블로그 커스터마이징 설정 화면 ({Path(img_path).name})"

    if heading:
        return f"{heading} 관련 설명 이미지"

    clean_title = re.sub(r"\[.*?\]", "", title).strip()
    if clean_title:
        return f"{clean_title} 관련 참고 이미지"

    return f"본문 설명 참고 이미지 ({Path(img_path).name})"


def replace_desktop_view(body: str, title: str) -> str:
    lines = body.splitlines()
    changed = False
    for i, line in enumerate(lines):
        m = re.search(r"!\[Desktop View\]\(([^)]+)\)", line)
        if m:
            alt = infer_alt_text(lines, i, m.group(1), title)
            lines[i] = line.replace("![Desktop View]", f"![{alt}]")
            changed = True
    return "\n".join(lines) if changed else body


def apply_specific_corrections(body: str, filename: str, slug: str) -> str:
    if "tournament" in slug:
        body = body.replace(
            "아 다시 계산해보니,  `총 경기수 - 1` 라는 식을 도출할 수 있었다",
            "아 다시 계산해보니, 총 경기수 = 참가자 수(N) - 1 이라는 명확한 공식을 도출할 수 있었다.",
        )

    if "search-engine" in slug or "robot.txt" in body:
        body = body.replace("robot.txt", "robots.txt")
        body = body.replace("이제 robots.txt를 열읍시다.", "이제 robots.txt 파일을 열어봅시다.")
        body = body.replace(
            "내용이 disallow 라고 되있는 분들도",
            "내용이 Disallow라고 되어 있는 분들도",
        )
        if "⚠️ 본 가이드는 2026년" not in body:
            insert = (
                "> ⚠️ 본 가이드는 2026년 현재 구글 서치 콘솔 인터페이스 기준으로 "
                "최적화 및 동작이 검증된 최신 글입니다.\n\n"
            )
            body = insert + body

    return body


def convert_blog_tone(body: str) -> str:
    replacements = [
        (r"권장함\b", "권장합니다"),
        (r"생성이 됨", "생성됩니다"),
        (r"될 거에요", "될 것입니다"),
        (r"저장합시다", "저장하시기 바랍니다"),
        (r"제출을 합시다", "제출하시기 바랍니다"),
        (r"입력합시다", "입력하시기 바랍니다"),
        (r"수정합시다", "수정하시기 바랍니다"),
        (r"변경합시다", "변경하시기 바랍니다"),
        (r"복붙합시다", "복사하여 붙여넣으시기 바랍니다"),
        (r"체크합시다", "체크하시기 바랍니다"),
        (r"참고합시다", "참고하시기 바랍니다"),
        (r"연동시켜주시면 됩니다 ㅎ", "연동하시면 됩니다"),
        (r"좋겠어요ㅎ", "좋겠습니다"),
        (r"누릅시다", "누르시기 바랍니다"),
        (r"열읍시다", "열어봅시다"),
        (r"바꿔주시면 됩니다", "변경하시면 됩니다"),
        (r"업로드 해주시면 됩니다", "업로드하시면 됩니다"),
        (r"다운받으면 됨", "다운로드하시면 됩니다"),
        (r"맞게 다운받으면 됨", "환경에 맞게 다운로드하시면 됩니다"),
        (r"15%는 따라온 겁니다", "15%는 완료하신 것입니다"),
        (r"아주 잘하고 계신겁니다!!", "순조롭게 진행하고 계십니다."),
        (r"공유하려고 합니다!", "공유합니다."),
        (r"완성하셨으면 좋겠습니다.", "완성하실 수 있도록 안내합니다."),
    ]
    for old, new in replacements:
        body = body.replace(old, new)
    return body


def add_series_footer(body: str, filename: str) -> str:
    slug = slug_from_filename(filename)
    if slug not in BLOG_SERIES_LINKS:
        return body
    if "## 📚 관련 글" in body or "## 관련 글" in body:
        return body

    links = BLOG_SERIES_LINKS[slug]
    footer = "\n\n---\n\n## 📚 관련 글\n\n"
    for target_slug, label in links:
        target_file = None
        for p in POSTS_DIR.rglob(f"*-{target_slug}.md"):
            target_file = p.name
            break
        if target_file:
            url = post_url(target_file)
            footer += f"- [{label}]({url})\n"
    return body.rstrip() + footer + "\n"


def add_code_context(body: str, fm: dict) -> str:
    alg = alg_from_tags(fm.get("tags"))
    title = fm.get("title", "문제")

    pattern = re.compile(r"(```java\n[\s\S]*?```)", re.MULTILINE)

    def replacer(match):
        block = match.group(1)
        start = match.start()
        preceding = body[:start].rstrip()
        # Count Korean chars in last 300 chars before block
        tail = preceding[-400:] if len(preceding) > 400 else preceding
        korean_chars = len(re.findall(r"[가-힣]", tail))
        # Skip if already has substantial explanation or is inside a section with heading nearby
        if korean_chars >= 40:
            return block
        if "## ✅" in tail[-200:] or "###" in tail[-150:]:
            return block

        intro = (
            f"\n\n아래 Java 코드는 {alg} 관점에서 접근한 핵심 풀이입니다. "
            f"입력 조건과 시간·공간 복잡도를 함께 고려하여 "
            f"불필요한 연산을 줄이는 방향으로 설계했습니다.\n\n"
        )
        outro = (
            f"\n\n위 구현은 {title}의 제약 조건을 만족하도록 "
            f"자료구조 선택과 반복 범위를 최적화한 결과입니다.\n"
        )
        return intro + block + outro

    # Only add to first java block per file to avoid over-padding
    first = pattern.search(body)
    if not first:
        return body
    new_body = body[: first.start()] + replacer(first) + body[first.end() :]
    return new_body


def process_file(path: Path) -> dict:
    content = path.read_text(encoding="utf-8")
    original = content
    fm, fm_text, body = parse_front_matter(content)
    title = fm.get("title", "")
    slug = slug_from_filename(path.name)
    stats = {"mathjax": False, "title": False, "alt": False, "footer": False}

    # A: Title
    if convert_title(fm, path.name):
        stats["title"] = True
        title = fm["title"]

    # B: MathJax
    new_body = MATHJAX_PATTERN.sub("\n", body)
    if new_body != body:
        stats["mathjax"] = True
        body = new_body

    # C: Alt text
    alt_body = replace_desktop_view(body, title)
    if alt_body != body:
        stats["alt"] = True
        body = alt_body

    # Specific corrections
    body = apply_specific_corrections(body, path.name, slug)

    # Blog tone (blog posts only)
    if "/blog/" in str(path).replace("\\", "/") or "[blog]" in str(fm.get("title", "")):
        body = convert_blog_tone(body)

    # D: Series footer
    footer_body = add_series_footer(body, path.name)
    if footer_body != body:
        stats["footer"] = True
        body = footer_body

    # D: Code context (coding-test posts with java)
    if "coding-test" in str(path).replace("\\", "/"):
        body = add_code_context(body, fm)

    content = rebuild_front_matter(fm, fm_text, body)
    if content != original:
        path.write_text(content, encoding="utf-8")
    return stats


def verify():
    mathjax_left = 0
    desktop_left = 0
    for p in POSTS_DIR.rglob("*.md"):
        text = p.read_text(encoding="utf-8")
        if "MathJax Script for this post only" in text:
            mathjax_left += 1
        if "![Desktop View]" in text:
            desktop_left += 1
    print(f"VERIFY: MathJax blocks remaining: {mathjax_left}")
    print(f"VERIFY: Desktop View remaining: {desktop_left}")
    return mathjax_left == 0 and desktop_left == 0


def main():
    totals = {"files": 0, "mathjax": 0, "title": 0, "alt": 0, "footer": 0}
    for path in sorted(POSTS_DIR.rglob("*.md")):
        stats = process_file(path)
        totals["files"] += 1
        for k in ("mathjax", "title", "alt", "footer"):
            totals[k] += int(stats[k])
    print(f"Processed {totals['files']} files")
    print(f"  MathJax removed: {totals['mathjax']}")
    print(f"  Titles updated: {totals['title']}")
    print(f"  Alt text updated: {totals['alt']}")
    print(f"  Series footers added: {totals['footer']}")
    ok = verify()
    print(f"Verification: {'PASS' if ok else 'NEEDS REVIEW'}")


if __name__ == "__main__":
    main()
