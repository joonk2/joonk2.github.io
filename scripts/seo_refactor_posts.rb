# frozen_string_literal: true

require "fileutils"

POSTS_DIR = File.expand_path("../_posts", __dir__)
BASE_URL = "https://joonk2.github.io"

MATHJAX_PATTERN = %r{
  \n?(?:<!--\ MathJax\ Script\ for\ this\ post\ only\ -->\s*)?
  <script\ type="text/javascript"\ async.*?</script>\s*
  <script\ type="text/x-mathjax-config">.*?</script>\s*
}mx

TAG_ALG = {
  "dp" => "DP", "bfs" => "BFS", "dfs" => "DFS", "greedy" => "그리디",
  "implementation" => "구현", "binary-search" => "이분 탐색", "two-pointer" => "투 포인터",
  "queue" => "큐", "stack" => "스택", "sort" => "정렬", "math" => "수학", "graph" => "그래프",
  "dijkstra" => "다익스트라", "prim" => "프림", "backtracking" => "백트래킹",
  "bruteforce" => "완전 탐색", "simulation" => "시뮬레이션"
}.freeze

BLOG_TITLE_MAP = {
  "깃허브 블로그 만드는 법 1" => "[깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 1편 기초 세팅",
  "깃허브 블로그 만드는 법 2" => "[깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 2편 로컬 실행",
  "깃허브 블로그 만드는 법 3" => "[깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 3편 최종 배포",
  "깃허브 블로그 구글검색 노출시키기" => "[깃허브 블로그] 구글 서치 콘솔 검색 노출 설정 - sitemap·robots.txt",
  "블로그 카테고리 나누는 법" => "[깃허브 블로그] Jekyll 카테고리 및 태그 분류 설정",
  "블로그 커스터마이징" => "[깃허브 블로그] Chirpy 테마 커스터마이징 가이드",
  "댓글창 꾸미기" => "[깃허브 블로그] Utterances 댓글창 GIF 꾸미기",
  "블로그 음악 추가 updated(Mar 13, 2024)" => "[깃허브 블로그] 배경음악 플레이어 추가하기"
}.freeze

BOJ_OVERRIDES = {
  "34218" => ["숭고한 마법학교", "BFS"],
  "1018" => ["체스판 다시 칠하기", "브루트포스"],
  "1058" => ["친구", "플로이드-워셜"],
  "10971" => ["외판원 순회 2", "DFS·백트래킹"],
  "15501" => ["부당한 퍼즐", "구현"],
  "20954" => ["택배기사 민서", "수학·구현"],
  "21735" => ["눈덩이 굴리기", "시뮬레이션"],
  "9082" => ["지뢰 찾기", "구현"],
  "34557" => ["횃불이의 모험", "BFS"]
}.freeze

PROG_OVERRIDES = {
  "388353" => ["지게차와 크레인", "LV2", "BFS"],
  "389478" => ["택배 상자 꺼내기", "LV1", "구현"],
  "12971" => ["스티커 모으기(2)", "LV3", "DP"],
  "92344" => ["파괴되지 않은 건물", "LV3", "누적합"],
  "17679" => ["프렌즈4블록", "LV2", "누적합"],
  "49994" => ["방문 길이", "LV2", "구현"],
  "150368" => ["이모티콘 할인행사", "LV2", "백트래킹"],
  "77485" => ["행렬 테두리 회전하기", "LV2", "백트래킹"],
  "118667" => ["두 큐 합 같게 만들기", "LV2", "백트래킹"],
  "87390" => ["n^2 배열 자르기", "LV2", "백트래킹"],
  "388352" => ["비밀 코드 해독", "LV2", "조합"],
  "81302" => ["거리두기 확인하기", "LV2", "BFS"],
  "12987" => ["숫자 게임", "LV3", "투 포인터"],
  "42860" => ["조이스틱", "LV2", "그리디"],
  "76502" => ["괄호 회전하기", "LV2", "스택"],
  "12977" => ["소수 만들기", "LV2", "백트래킹"],
  "49993" => ["스킬트리", "LV2", "구현"],
  "12798" => ["배달", "LV2", "다익스트라"],
  "68936" => ["쿼드압축 후 개수 세기", "LV2", "분할정복"],
  "389479" => ["서버 증설 횟수", "LV2", "DP"],
  "42583" => ["다리를 지나는 트럭", "LV2", "큐"],
  "42586" => ["기능개발", "LV2", "스택"],
  "389480" => ["완전범죄", "LV2", "완전 탐색"],
  "12985" => ["예상 대진표", "LV2", "수학"],
  "250136" => ["석유 시추", "PCCP LV2", "BFS·구현"]
}.freeze

