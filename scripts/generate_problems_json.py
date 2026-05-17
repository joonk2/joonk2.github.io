#!/usr/bin/env python3
"""Generate problems.json from datastructure-algorithm markdown posts."""

from __future__ import annotations

import json
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS_DIR = os.path.join(
    REPO_ROOT, "_posts", "coding-test", "datastructure-algorithm"
)
OUTPUT_PATHS = [
    os.path.join(REPO_ROOT, "assets", "data", "problems.json"),
]

# _config.yml url + defaults.posts.permalink: /posts/:year/:month/:day/:title/
SITE_URL = "https://joonk2.github.io"
POST_PERMALINK_PREFIX = "/posts"

ALGORITHM_KO: dict[str, str] = {
    "implementation": "구현",
    "bfs": "BFS",
    "dfs": "DFS",
    "backtracking": "백트랙킹",
    "binarysearch": "이분탐색",
    "dp": "DP",
    "graph": "그래프",
    "greedy": "그리디",
    "stack": "스택",
    "queue": "큐",
    "priorityqueue": "우선순위큐",
    "bruteforce": "완전탐색",
    "math": "수학",
    "string": "문자열",
    "simulation": "시뮬레이션",
}

PROGRAMMERS_LEVEL_KO = {"1": "쉬움", "2": "중간", "3": "어려움"}

SWEA_LEVEL_KO = {
    "D1": "쉬움", "D2": "쉬움",
    "D3": "중간", "D4": "중간",
    "D5": "어려움", "D6": "어려움",
}

ALLOWED = frozenset({
    "implementation", "bfs", "dfs", "backtracking", "binarysearch", "dp",
    "graph", "greedy", "stack", "queue", "priorityqueue", "bruteforce",
    "math", "string", "simulation",
})

TAG_MAP: dict[str, str | None] = {
    "back-tracking": "backtracking",
    "backtracking": "backtracking",
    "priority-queue": "priorityqueue",
    "priorityqueue": "priorityqueue",
    "dijikstra": "graph",
    "dijkstra": "graph",
    "shortest-path": "graph",
    "prim": "graph",
    "bfs": "bfs",
    "dfs": "dfs",
    "dp": "dp",
    "greedy": "greedy",
    "stack": "stack",
    "queue": "queue",
    "implementation": "implementation",
    "bruteforce": "bruteforce",
    "math": "math",
    "string": "string",
    "simulation": "simulation",
    "binarysearch": "binarysearch",
    "binary-search": "binarysearch",
    "quad-tree": "backtracking",
    "two-pointer": "binarysearch",
    "cum-sum": "dp",
    "sort": "implementation",
    "combination": "backtracking",
    "permutation": "backtracking",
    "bitmasking": "backtracking",
    "twopointer": "binarysearch",
    "parametricsearch": "binarysearch",
    "arraydeque": "queue",
    "hashset": "implementation",
    "hashmap": "implementation",
    "heap": "priorityqueue",
    "datastructure": None,
    "algorithm": None,
    "timecomplexity": None,
    "swea": None,
}

TAG_PRIORITY = (
    "dp", "backtracking", "bfs", "dfs", "graph", "greedy", "binarysearch",
    "priorityqueue", "stack", "queue", "bruteforce", "math", "string",
    "simulation", "implementation",
)

# programmers: problem_num -> (level, algorithm, title)
PROG_REF: dict[str, tuple[str, str, str]] = {
    "389478": ("1", "implementation", "택배 상자 꺼내기"),
    "388353": ("2", "bfs", "지게차와 크레인"),
    "388352": ("2", "backtracking", "비밀 코드 해독"),
    "389479": ("2", "dp", "서버 증설 횟수"),
    "250136": ("2", "bfs", "석유 시추"),
    "150368": ("2", "backtracking", "이모티콘 할인행사"),
    "118667": ("2", "implementation", "두 큐 합 같게 만들기"),
    "92344": ("3", "dp", "파괴되지 않은 건물"),
    "87390": ("2", "binarysearch", "n^2 배열 자르기"),
    "81302": ("2", "implementation", "거리두기 확인하기"),
    "77485": ("2", "implementation", "행렬 테두리 회전하기"),
    "76502": ("2", "implementation", "괄호 회전하기"),
    "68936": ("2", "backtracking", "쿼드압축 후 개수 세기"),
    "49994": ("2", "implementation", "방문 길이"),
    "49993": ("2", "implementation", "스킬트리"),
    "17679": ("2", "implementation", "[1차] 프렌즈4블록"),
    "12987": ("3", "binarysearch", "숫자 게임"),
    "12985": ("2", "math", "예상 대진표"),
    "12977": ("1", "backtracking", "소수 만들기"),
    "12971": ("3", "dp", "스티커 모으기(2)"),
    "12798": ("2", "priorityqueue", "배달"),
    "86971": ("2", "dfs", "전력망을 둘로 나누기"),
    "42898": ("2", "dp", "등굣길"),
    "42884": ("1", "greedy", "단속카메라"),
    "42860": ("2", "greedy", "조이스틱"),
}


