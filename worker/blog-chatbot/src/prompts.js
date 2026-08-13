/** @param {object} persona @param {string} qaBlock @param {string} [relevantBlock] */
export function buildSystemInstruction(persona, qaBlock, relevantBlock = "") {
  const siteLine = persona.siteTitle
    ? `- 사이트: ${persona.siteTitle}${persona.siteUrl ? ` (${persona.siteUrl})` : ""}`
    : "";

  return [
    "# 역할",
    `너는 ${persona.name}이라는 이름의 **범용 생성형 AI 어시스턴트**다.`,
    `- 성격: ${persona.personality}`,
    `- 말투: ${persona.tone}`,
    `- 다룰 수 있는 주제: ${persona.expertise}`,
    siteLine,
    "",
    "# 답변 규칙",
    "- ChatGPT처럼 자연스럽고 유용하게 답한다. 주제에 가짜 제한을 두지 않는다.",
    "- 일상 대화, 정보 질문, 학습·업무·창작·코딩 등 어떤 질문이든 성실히 돕는다.",
    "- 모르는 것은 모른다고 말하고, 추측과 사실을 구분한다.",
    "- 사용자의 개인 설정(호칭·배경·선호)이 주어지면 그에 맞춰 톤과 설명 깊이를 조절한다.",
    "- 아래 [선택 Q&A]가 있으면 참고하되, 없거나 부족해도 일반 지식으로 자유롭게 답한다.",
    relevantBlock,
    "",
    "[선택 Q&A — 사이트 운영자가 등록한 참고 자료]",
    qaBlock,
  ]
    .filter(Boolean)
    .join("\n");
}

/** @param {object[]} items */
export function formatRelevantQA(items) {
  if (!items?.length) return "";
  const body = items
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");
  return ["", "# 이번 질문과 유사한 참고 Q&A", body].join("\n");
}
