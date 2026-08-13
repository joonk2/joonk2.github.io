#!/usr/bin/env python3
"""Manage chatbot Q&A dataset (assets/data/qa-dataset.json)."""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parents[1]
DATASET_PATH = REPO_ROOT / "assets" / "data" / "qa-dataset.json"

DEFAULT_SEEDS: list[dict[str, Any]] = [
    {
        "question": "너는 누구야?",
        "answer": "저는 이 사이트의 AI 채팅봇입니다. 일상 대화, 질문 답변, 글쓰기·아이디어, 학습·업무 보조 등 다양한 주제로 도와드릴 수 있어요.",
        "tags": ["소개"],
    },
    {
        "question": "무엇을 도와줄 수 있어?",
        "answer": "궁금한 것을 물어보거나, 글 다듬기, 아이디어 브레인스토밍, 개념 설명, 간단한 코드 질문 등 무엇이든 편하게 말씀해 주세요.",
        "tags": ["도움말"],
    },
]


def now_iso() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")


def load_dataset() -> dict[str, Any]:
    if not DATASET_PATH.is_file():
        return {"version": 1, "updated_at": now_iso(), "items": []}
    with DATASET_PATH.open(encoding="utf-8") as f:
        data = json.load(f)
    if not isinstance(data, dict):
        raise ValueError("qa-dataset.json root must be an object")
    data.setdefault("version", 1)
    data.setdefault("items", [])
    if not isinstance(data["items"], list):
        raise ValueError("'items' must be an array")
    return data


def save_dataset(data: dict[str, Any]) -> None:
    data["updated_at"] = now_iso()
    DATASET_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    DATASET_PATH.write_text(payload, encoding="utf-8")
    print(f"saved: {DATASET_PATH}")


def next_id(items: list[dict[str, Any]]) -> str:
    max_num = 0
    for item in items:
        m = re.match(r"qa-(\d+)$", str(item.get("id", "")))
        if m:
            max_num = max(max_num, int(m.group(1)))
    return f"qa-{max_num + 1:04d}"


def validate_dataset(data: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    items = data.get("items", [])
    if not isinstance(items, list):
        return ["items must be an array"]

    seen_ids: set[str] = set()
    for i, item in enumerate(items):
        prefix = f"items[{i}]"
        if not isinstance(item, dict):
            errors.append(f"{prefix}: must be an object")
            continue
        q = str(item.get("question", "")).strip()
        a = str(item.get("answer", "")).strip()
        item_id = str(item.get("id", "")).strip()
        if not q:
            errors.append(f"{prefix}: question is required")
        if not a:
            errors.append(f"{prefix}: answer is required")
        if not item_id:
            errors.append(f"{prefix}: id is required")
        elif item_id in seen_ids:
            errors.append(f"{prefix}: duplicate id '{item_id}'")
        else:
            seen_ids.add(item_id)
        tags = item.get("tags", [])
        if tags is not None and not isinstance(tags, list):
            errors.append(f"{prefix}: tags must be an array")
    return errors


def cmd_init(_: argparse.Namespace) -> int:
    if DATASET_PATH.exists():
        print(f"already exists: {DATASET_PATH}")
        return 0
    data = {"version": 1, "updated_at": now_iso(), "items": []}
    for seed in DEFAULT_SEEDS:
        data["items"].append(
            {
                "id": next_id(data["items"]),
                "question": seed["question"],
                "answer": seed["answer"],
                "tags": seed.get("tags", []),
                "source": "seed",
                "created_at": now_iso(),
            }
        )
    save_dataset(data)
    print(f"initialized with {len(data['items'])} seed items")
    return 0


def cmd_add(args: argparse.Namespace) -> int:
    data = load_dataset()
    question = args.question.strip()
    answer = args.answer.strip()
    if not question or not answer:
        print("error: --question and --answer are required", file=sys.stderr)
        return 1
    tags = [t.strip() for t in (args.tags or "").split(",") if t.strip()]
    item = {
        "id": next_id(data["items"]),
        "question": question,
        "answer": answer,
        "tags": tags,
        "source": args.source or "manual",
        "created_at": now_iso(),
    }
    data["items"].append(item)
    save_dataset(data)
    print(f"added {item['id']}")
    return 0


def cmd_list(args: argparse.Namespace) -> int:
    data = load_dataset()
    items = data["items"]
    if args.tag:
        items = [i for i in items if args.tag in (i.get("tags") or [])]
    print(f"total: {len(items)}")
    for item in items:
        tags = ", ".join(item.get("tags") or [])
        print(f"- [{item.get('id')}] {item.get('question')}")
        if tags:
            print(f"  tags: {tags}")
    return 0


def cmd_validate(_: argparse.Namespace) -> int:
    data = load_dataset()
    errors = validate_dataset(data)
    if errors:
        print("invalid dataset:", file=sys.stderr)
        for err in errors:
            print(f"  - {err}", file=sys.stderr)
        return 1
    print(f"ok: {len(data['items'])} items")
    return 0


def cmd_import(args: argparse.Namespace) -> int:
    path = Path(args.file)
    if not path.is_file():
        print(f"error: file not found: {path}", file=sys.stderr)
        return 1
    with path.open(encoding="utf-8") as f:
        payload = json.load(f)

    rows: list[dict[str, Any]]
    if isinstance(payload, list):
        rows = payload
    elif isinstance(payload, dict) and isinstance(payload.get("items"), list):
        rows = payload["items"]
    else:
        print("error: import file must be an array or { items: [] }", file=sys.stderr)
        return 1

    data = load_dataset()
    added = 0
    for row in rows:
        if not isinstance(row, dict):
            continue
        q = str(row.get("question", "")).strip()
        a = str(row.get("answer", "")).strip()
        if not q or not a:
            continue
        tags = row.get("tags") or []
        if not isinstance(tags, list):
            tags = []
        data["items"].append(
            {
                "id": next_id(data["items"]),
                "question": q,
                "answer": a,
                "tags": [str(t) for t in tags],
                "source": row.get("source") or "import",
                "created_at": row.get("created_at") or now_iso(),
            }
        )
        added += 1
    save_dataset(data)
    print(f"imported {added} items")
    return 0


def cmd_export(args: argparse.Namespace) -> int:
    data = load_dataset()
    out = Path(args.output) if args.output else DATASET_PATH
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"exported to {out}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Manage chatbot Q&A dataset")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("init", help="Create qa-dataset.json with seed Q&A")

    add_p = sub.add_parser("add", help="Add one Q&A pair")
    add_p.add_argument("-q", "--question", required=True)
    add_p.add_argument("-a", "--answer", required=True)
    add_p.add_argument("--tags", default="")
    add_p.add_argument("--source", default="manual")

    list_p = sub.add_parser("list", help="List Q&A items")
    list_p.add_argument("--tag", default="")

    sub.add_parser("validate", help="Validate dataset schema")

    imp = sub.add_parser("import", help="Import Q&A from JSON file")
    imp.add_argument("file")

    exp = sub.add_parser("export", help="Export dataset JSON")
    exp.add_argument("-o", "--output", default="")

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    handlers = {
        "init": cmd_init,
        "add": cmd_add,
        "list": cmd_list,
        "validate": cmd_validate,
        "import": cmd_import,
        "export": cmd_export,
    }
    return handlers[args.command](args)


if __name__ == "__main__":
    sys.exit(main())
