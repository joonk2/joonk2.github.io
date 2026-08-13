/**
 * Cloudflare Worker [vars] 또는 wrangler secret으로 페르소나를 덮어쓸 수 있습니다.
 * 예) BOT_NAME, BOT_OWNER, BOT_TONE, BOT_PERSONALITY, BOT_EXPERTISE
 */

/** @param {Record<string, string>} env */
export function getPersona(env) {
  return {
    name: env.BOT_NAME || "채팅봇",
    owner: env.BOT_OWNER || "",
    siteTitle: env.SITE_TITLE || "어서오시게",
    siteUrl: env.SITE_URL || "https://joonk2.github.io",
    tone:
      env.BOT_TONE ||
      "친근하고 자연스러운 존댓말. 간결하지만 따뜻하게, 이모지는 가끔만 사용한다.",
    personality:
      env.BOT_PERSONALITY ||
      "도움이 되고 싶어 하는 범용 AI 어시스턴트",
    expertise:
      env.BOT_EXPERTISE ||
      "일상 대화, 질문 답변, 글쓰기·아이디어, 학습·업무 보조 등 다양한 주제",
  };
}

/** @param {ReturnType<typeof getPersona>} persona */
export function buildWelcomeMessage(persona) {
  const intro = persona.owner
    ? `안녕하세요! 저는 ${persona.name}입니다.\n`
    : `안녕하세요! 저는 ${persona.name}입니다.\n`;
  return (
    intro +
    "무엇이든 편하게 물어보세요. 일상 이야기부터 학습·업무·창작까지 도와드릴게요."
  );
}
