import {
  findRelevantQA,
  formatQAForPrompt,
  getQADataset,
  getQAItems,
} from "./qaDataset.js";
import { buildWelcomeMessage, getPersona } from "./persona.js";
import { buildSystemInstruction, formatRelevantQA } from "./prompts.js";
import { buildUserPersonaBlock } from "./userPersona.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function geminiTextResponse(text) {
  return jsonResponse({
    candidates: [
      {
        content: { parts: [{ text }] },
        finishReason: "STOP",
      },
    ],
  });
}

/** @param {unknown} data */
function extractTextFromGemini(data) {
  if (data?.error) {
    const err = data.error;
    throw new Error(
      typeof err === "string" ? err : err.message || JSON.stringify(err)
    );
  }
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return null;
  return parts.map((p) => p?.text).filter(Boolean).join("\n").trim() || null;
}

/** @param {string} message @param {Array} history @param {Record<string,string>} env @param {string} systemInstruction */
async function callGemini(message, history, env, systemInstruction) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const model = env.GEMINI_MODEL || "gemini-2.5-flash";
  const apiVersion = env.GEMINI_API_VERSION || "v1beta";
  const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;

  const contents = [];
  for (const turn of history.slice(-12)) {
    if (!turn?.content) continue;
    contents.push({
      role: turn.role === "assistant" ? "model" : "user",
      parts: [{ text: turn.content }],
    });
  }
  contents.push({ role: "user", parts: [{ text: message }] });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents,
      generationConfig: {
        temperature: Number(env.GEMINI_TEMPERATURE || 0.75),
        maxOutputTokens: Number(env.GEMINI_MAX_OUTPUT_TOKENS || 2048),
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || `Gemini HTTP ${res.status}`;
    throw new Error(msg);
  }

  const text = extractTextFromGemini(data);
  if (!text) {
    const reason =
      data?.candidates?.[0]?.finishReason || "응답 본문이 비어 있음";
    throw new Error(reason);
  }
  return text;
}

function errorResponse(err, status = 200) {
  const message = err?.message || String(err) || "Internal error";
  console.error(err);
  return jsonResponse(
    {
      error: { message },
      candidates: [
        {
          content: {
            parts: [
              {
                text: `죄송합니다. 잠시 문제가 발생했습니다.\n(${message})\n잠시 후 다시 시도해 주세요.`,
              },
            ],
          },
        },
      ],
    },
    status
  );
}

/** @param {Record<string,string>} env @param {object} [userPersona] @param {string} [message] */
async function buildChatContext(env, userPersona, message = "") {
  const persona = getPersona(env);
  let qaBlock = "(등록된 참고 Q&A 없음 — 일반 지식으로 자유롭게 답변)";
  let relevantBlock = "";
  try {
    const dataset = await getQADataset(env);
    const items = getQAItems(dataset);
    qaBlock = formatQAForPrompt(items);
    if (message) {
      const relevant = findRelevantQA(items, message);
      relevantBlock = formatRelevantQA(relevant);
    }
  } catch (err) {
    console.warn("qa-dataset.json unavailable:", err);
  }
  const userPersonaBlock = buildUserPersonaBlock(userPersona);
  const systemInstruction =
    buildSystemInstruction(persona, qaBlock, relevantBlock) + userPersonaBlock;
  return { persona, systemInstruction };
}

export default {
  async fetch(request, env) {
    try {
      if (request.method === "OPTIONS") {
        return new Response(null, { headers: CORS_HEADERS });
      }

      const url = new URL(request.url);

      if (request.method === "GET" && url.pathname === "/health") {
        return jsonResponse({
          ok: true,
          hasApiKey: Boolean(env.GEMINI_API_KEY),
          model: env.GEMINI_MODEL || "gemini-2.5-flash",
        });
      }

      if (request.method === "GET" && url.pathname === "/config") {
        const { persona } = await buildChatContext(env);
        return jsonResponse({
          name: persona.name,
          owner: persona.owner,
          siteTitle: persona.siteTitle,
          welcome: buildWelcomeMessage(persona),
          model: env.GEMINI_MODEL || "gemini-2.5-flash",
        });
      }

      if (request.method !== "POST") {
        return jsonResponse({ error: "GET /health, GET /config, POST /chat" }, 405);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return jsonResponse({ error: "Invalid JSON" }, 400);
      }

      const message = (body.message || "").trim();
      const history = Array.isArray(body.history) ? body.history : [];
      const userPersona =
        body.userPersona && typeof body.userPersona === "object"
          ? body.userPersona
          : null;

      if (!message) {
        return jsonResponse({ error: "message required" }, 400);
      }

      const { systemInstruction } = await buildChatContext(
        env,
        userPersona,
        message
      );
      const replyText = await callGemini(
        message,
        history,
        env,
        systemInstruction
      );
      return geminiTextResponse(replyText);
    } catch (err) {
      return errorResponse(err);
    }
  },
};
