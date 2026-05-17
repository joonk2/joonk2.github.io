const DEFAULT_URL =
  "https://joonk2.github.io/assets/data/problems.json";
const DEFAULT_TTL_SEC = 300;

let memoryCache = null;
let memoryCachedAt = 0;

/** @param {Record<string, string>} env */
export async function getProblems(env) {
  const url = env.PROBLEMS_JSON_URL || DEFAULT_URL;
  const ttlSec = Number(env.PROBLEMS_CACHE_TTL_SEC || DEFAULT_TTL_SEC);
  const ttlMs = ttlSec * 1000;
  const now = Date.now();

  if (memoryCache && now - memoryCachedAt < ttlMs) {
    return memoryCache;
  }

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cf: { cacheTtl: ttlSec },
    });
    if (!res.ok) throw new Error(`problems.json HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("problems.json must be an array");
    memoryCache = data;
    memoryCachedAt = now;
    return data;
  } catch (err) {
    if (memoryCache) {
      console.warn("problems.json fetch failed, stale cache:", err);
      return memoryCache;
    }
    throw err;
  }
}

const ALGORITHM_ALIASES = {
  구현: "implementation",
  백트랙킹: "backtracking",
  백트래킹: "backtracking",
  완전탐색: "bruteforce",
  브루트포스: "bruteforce",
  이분탐색: "binarysearch",
  그리디: "greedy",
  다익스트라: "graph",
  디익스트라: "graph",
  다익: "graph",
  bfs: "bfs",
  dfs: "dfs",
  dp: "dp",
  스택: "stack",
  큐: "queue",
  우선순위큐: "priorityqueue",
  수학: "math",
  문자열: "string",
  시뮬레이션: "simulation",
  그래프: "graph",
};

const LEVEL_ALIASES = {
  쉬움: ["쉬움", "1", "d1", "d2"],
  중간: ["중간", "2", "3", "d3", "d4"],
  어려움: ["어려움", "4", "5", "d5", "d6"],
};

const ALGORITHM_KO_DISPLAY = {
  implementation: "구현",
  backtracking: "백트랙킹",
  bruteforce: "완전탐색",
  binarysearch: "이분탐색",
  graph: "그래프",
  bfs: "BFS",
  dfs: "DFS",
  dp: "DP",
  greedy: "그리디",
  stack: "스택",
  queue: "큐",
  priorityqueue: "우선순위큐",
  math: "수학",
  string: "문자열",
  simulation: "시뮬레이션",
};

/**
 * @param {object[]} problems
 * @param {string} message
 */
export function filterProblems(problems, message) {
  const text = message.toLowerCase();
  let levelKo = "";
  for (const [ko, keys] of Object.entries(LEVEL_ALIASES)) {
    if (keys.some((k) => text.includes(k))) {
      levelKo = ko;
      break;
    }
  }

  let algorithm = "";
  for (const [alias, code] of Object.entries(ALGORITHM_ALIASES)) {
    if (text.includes(alias.toLowerCase()) || text.includes(code)) {
      algorithm = code;
      break;
    }
  }

  if (!levelKo && !algorithm) return [];

  return problems.filter((p) => {
    // Determine the problem's normalized level
    let pLevelKo = p.level_ko;
    if (!pLevelKo) {
      const lv = String(p.level || "").toLowerCase();
      // 쉬움: programmers 1, SWEA D1~D2
      if (["1", "d1", "d2"].includes(lv)) pLevelKo = "쉬움";
      // 중간: programmers 2~3, SWEA D3~D4
      else if (["2", "3", "d3", "d4"].includes(lv)) pLevelKo = "중간";
      // 어려움: programmers 4, SWEA D5~D6
      else if (["4", "5", "d5", "d6"].includes(lv)) pLevelKo = "어려움";
    }

    const levelOk = !levelKo || pLevelKo === levelKo;
    const algoOk =
      !algorithm ||
      p.algorithm === algorithm ||
      p.algorithm_ko === ALGORITHM_KO_DISPLAY[algorithm];
    return levelOk && algoOk;
  });
}

/** @param {object[]} problems */
export function formatProblemsForPrompt(problems) {
  if (!problems?.length) return "(풀이 목록 없음)";

  return problems
    .map((p) => {
      const test = p.test || "개념";
      const num = p.problem_num ? `#${p.problem_num}` : "";
      const level = p.level_ko || p.level || "";
      const algo = p.algorithm_ko || p.algorithm || "";
      const levelPart = level ? ` 난이도:${level}` : "";
      return `- [${test}] ${p.title} ${num} (알고리즘:${algo}${levelPart})`;
    })
    .join("\n");
}

/** @param {object[]} matches */
export function formatRecommendations(matches) {
  if (!matches.length) return null;

  const lines = matches.slice(0, 8).map((p) => {
    const src =
      p.test === "programmers" ? "프로그래머스" : p.test === "swea" ? "SWEA" : "기타";
    const level = p.level_ko || p.level || "";
    const algo = p.algorithm_ko || p.algorithm || "";
    const url = p.url ? `\n   🔗 [바로가기](${p.url})` : "";
    return `• [${src}] ${p.title} (${level}, ${algo})${url}`;
  });

  return (
    `조건에 맞는 블로그 글이야냥! 🐾\n\n${lines.join("\n\n")}\n\n` +
    `더 보고 싶으면 알고리즘이나 난이도를 바꿔서 말해줘냥!`
  );
}