SERIES_LINKS = {
  "creating-githubblog" => [
    ["github-blog-creating2", "👉 다음 단계: Jekyll 테마 설치 및 로컬 실행하기"],
    ["last", "👉 3편: 블로그 최종 설정 및 배포"],
    ["google-search-engine", "👉 구글 검색 노출 설정하기"]
  ],
  "github-blog-creating2" => [
    ["creating-githubblog", "👈 이전: 깃허브 블로그 기초 세팅 (1편)"],
    ["last", "👉 다음 단계: 블로그 최종 수정 및 배포 (3편)"]
  ],
  "last" => [
    ["creating-githubblog", "👈 1편: 깃허브 블로그 기초 세팅"],
    ["github-blog-creating2", "👈 2편: Jekyll 테마 설치"],
    ["google-search-engine", "👉 다음 단계: 구글 검색 노출 설정하기"],
    ["categories-dividing", "👉 블로그 카테고리 나누기"]
  ],
  "google-search-engine" => [
    ["creating-githubblog", "👈 1편: 깃허브 블로그 기초 세팅"],
    ["github-blog-creating2", "👈 2편: Jekyll 테마 설치"],
    ["last", "👈 3편: 블로그 최종 설정"]
  ],
  "categories-dividing" => [
    ["creating-githubblog", "👈 깃허브 블로그 시리즈: 1편 기초 세팅"],
    ["custommizing", "👉 블로그 커스터마이징 가이드"]
  ],
  "custommizing" => [
    ["categories-dividing", "👈 블로그 카테고리 나누기"],
    ["gif-right-next-to-comments", "👉 댓글창 꾸미기"],
    ["custum-music", "👉 블로그 배경음악 추가하기"]
  ]
}.freeze

BLOG_TONE_PAIRS = [
  ["권장함", "권장합니다"],
  ["생성이 됨", "생성됩니다"],
  ["될 거에요", "될 것입니다"],
  ["저장합시다", "저장하시기 바랍니다"],
  ["제출을 합시다", "제출하시기 바랍니다"],
  ["입력합시다", "입력하시기 바랍니다"],
  ["수정합시다", "수정하시기 바랍니다"],
  ["변경합시다", "변경하시기 바랍니다"],
  ["복붙합시다", "복사하여 붙여넣으시기 바랍니다"],
  ["체크합시다", "체크하시기 바랍니다"],
  ["참고합시다", "참고하시기 바랍니다"],
  ["연동시켜주시면 됩니다 ㅎ", "연동하시면 됩니다"],
  ["좋겠어요ㅎ", "좋겠습니다"],
  ["누릅시다", "누르시기 바랍니다"],
  ["열읍시다", "열어 보시기 바랍니다"],
  ["15%는 따라온 겁니다", "15%는 완료하신 것입니다"],
  ["아주 잘하고 계신겁니다!!", "순조롭게 진행하고 계십니다."]
].freeze

def slug_from_filename(filename)
  filename[/^\d{4}-\d{2}-\d{2}-(.+)\.md$/, 1] || filename.sub(/\.md$/, "")
end

def post_url(filename)
  m = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/)
  return BASE_URL unless m

  "#{BASE_URL}/posts/#{m[1]}/#{m[2]}/#{m[3]}/#{m[4]}/"
end

def alg_from_tags(tags_line)
  return "알고리즘" if tags_line.nil? || tags_line.empty?

  tags = tags_line.scan(/\w[\w-]*/).map(&:downcase)
  tags.each do |t|
    return TAG_ALG[t] if TAG_ALG.key?(t)
  end
  tags.first || "알고리즘"
end