def parse_frontmatter(content: str) -> dict[str, str]:
    m = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    block = m.group(1) if m else ""
    if not block and content.startswith("title:"):
        block = re.split(r"\n(?=##|\n# )", content, maxsplit=1)[0]
    fm: dict[str, str] = {}
    for line in block.split("\n"):
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    return fm


def parse_tags(tags_str: str) -> list[str]:
    if not tags_str:
        return []
    tags_str = tags_str.strip()
    if tags_str.startswith("["):
        inner = tags_str[1:-1]
        return [t.strip().strip("'\"") for t in re.split(r",\s*", inner) if t.strip()]
    return [tags_str]


def map_tag(tags: list[str]) -> str:
    mapped: list[str] = []
    for t in tags:
        orig = t.lower().strip()
        key = orig.replace(" ", "").replace("_", "")
        v = TAG_MAP.get(orig) or TAG_MAP.get(key)
        if v and v in ALLOWED:
            mapped.append(v)
        elif orig in ALLOWED:
            mapped.append(orig)
    for p in TAG_PRIORITY:
        if p in mapped:
            return p
    return mapped[0] if mapped else "implementation"


def extract_swea_title(title: str) -> str:
    title = title.strip('"')
    m = re.search(r"\]\s*\d+\.\s*(.+)$", title)
    if m:
        return m.group(1).strip()
    m = re.search(r"\d+\.\s*(.+)$", title)
    return m.group(1).strip() if m else title


def extract_prog_title(title: str) -> str:
    return re.sub(r"^\[.*?\]\s*", "", title.strip('"')).strip()


def extract_swea_level(title: str) -> str:
    m = re.search(r"\[swea-(D\d+)\]", title, re.I)
    return m.group(1).upper() if m else ""


def infer_concept_algorithm(title: str, tags: list[str]) -> str:
    algo = map_tag(tags)
    tl = title.lower().replace(" ", "").replace("-", "")
    if "dijikstra" in tl or "dijkstra" in tl or tl == "prim" or "prim" in tl:
        return "graph"
    if "priorityqueue" in tl:
        return "priorityqueue"
    if "dfs" in tl and "bfs" in tl:
        return "bfs"
    if "binarysearch" in tl or "upperbound" in tl or "lowerbound" in tl:
        return "binarysearch"
    if "parametricsearch" in tl:
        return "binarysearch"
    if tl == "dp":
        return "dp"
    if "greedy" in tl:
        return "greedy"
    if "stack" in tl and "queue" in tl:
        return "stack"
    if "stack" in tl:
        return "stack"
    if "queue" in tl:
        return "queue"
    if "heap" in tl:
        return "priorityqueue"
    if any(x in tl for x in ("subset", "combination", "permutation", "comb")):
        return "backtracking"
    if "bitmask" in tl:
        return "backtracking"
    if "sort" in tl:
        return "implementation"
    if "twopointer" in tl:
        return "binarysearch"
    return algo


def resolve_post_date(fm: dict[str, str], fname: str) -> tuple[str, str, str] | None:
    date_raw = fm.get("date", "").strip()
    if date_raw:
        m = re.match(r"(\d{4})-(\d{2})-(\d{2})", date_raw)
        if m:
            return m.group(1), m.group(2), m.group(3)
    m = re.match(r"^(\d{2})-(\d{2})-(\d{2})-", fname)
    if m:
        yy, mo, dd = m.groups()
        return f"20{yy}", mo, dd
    return None


