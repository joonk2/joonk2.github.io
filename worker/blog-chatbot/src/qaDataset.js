const DEFAULT_URL =
  "https://joonk2.github.io/assets/data/qa-dataset.json";
const DEFAULT_TTL_SEC = 300;

let memoryCache = null;
let memoryCachedAt = 0;

/** @param {Record<string, string>} env */
export async function getQADataset(env) {
  const url = env.QA_DATASET_URL || DEFAULT_URL;
  const ttlSec = Number(env.QA_DATASET_CACHE_TTL_SEC || DEFAULT_TTL_SEC);
  const ttlMs = ttlSec * 1000;
  const now = Date.now();

  if (memoryCache && now - memoryCachedAt < ttlMs) {
    return memoryCache;
  }

  try {
    const fetchUrl = `${url}?t=${now}`;
    const res = await fetch(fetchUrl, {
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
    });
    if (!res.ok) throw new Error(`qa-dataset.json HTTP ${res.status}`);
    const data = await res.json();
    if (!data || typeof data !== "object" || !Array.isArray(data.items)) {
      throw new Error("qa-dataset.json must be { version, items: [] }");
    }
    memoryCache = data;
    memoryCachedAt = now;
    return data;
  } catch (err) {
    if (memoryCache) {
      console.warn("qa-dataset.json fetch failed, stale cache:", err);
      return memoryCache;
    }
    throw err;
  }
}

/** @param {object} dataset */
export function getQAItems(dataset) {
  return Array.isArray(dataset?.items) ? dataset.items : [];
}

/** @param {object[]} items @param {number} [limit] */
export function formatQAForPrompt(items, limit = 80) {
  if (!items?.length) return "(등록된 참고 Q&A 없음 — 일반 지식으로 자유롭게 답변)";

  return items
    .slice(0, limit)
    .map((item) => {
      const q = String(item.question || "").trim();
      const a = String(item.answer || "").trim();
      const tags = Array.isArray(item.tags) ? item.tags.join(", ") : "";
      const tagPart = tags ? ` [${tags}]` : "";
      return `Q: ${q}${tagPart}\nA: ${a}`;
    })
    .join("\n\n");
}

/** @param {object[]} items @param {string} message @param {number} [max] */
export function findRelevantQA(items, message, max = 5) {
  const text = message.trim().toLowerCase();
  if (!text || !items?.length) return [];

  const scored = items
    .map((item) => {
      const q = String(item.question || "").toLowerCase();
      const a = String(item.answer || "").toLowerCase();
      const tags = (item.tags || []).join(" ").toLowerCase();
      let score = 0;
      const words = text.split(/\s+/).filter((w) => w.length > 1);
      for (const w of words) {
        if (q.includes(w)) score += 3;
        if (a.includes(w)) score += 1;
        if (tags.includes(w)) score += 2;
      }
      if (q.includes(text) || text.includes(q.slice(0, Math.min(q.length, 12)))) {
        score += 5;
      }
      return { item, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, max).map((row) => row.item);
}
