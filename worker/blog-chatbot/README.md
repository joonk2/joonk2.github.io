# blog-chatbot Worker

Gemini API 기반 **범용 생성형 AI** 챗봇 (`blog-chatbot.with-joonk.workers.dev`)

## 아키텍처

| 구분 | 설명 |
|------|------|
| 프론트 | `assets/js/chatbot-modal.js` — 대화 UI, 개인 페르소나 설정 |
| Worker | Cloudflare Worker — Gemini 호출 |
| 데이터 | `assets/data/qa-dataset.json` — (선택) 운영자 참고 Q&A |

알고리즘·블로그 특화 제한 없이 **일반 생성형 AI**처럼 동작합니다.  
Q&A JSON은 있으면 참고하고, 없어도 Gemini가 자유롭게 답합니다.

## Q&A 데이터 (선택)

`scripts/manage_qa_dataset.py`로 사이트 맞춤 Q&A를 추가할 수 있습니다.

```bash
py -3 scripts/manage_qa_dataset.py add -q "질문" -a "답변"
```

## API

| Method | Path | 설명 |
|--------|------|------|
| GET | `/health` | Worker 상태 |
| GET | `/config` | 봇 이름·환영 메시지 |
| POST | `/` | `{ message, history[], userPersona? }` |

## 배포

```bash
cd worker/blog-chatbot
npm install
npx wrangler secret put GEMINI_API_KEY
npm run deploy
```

## 페르소나 (`wrangler.toml`)

```toml
BOT_NAME = "채팅봇"
BOT_TONE = "친근하고 자연스러운 존댓말..."
BOT_PERSONALITY = "범용 AI 어시스턴트"
BOT_EXPERTISE = "일상, 학습, 업무, 창작, 코딩 등"
```
