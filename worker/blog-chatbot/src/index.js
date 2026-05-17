import {
  filterProblems,
  formatProblemsForPrompt,
  formatRecommendations,
  getProblems,
} from "./problems.js";
import {
  WELCOME_MESSAGE,
  buildSystemInstruction,
  isGreeting,
} from "./prompts.js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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

/** @param {string} message @param {Array} history @param {Record<string,string>} env */
async function callGemini(message, history, env, systemInstruction) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const model = env.GEMINI_MODEL || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const contents = [];
  for (const turn of history.slice(-8)) {
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
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || `Gemini HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "POST only" }, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400);
    }

    const message = (body.message || "").trim();
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message) {
      return jsonResponse({ error: "message required" }, 400);
    }

    if (isGreeting(message)) {
      return geminiTextResponse(WELCOME_MESSAGE);
    }

    try {
      const problems = await getProblems(env);
      const problemsBlock = formatProblemsForPrompt(problems);

      const matches = filterProblems(problems, message);
      const recommendation = formatRecommendations(matches);
      if (recommendation) {
        return geminiTextResponse(recommendation);
      }

      const systemInstruction = buildSystemInstruction(problemsBlock);
      const data = await callGemini(message, history, env, systemInstruction);
      return jsonResponse(data);
    } catch (err) {
      console.error(err);
      return jsonResponse(
        {
          error: { message: err.message || "Internal error" },
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: `냥... 잠시 문제가 생겼다옹. (${err.message})`,
                  },
                ],
              },
            },
          ],
        },
        500
      );
    }
  },
};