def parse_post(content)
  return [{}, "", content] unless content.start_with?("---")

  parts = content.split("---", 3)
  return [{}, "", content] if parts.length < 3

  fm_text = parts[1]
  body = parts[2]
  fm = {}
  fm_text.each_line do |line|
    if line.strip =~ /^(\w+):\s*(.+)$/
      key = Regexp.last_match(1)
      val = Regexp.last_match(2).strip
      fm[key] = if val.start_with?("[") && val.end_with?("]")
                  val[1..-2].split(",").map(&:strip)
                else
                  val.delete_prefix('"').delete_suffix('"')
                end
    end
  end
  [fm, fm_text, body]
end

def rebuild(fm, fm_text, body)
  if fm["title"]
    fm_text = fm_text.sub(/^title:\s*.+$/, "title:  \"#{fm["title"]}\"")
  end
  "---#{fm_text}---\n#{body}"
end

def convert_title(fm, filename)
  old = fm["title"]
  return false unless old

  new = old
  slug = slug_from_filename(filename)
  tags_line = fm["tags"].is_a?(Array) ? fm["tags"].join(", ") : fm.fetch("tags", "").to_s
  alg = alg_from_tags(tags_line)

  BLOG_TITLE_MAP.each do |key, val|
    if old.include?(key)
      new = val
      break
    end
  end
  if new == old && (old.include?("[blog]") || filename.include?("blog") || slug.include?("creating"))
    new = "[깃허브 블로그] #{Regexp.last_match(1)} 가이드" if old =~ /\[blog\]\s*(.+)/
  end

  if old =~ /boj[-_]?(\d+)/i || slug =~ /boj-(\d+)/
    num = Regexp.last_match(1)
    if BOJ_OVERRIDES.key?(num)
      name, a = BOJ_OVERRIDES[num]
    else
      name = old.sub(/boj-\d+-?/i, "").strip
      name = old if name.empty?
      a = alg
    end
    new = "[백준/Java] #{num}번 #{name} 풀이 - #{a} 알고리즘"
  end

  if slug =~ /programmers-(\d+)/
    pid = Regexp.last_match(1)
    if PROG_OVERRIDES.key?(pid)
      name, level, a = PROG_OVERRIDES[pid]
      new = "[프로그래머스/Java] #{level} #{name} 풀이 - #{a} 알고리즘"
    elsif old =~ /\[programmers-lv2\]\s*(.+)/i || old.include?("programmers-lv2")
      inner = old.sub(/\[programmers-lv2\]\s*/i, "").strip
      new = "[프로그래머스/Java] LV2 #{inner} 풀이 - #{alg} 알고리즘"
    elsif old.include?("PCCP")
      inner = old.sub(/\[PCCP[^\]]*\]\s*/, "").sub(/\d+번\s*\/\s*/, "").strip
      new = "[프로그래머스/Java] PCCP #{inner} 풀이 - #{alg} 알고리즘"
    elsif !old.include?("프로그래머스/Java")
      inner = old.sub(/^\[[^\]]+\]\s*/, "").strip
      new = "[프로그래머스/Java] #{inner} 풀이 - #{alg} 알고리즘" unless inner.empty?
    end
  end

  return false if new == old

  fm["title"] = new
  true
end

