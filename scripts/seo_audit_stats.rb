# frozen_string_literal: true

require "date"

root = File.expand_path("..", __dir__)
posts = Dir[File.join(root, "_posts", "**", "*.md")]
today = Date.today

no_desc = 0
no_tags = 0
future = 0
eng_title = 0
seo_title = 0
short_title = 0
categories = Hash.new(0)

posts.each do |f|
  c = File.read(f, encoding: "UTF-8")
  no_desc += 1 unless c.match?(/^description:/m)
  no_tags += 1 unless c.match?(/^tags:/m)
  if (m = c.match(/^date:\s*(\d{4}-\d{2}-\d{2})/))
    future += 1 if Date.parse(m[1]) > today
  end
  if (m = c.match(/^title:\s*"?([^"\r\n]+)"?/))
    t = m[1].strip
    seo_title += 1 if t.include?("[프로그래머스") || t.include?("[백준") || t.include?("[깃허브")
    eng_title += 1 if t !~ /[가-힣]/ && !seo_title.positive? && !t.match?(/\[프로그래머스|\[백준|\[깃허브/)
    short_title += 1 if t.length < 15 && t !~ /\[/
  end
  if (m = c.match(/^categories:\s*\[(.+)\]/))
    m[1].split(",").each { |cat| categories[cat.strip] += 1 }
  end
end

puts "POSTS=#{posts.size}"
puts "NO_DESCRIPTION=#{no_desc}"
puts "NO_TAGS=#{no_tags}"
puts "FUTURE_DATES=#{future}"
puts "SEO_FORMAT_TITLES=#{seo_title}"
puts "ENGLISH_ONLY_TITLES=#{eng_title}"
puts "SHORT_TITLES=#{short_title}"
puts "CATEGORIES=#{categories.sort_by { |_, v| -v }.map { |k, v| "#{k}:#{v}" }.join(', ')}"
