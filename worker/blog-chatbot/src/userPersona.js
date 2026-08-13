/**
 * @param {{ enabled?: boolean, nickname?: string, occupation?: string, extra?: string } | null | undefined} userPersona
 */
export function buildUserPersonaBlock(userPersona) {
  if (!userPersona?.enabled) return "";

  const nickname = (userPersona.nickname || "").trim();
  const occupation = (userPersona.occupation || "").trim();
  const extra = (userPersona.extra || "").trim();

  if (!nickname && !occupation && !extra) return "";

  const lines = [
    "",
    "# 대화 상대(사용자) 개인 정보",
    "아래는 방문자가 직접 설정한 정보다. 답변할 때 반드시 참고하고 맞춤형으로 응답한다.",
  ];

  if (nickname) {
    lines.push(`- 호칭: ${nickname} (이 이름으로 불러준다)`);
  }
  if (occupation) {
    lines.push(`- 직업·배경: ${occupation}`);
  }
  if (extra) {
    lines.push(`- 관심사·선호·기억할 정보: ${extra}`);
  }

  lines.push(
    "- 사용자의 수준, 관심사, 선호에 맞게 설명 난이도·예시·톤을 조절한다.",
    "- 설정된 정보와 모순되는 가정을 하지 않는다."
  );

  return lines.join("\n");
}