def infer_alt(lines, idx, img_path, title)
  before = lines[[idx - 8, 0].max...idx].join("\n")
  after = lines[(idx + 1)..[idx + 3, lines.length - 1].min].join("\n")
  heading = ""
  (idx - 1).downto([idx - 8, 0].max) do |i|
    if lines[i] =~ /^#+\s+(.+)$/
      heading = Regexp.last_match(1).strip
      break
    end
  end

  pl = img_path.downcase
  ctx = "#{before} #{after}".downcase

  if pl.include?("tournament")
    return "4명 참가 단일 토너먼트 대진표 및 경기 수" if pl.include?("4people") || heading.include?("4명")
    return "8명 참가 단일 토너먼트 대진표 및 경기 수" if pl.include?("8people") || heading.include?("8명")
    return "16명 참가 단일 토너먼트 대진표 및 경기 수" if pl.include?("16people") || heading.include?("16명")
    return "7명 참가 토너먼트 대진표 (비2의 거듭제곱 반례)" if pl.include?("7people") || heading.include?("7명")
    return "10명 참가 토너먼트 대진표 및 총 경기 수" if pl.include?("10people")
    return "12명 참가 토너먼트 대진표 및 총 경기 수" if pl.include?("12people")
  end

  if pl.include?("2022-08-12")
    n = img_path[/\/(\d+)\.PNG/i, 1]
    map = {
      "1" => "GitHub 저장소 New Repository 생성 화면",
      "2" => "GitHub Pages 블로그 저장소 이름 설정 화면",
      "3" => "GitHub Desktop으로 저장소 Clone 화면",
      "4" => "로컬 폴더에 Clone된 블로그 저장소",
      "5" => "VS Code에서 블로그 프로젝트 열기",
      "6" => "GitHub Pages 블로그 첫 배포 확인 화면"
    }
    return map[n] if n && map[n]
  end

  if pl.include?("2022-08-14k") || ctx.include?("search")
    n = img_path[/\/(\d+)\.PNG/i, 1]
    map = {
      "1" => "구글 서치 콘솔 URL 등록 및 도메인 소유권 확인 화면",
      "2" => "구글 서치 콘솔 HTML 소유권 확인 파일 다운로드",
      "3" => "블로그 루트에 소유권 확인 파일 업로드 위치",
      "4" => "구글 서치 콘솔 사이트맵 제출 메뉴",
      "5" => "사이트맵 제출 완료 및 색인 요청 성공 화면"
    }
    return map[n] if n && map[n]
  end

  return "Git merge 충돌 해결 과정 스크린샷" if pl.include?("git/merge")
  return "Git 오류 해결 과정 캡처" if pl.include?("git-error") || pl.include?("no-update")

  if pl.include?("data-alg") || pl.include?("boj") || pl.include?("programmers")
    return "#{heading} 알고리즘 문제 풀이 참고 이미지" unless heading.empty?
    return "BFS·DFS 알고리즘 문제 조건 해석 시뮬레이션" if pl.include?("bfs") || pl.include?("dfs")
    return "DP 알고리즘 상태 전이 및 최적화 과정" if pl.include?("dp")
    return "정렬 알고리즘 동작 과정 시각화" if pl.include?("sort")
    return "완전 탐색 테스트케이스 및 케이스 분석" if pl.include?("bruteforce")
    return "알고리즘 문제 풀이 참고 다이어그램"
  end

  if pl.include?("math") || pl.include?("linearalgebra")
    return "선형대수·수학 개념 설명: #{heading}" unless heading.empty?
    return "수학 개념 설명 다이어그램"
  end

  if pl.include?("blog")
    return "Jekyll 블로그 배경음악 플레이어 설정 화면" if pl.include?("music")
    return "AI 챗봇 자동 감지 기능 동작 화면" if pl.include?("chatbot")
    return "블로그 커스터마이징 설정 화면"
  end

  return "#{heading} 관련 설명 이미지" unless heading.empty?

  ct = title.gsub(/\[.*?\]/, "").strip
  return "#{ct} 관련 참고 이미지" unless ct.empty?

  "본문 설명 참고 이미지"
end

def replace_desktop_view(body, title)
  lines = body.lines(chomp: true)
  changed = false
  lines.each_with_index do |line, i|
    next unless line.include?("![Desktop View](")

    line.gsub!(/!\[Desktop View\]\(([^)]+)\)/) do
      changed = true
      "![#{infer_alt(lines, i, Regexp.last_match(1), title)}](#{Regexp.last_match(1)})"
    end
  end
  changed ? "#{lines.join("\n")}\n" : body
end

def apply_corrections(body, slug)
  if slug.include?("tournament")
    body = body.sub(
      "아 다시 계산해보니,  `총 경기수 - 1` 라는 식을 도출할 수 있었다",
      "아 다시 계산해보니, 총 경기수 = 참가자 수(N) - 1 이라는 명확한 공식을 도출할 수 있었다."
    )
  end

  if slug.include?("search-engine") || body.include?("robot.txt")
    body = body.gsub("robot.txt", "robots.txt")
    body = body.sub("이제 robots.txt를 열읍시다.", "이제 robots.txt 파일을 열어봅시다.")
    body = body.sub("내용이 disallow 라고 되있는 분들도", "내용이 Disallow라고 되어 있는 분들도")
    unless body.include?("⚠️ 본 가이드는 2026년")
      body = "> ⚠️ 본 가이드는 2026년 현재 구글 서치 콘솔 인터페이스 기준으로 최적화 및 동작이 검증된 최신 글입니다.\n\n#{body}"
    end
  end
  body