def build_post_url(fm: dict[str, str], fname: str) -> str:
    parts = resolve_post_date(fm, fname)
    if not parts:
        return ""
    year, month, day = parts
    
    # Jekyll's :title in permalink /posts/:year/:month/:day/:title/
    # refers to the filename without the leading date (YYYY-MM-DD- or YY-MM-DD-)
    slug = os.path.splitext(fname)[0]
    # Match both 2026-02-11- and 26-02-11-
    title_match = re.match(r"^(?:\d{4}|\d{2})-\d{2}-\d{2}-(.+)$", slug)
    title_part = title_match.group(1) if title_match else slug
    
    return f"{SITE_URL}{POST_PERMALINK_PREFIX}/{year}/{month}/{day}/{title_part}/"


def parse_markdown_file(fname: str, content: str) -> dict[str, str]:
    fm = parse_frontmatter(content)
    title_raw = fm.get("title", "").strip('"').strip()
    tags = parse_tags(fm.get("tags", ""))

    entry: dict[str, str] = {
        "test": "",
        "title": "",
        "problem_num": "",
        "level": "",
        "algorithm": "",
        "algorithm_ko": "",
        "level_ko": "",
        "url": "",
    }

    if "programmers" in fname:
        entry["test"] = "programmers"
        m = re.search(r"programmers-(\d+)", fname)
        entry["problem_num"] = m.group(1) if m else ""
        if entry["problem_num"] in PROG_REF:
            level, algo, ref_title = PROG_REF[entry["problem_num"]]
            entry["level"] = level
            entry["algorithm"] = algo
            entry["title"] = ref_title
        else:
            entry["title"] = extract_prog_title(title_raw)
            entry["algorithm"] = map_tag(tags)
    elif "swea" in fname:
        entry["test"] = "swea"
        m = re.search(r"swea-(\d+)", fname)
        entry["problem_num"] = m.group(1) if m else ""
        entry["level"] = extract_swea_level(title_raw)
        entry["title"] = extract_swea_title(title_raw)
        
        # Multiple algorithms support
        if entry["problem_num"] == "4193":
            entry["algorithm"] = "bfs, greedy"
        elif entry["problem_num"] == "2550":
            entry["algorithm"] = "bruteforce"
        else:
            entry["algorithm"] = map_tag(tags)
    else:
        entry["title"] = title_raw
        entry["algorithm"] = infer_concept_algorithm(title_raw, tags)

    # Convert comma-separated algorithms to Korean names
    algos = [a.strip() for a in entry["algorithm"].split(",") if a.strip()]
    for a in algos:
        if a not in ALLOWED:
            raise ValueError(f"{fname}: invalid algorithm '{a}'")
    
    entry["algorithm_ko"] = ", ".join([ALGORITHM_KO.get(a, a) for a in algos])
    entry["level_ko"] = _resolve_level_ko(entry)
    entry["url"] = build_post_url(fm, fname)

    return entry


def _resolve_level_ko(entry: dict[str, str]) -> str:
    if entry["test"] == "programmers" and entry["level"] in PROGRAMMERS_LEVEL_KO:
        return PROGRAMMERS_LEVEL_KO[entry["level"]]
    if entry["test"] == "swea" and entry["level"] in SWEA_LEVEL_KO:
        return SWEA_LEVEL_KO[entry["level"]]
    return ""


def collect_entries() -> list[dict[str, str]]:
    entries: list[dict[str, str]] = []
    for fname in sorted(os.listdir(POSTS_DIR)):
        if not fname.endswith(".md"):
            continue
        if "boj" in fname.lower():
            continue
        path = os.path.join(POSTS_DIR, fname)
        with open(path, encoding="utf-8") as f:
            content = f.read()
        entries.append(parse_markdown_file(fname, content))
    return entries


def write_outputs(entries: list[dict[str, str]]) -> bool:
    payload = json.dumps(entries, ensure_ascii=False, indent=2) + "\n"
    changed = False
    for out_path in OUTPUT_PATHS:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        existing = ""
        if os.path.isfile(out_path):
            with open(out_path, encoding="utf-8") as f:
                existing = f.read()
        if existing != payload:
            with open(out_path, "w", encoding="utf-8", newline="\n") as f:
                f.write(payload)
            changed = True
            print(f"updated: {out_path}")
        else:
            print(f"unchanged: {out_path}")
    return changed


def main() -> int:
    if not os.path.isdir(POSTS_DIR):
        print(f"error: directory not found: {POSTS_DIR}", file=sys.stderr)
        return 1
    entries = collect_entries()
    print(f"parsed {len(entries)} entries")
    write_outputs(entries)
    return 0


if __name__ == "__main__":
    sys.exit(main())
