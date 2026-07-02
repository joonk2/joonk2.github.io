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

  // For debugging/forcing update: bypass internal memory cache if needed
  // if (memoryCache && now - memoryCachedAt < ttlMs) {
  //   return memoryCache;
  // }

  try {
    // Add timestamp to bypass Cloudflare's own Edge Cache
    const fetchUrl = `${url}?t=${now}`;
    const res = await fetch(fetchUrl, {
      headers: { 
        "Accept": "application/json",
        "Cache-Control": "no-cache" 
      },
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
  쉬움: ["쉬움", "1", "d1", "d2", "easy"],
  중간: ["중간", "2", "3", "d3", "d4", "medium"],
  어려움: ["어려움", "4", "5", "d5", "d6", "hard"],
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
  
  // 1. Try direct title search first (highest priority)
  const titleMatches = problems.filter(p => 
    p.title.toLowerCase().includes(text) || 
    (p.problem_num && text.includes(p.problem_num))
  );
  if (titleMatches.length > 0) return titleMatches;

  // 2. Extract level and algorithm keywords
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
      if (["1", "d1", "d2", "easy"].includes(lv)) pLevelKo = "쉬움";
      else if (["2", "3", "d3", "d4", "medium"].includes(lv)) pLevelKo = "중간";
      else if (["4", "5", "d5", "d6", "hard"].includes(lv)) pLevelKo = "어려움";
    }

    const levelOk = !levelKo || pLevelKo === levelKo;
    const algoOk =
      !algorithm ||
      (p.algorithm && p.algorithm.includes(algorithm)) ||
      (p.algorithm_ko && ALGORITHM_KO_DISPLAY[algorithm] && p.algorithm_ko.includes(ALGORITHM_KO_DISPLAY[algorithm]));
    
    // For "programmers 레벨2", ensure it matches the test type if mentioned
    const testOk = !text.includes("programmers") || p.test === "programmers";
    const testOk2 = !text.includes("swea") || p.test === "swea";
    const testOk3 =
      (!text.includes("leetcode") && !text.includes("리트코드")) ||
      p.test === "leetcode";

    return levelOk && algoOk && testOk && testOk2 && testOk3;
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

  const lines = matches.slice(0, 5).map((p) => {
    const src =
      p.test === "programmers"
        ? "프로그래머스"
        : p.test === "swea"
          ? "SWEA"
          : p.test === "leetcode"
            ? "LeetCode"
            : "기타";
    const level = p.level_ko || p.level || "";
    const algo = p.algorithm_ko || p.algorithm || "";
    
    return `**[${src}] ${p.title}**\n${level} | ${algo}\n[🚀 풀이 보기](${p.url})`;
  });

  return (
    `조건에 맞는 블로그 글이야냥! 🐾\n\n` +
    `${lines.join("\n\n---\n\n")}\n\n` +
    `더 보고 싶으면 알고리즘이나 난이도를 바꿔서 말해줘냥!`
  );
}