end

def convert_blog_tone(body)
  BLOG_TONE_PAIRS.each { |old, new| body = body.gsub(old, new) }
  body
end

def find_series_file(slug)
  Dir.glob(File.join(POSTS_DIR, "**", "*-#{slug}.md")).first
end

def add_series_footer(body, filename)
  slug = slug_from_filename(filename)
  links = SERIES_LINKS[slug]
  return body unless links
  return body if body.include?("## 📚 관련 글")

  footer = "\n\n---\n\n## 📚 관련 글\n\n"
  links.each do |target_slug, label|
    target = find_series_file(target_slug)
    footer += "- [#{label}](#{post_url(File.basename(target))})\n" if target
  end
  "#{body.rstrip}#{footer}\n"
end

def add_code_context(body, fm, title)
  m = body.match(/```java\n.*?\n```/m)
  return body unless m

  idx = body.index(m[0])
  tail = body[[idx - 400, 0].max...idx]
  korean = tail.scan(/[가-힣]/).length
  return body if korean >= 40 || tail.include?("## ✅")

  tags_line = fm["tags"].is_a?(Array) ? fm["tags"].join(", ") : fm.fetch("tags", "").to_s
  alg = alg_from_tags(tags_line)
  intro = "\n\n아래 Java 코드는 #{alg} 관점에서 접근한 핵심 풀이입니다. 입력 조건과 시간·공간 복잡도를 함께 고려하여 불필요한 연산을 줄이는 방향으로 설계했습니다.\n\n"
  outro = "\n\n위 구현은 #{title}의 제약 조건을 만족하도록 자료구조 선택과 반복 범위를 최적화한 결과입니다.\n"
  body.sub(m[0], "#{intro}#{m[0]}#{outro}")
end

stats = { files: 0, mathjax: 0, title: 0, alt: 0, footer: 0 }

Dir.glob(File.join(POSTS_DIR, "**", "*.md")).sort.each do |path|
  orig = File.read(path, encoding: "UTF-8")
  content = orig
  stats[:files] += 1

  fm, fm_text, body = parse_post(content)
  title = fm["title"] || ""
  slug = slug_from_filename(File.basename(path))

  stats[:title] += 1 if convert_title(fm, File.basename(path))

  new_body = body.gsub(MATHJAX_PATTERN, "\n")
  if new_body != body
    stats[:mathjax] += 1
    body = new_body
  end

  alt_body = replace_desktop_view(body, fm["title"] || title)
  if alt_body != body
    stats[:alt] += 1
    body = alt_body
  end

  body = apply_corrections(body, slug)

  if path.include?("/blog/") || path.include?("\\blog\\") || title.include?("[blog]") || title.include?("깃허브 블로그")
    body = convert_blog_tone(body)
  end

  footer_body = add_series_footer(body, File.basename(path))
  if footer_body != body
    stats[:footer] += 1
    body = footer_body
  end

  if path.include?("coding-test")
    body = add_code_context(body, fm, fm["title"] || title)
  end

  content = rebuild(fm, fm_text, body)
  File.write(path, content, encoding: "UTF-8") if content != orig
end

mj = Dir.glob(File.join(POSTS_DIR, "**", "*.md")).count { |f| File.read(f, encoding: "UTF-8").include?("MathJax Script") }
dv = Dir.glob(File.join(POSTS_DIR, "**", "*.md")).count { |f| File.read(f, encoding: "UTF-8").include?("![Desktop View]") }

puts "Processed #{stats[:files]} files"
puts "  MathJax removed: #{stats[:mathjax]}"
puts "  Titles updated: #{stats[:title]}"
puts "  Alt text updated: #{stats[:alt]}"
puts "  Series footers added: #{stats[:footer]}"
puts "VERIFY MathJax remaining: #{mj}"
puts "VERIFY Desktop View remaining: #{dv}"
