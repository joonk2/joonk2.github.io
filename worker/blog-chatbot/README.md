# blog-chatbot Worker

블로그 AI 고양이 챗봇 API (`blog-chatbot.with-joonk.workers.dev`)

## 배포

```bash
cd worker/blog-chatbot
npm install
npx wrangler secret put GEMINI_API_KEY
npm run deploy
```

## 동작

| 사용자 입력 | 응답 |
|-------------|------|
| `안녕` 등 인사 | 환영 메시지 + 난이도/알고리즘 안내 |
| `레벨은 쉬움, 구현으로 할게` | `problems.json` 필터 → 추천 목록 |
| 그 외 | Gemini + 블로그 풀이 목록 컨텍스트 |

`problems.json`의 `algorithm_ko`, `level_ko` 필드로 한글 매칭.

## 환경 변수

- `GEMINI_API_KEY` (secret)
- `PROBLEMS_JSON_URL` (wrangler.toml)
- `PROBLEMS_CACHE_TTL_SEC` (기본 300)
