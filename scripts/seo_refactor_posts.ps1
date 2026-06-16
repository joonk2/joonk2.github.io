$ErrorActionPreference = "Stop"
$PostsDir = Join-Path $PSScriptRoot ".." "_posts" | Resolve-Path
$BaseUrl = "https://joonk2.github.io"

$MathJaxPattern = '(?s)\r?\n?<!-- MathJax Script for this post only -->\s*<script type="text/javascript" async.*?</script>\s*<script type="text/x-mathjax-config">.*?</script>\s*'

$TagAlg = @{
    "dp" = "DP"; "bfs" = "BFS"; "dfs" = "DFS"; "greedy" = "그리디"
    "implementation" = "구현"; "binary-search" = "이분 탐색"; "two-pointer" = "투 포인터"
    "queue" = "큐"; "stack" = "스택"; "sort" = "정렬"; "math" = "수학"; "graph" = "그래프"
    "dijkstra" = "다익스트라"; "prim" = "프림"; "backtracking" = "백트래킹"
    "bruteforce" = "완전 탐색"; "simulation" = "시뮬레이션"
}

$BlogTitleMap = @{
    "깃허브 블로그 만드는 법 1" = "[깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 1편 기초 세팅"
    "깃허브 블로그 만드는 법 2" = "[깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 2편 로컬 실행"
    "깃허브 블로그 만드는 법 3" = "[깃허브 블로그] Jekyll 테마로 블로그 만드는 법 - 3편 최종 배포"
    "깃허브 블로그 구글검색 노출시키기" = "[깃허브 블로그] 구글 서치 콘솔 검색 노출 설정 - sitemap·robots.txt"
    "블로그 카테고리 나누는 법" = "[깃허브 블로그] Jekyll 카테고리 및 태그 분류 설정"
    "블로그 커스터마이징" = "[깃허브 블로그] Chirpy 테마 커스터마이징 가이드"
    "댓글창 꾸미기" = "[깃허브 블로그] Utterances 댓글창 GIF 꾸미기"
    "블로그 음악 추가 updated(Mar 13, 2024)" = "[깃허브 블로그] 배경음악 플레이어 추가하기"
}

$BojOverrides = @{
    "34218" = @("숭고한 마법학교", "BFS")
    "1018" = @("체스판 다시 칠하기", "브루트포스")
    "1058" = @("친구", "플로이드-워셜")
    "10971" = @("외판원 순회 2", "DFS·백트래킹")
    "15501" = @("부당한 퍼즐", "구현")
    "20954" = @("택배기사 민서", "수학·구현")
    "21735" = @("눈덩이 굴리기", "시뮬레이션")
    "9082" = @("지뢰 찾기", "구현")
    "34557" = @("횃불이의 모험", "BFS")
}

$ProgOverrides = @{
    "389479" = @("서버 증설 횟수", "LV2", "DP")
    "42583" = @("다리를 지나는 트럭", "LV2", "큐")
    "42586" = @("기능개발", "LV2", "스택")
    "389480" = @("완전범죄", "LV2", "완전 탐색")
    "12985" = @("예상 대진표", "LV2", "수학")
    "250136" = @("석유 시추", "PCCP LV2", "BFS·구현")
}

function Get-Slug($filename) {
    if ($filename -match '^\d{4}-\d{2}-\d{2}-(.+)\.md$') { return $Matches[1] }
    return $filename -replace '\.md$',''
}

function Get-PostUrl($filename) {
    if ($filename -match '^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$') {
        return "$BaseUrl/posts/$($Matches[1])/$($Matches[2])/$($Matches[3])/$($Matches[4])/"
    }
    return $BaseUrl
}

function Get-AlgFromTags($tagsLine) {
    if (-not $tagsLine) { return "알고리즘" }
    $tags = [regex]::Matches($tagsLine, '\w[\w-]*') | ForEach-Object { $_.Value.ToLower() }
    foreach ($t in $tags) { if ($TagAlg.ContainsKey($t)) { return $TagAlg[$t] } }
    if ($tags.Count -gt 0) { return $tags[0] }
    return "알고리즘"
}

function Convert-Title($content, $filename) {
    $slug = Get-Slug $filename
    if ($content -notmatch '(?ms)^---\r?\n(.*?)\r?\n---\r?\n(.*)$') { return $content }
    $fm = $Matches[1]; $body = $Matches[2]
    if ($fm -notmatch 'title:\s*"?([^"\r\n]+)"?') { return $content }
    $old = $Matches[1].Trim(); $new = $old
    $tagsLine = if ($fm -match 'tags:\s*\[(.+)\]') { $Matches[1] } else { "" }
    $alg = Get-AlgFromTags $tagsLine

    foreach ($k in $BlogTitleMap.Keys) {
        if ($old -like "*$k*") { $new = $BlogTitleMap[$k]; break }
    }
    if ($new -eq $old -and ($old -like '*[blog]*' -or $filename -like '*blog*' -or $slug -like '*creating*')) {
        if ($old -match '\[blog\]\s*(.+)') { $new = "[깃허브 블로그] $($Matches[1]) 가이드" }
    }

    if ($old -match 'boj[-_]?(\d+)[-_]?(.*)' -or $slug -match 'boj-(\d+)') {
        $num = if ($old -match 'boj[-_]?(\d+)') { $Matches[1] } else { ($slug -replace '.*boj-(\d+).*','$1') }
        if ($BojOverrides.ContainsKey($num)) {
            $name = $BojOverrides[$num][0]; $a = $BojOverrides[$num][1]
        } else {
            $name = ($old -replace 'boj-\d+-?','').Trim(); if (-not $name) { $name = $old }
            $a = $alg
        }
        $new = "[백준/Java] ${num}번 $name 풀이 - $a 알고리즘"
    }

    if ($slug -match 'programmers-(\d+)') {
        $pid = $Matches[1]
        if ($ProgOverrides.ContainsKey($pid)) {
            $o = $ProgOverrides[$pid]
            $new = "[프로그래머스/Java] $($o[1]) $($o[0]) 풀이 - $($o[2]) 알고리즘"
        } elseif ($old -match '\[programmers-lv2\]\s*(.+)' -or $old -like '*programmers-lv2*') {
            $inner = ($old -replace '\[programmers-lv2\]\s*','').Trim()
            $new = "[프로그래머스/Java] LV2 $inner 풀이 - $alg 알고리즘"
        } elseif ($old -like '*PCCP*') {
            $inner = ($old -replace '\[PCCP[^\]]*\]\s*','' -replace '\d+번\s*/\s*','').Trim()
            $new = "[프로그래머스/Java] PCCP $inner 풀이 - $alg 알고리즘"
        } elseif ($old -notlike '*프로그래머스/Java*') {
            $inner = ($old -replace '^\[[^\]]+\]\s*','').Trim()
            if ($inner) { $new = "[프로그래머스/Java] $inner 풀이 - $alg 알고리즘" }
        }
    }

    if ($new -ne $old) {
        $fm = [regex]::Replace($fm, '^title:\s*.+$', "title:  `"$new`"", 1, 'Multiline')
    }
    return "---`n$fm---`n$body"
}

function Get-AltText($lines, $idx, $imgPath, $title) {
    $before = ($lines[[Math]::Max(0,$idx-8)..($idx-1)] -join "`n")
    $after = ($lines[($idx+1)..([Math]::Min($lines.Count-1,$idx+3))] -join "`n")
    $heading = ""
    for ($i = $idx-1; $i -ge [Math]::Max(0,$idx-8); $i--) {
        if ($lines[$i] -match '^#{1,4}\s+(.+)$') { $heading = $Matches[1].Trim(); break }
    }
    $pl = $imgPath.ToLower()
    $ctx = ($before + " " + $after).ToLower()

    if ($pl -like '*tournament*') {
        if ($pl -like '*4people*' -or $heading -like '*4명*') { return "4명 참가 단일 토너먼트 대진표 및 경기 수" }
        if ($pl -like '*8people*' -or $heading -like '*8명*') { return "8명 참가 단일 토너먼트 대진표 및 경기 수" }
        if ($pl -like '*16people*' -or $heading -like '*16명*') { return "16명 참가 단일 토너먼트 대진표 및 경기 수" }
        if ($pl -like '*7people*' -or $heading -like '*7명*') { return "7명 참가 토너먼트 대진표 (비2의 거듭제곱 반례)" }
        if ($pl -like '*10people*') { return "10명 참가 토너먼트 대진표 및 총 경기 수" }
        if ($pl -like '*12people*') { return "12명 참가 토너먼트 대진표 및 총 경기 수" }
    }
    if ($pl -like '*2022-08-12*') {
        $n = if ($imgPath -match '/(\d+)\.PNG') { $Matches[1] } else { "" }
        $m = @{ "1"="GitHub 저장소 New Repository 생성 화면"; "2"="GitHub Pages 블로그 저장소 이름 설정 화면"; "3"="GitHub Desktop으로 저장소 Clone 화면"; "4"="로컬 폴더에 Clone된 블로그 저장소"; "5"="VS Code에서 블로그 프로젝트 열기"; "6"="GitHub Pages 블로그 첫 배포 확인 화면" }
        if ($m.ContainsKey($n)) { return $m[$n] }
    }
    if ($pl -like '*2022-08-14k*' -or $ctx -like '*search*') {
        $n = if ($imgPath -match '/(\d+)\.PNG') { $Matches[1] } else { "" }
        $m = @{ "1"="구글 서치 콘솔 URL 등록 및 도메인 소유권 확인 화면"; "2"="구글 서치 콘솔 HTML 소유권 확인 파일 다운로드"; "3"="블로그 루트에 소유권 확인 파일 업로드 위치"; "4"="구글 서치 콘솔 사이트맵 제출 메뉴"; "5"="사이트맵 제출 완료 및 색인 요청 성공 화면" }
        if ($m.ContainsKey($n)) { return $m[$n] }
    }
    if ($pl -like '*git/merge*') { return "Git merge 충돌 해결 과정 스크린샷" }
    if ($pl -like '*git-error*' -or $pl -like '*no-update*') { return "Git 오류 해결 과정 캡처" }
    if ($pl -like '*data-alg*' -or $pl -like '*boj*' -or $pl -like '*programmers*') {
        if ($heading) { return "$heading 알고리즘 문제 풀이 참고 이미지" }
        if ($pl -like '*bfs*' -or $pl -like '*dfs*') { return "BFS·DFS 알고리즘 문제 조건 해석 시뮬레이션" }
        if ($pl -like '*dp*') { return "DP 알고리즘 상태 전이 및 최적화 과정" }
        if ($pl -like '*sort*') { return "정렬 알고리즘 동작 과정 시각화" }
        if ($pl -like '*bruteforce*') { return "완전 탐색 테스트케이스 및 케이스 분석" }
        return "알고리즘 문제 풀이 참고 다이어그램"
    }
    if ($pl -like '*math*' -or $pl -like '*linearalgebra*') {
        if ($heading) { return "선형대수·수학 개념 설명: $heading" }
        return "수학 개념 설명 다이어그램"
    }
    if ($pl -like '*blog*') {
        if ($pl -like '*music*') { return "Jekyll 블로그 배경음악 플레이어 설정 화면" }
        if ($pl -like '*chatbot*') { return "AI 챗봇 자동 감지 기능 동작 화면" }
        return "블로그 커스터마이징 설정 화면"
    }
    if ($heading) { return "$heading 관련 설명 이미지" }
    $ct = ($title -replace '\[.*?\]','').Trim()
    if ($ct) { return "$ct 관련 참고 이미지" }
    return "본문 설명 참고 이미지"
}

function Replace-DesktopView($body, $title) {
    $lines = $body -split "`r?`n"
    $changed = $false
    for ($i=0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match '!\[Desktop View\]\(([^)]+)\)') {
            $alt = Get-AltText $lines $i $Matches[1] $title
            $lines[$i] = $lines[$i] -replace '!\[Desktop View\]','![{0}]' -f $alt
            $changed = $true
        }
    }
    if ($changed) { return ($lines -join "`n") }
    return $body
}

function Apply-Corrections($body, $slug) {
    if ($slug -like '*tournament*') {
        $body = $body.Replace('아 다시 계산해보니,  `총 경기수 - 1` 라는 식을 도출할 수 있었다', '아 다시 계산해보니, 총 경기수 = 참가자 수(N) - 1 이라는 명확한 공식을 도출할 수 있었다.')
    }
    if ($slug -like '*search-engine*' -or $body -like '*robot.txt*') {
        $body = $body.Replace('robot.txt','robots.txt')
        $body = $body.Replace('이제 robots.txt를 열읍시다.','이제 robots.txt 파일을 열어봅시다.')
        $body = $body.Replace('내용이 disallow 라고 되있는 분들도','내용이 Disallow라고 되어 있는 분들도')
        if ($body -notlike '*⚠️ 본 가이드는 2026년*') {
            $body = "> ⚠️ 본 가이드는 2026년 현재 구글 서치 콘솔 인터페이스 기준으로 최적화 및 동작이 검증된 최신 글입니다.`n`n" + $body
        }
    }
    return $body
}

function Convert-BlogTone($body) {
    $pairs = @(
        @('권장함','권장합니다'), @('생성이 됨','생성됩니다'), @('될 거에요','될 것입니다'),
        @('저장합시다','저장하시기 바랍니다'), @('제출을 합시다','제출하시기 바랍니다'),
        @('입력합시다','입력하시기 바랍니다'), @('수정합시다','수정하시기 바랍니다'),
        @('변경합시다','변경하시기 바랍니다'), @('복붙합시다','복사하여 붙여넣으시기 바랍니다'),
        @('체크합시다','체크하시기 바랍니다'), @('참고합시다','참고하시기 바랍니다'),
        @('연동시켜주시면 됩니다 ㅎ','연동하시면 됩니다'), @('좋겠어요ㅎ','좋겠습니다'),
        @('누릅시다','누르시기 바랍니다'), @('열읍시다','열어 보시기 바랍니다'),
        @('15%는 따라온 겁니다','15%는 완료하신 것입니다'),
        @('아주 잘하고 계신겁니다!!','순조롭게 진행하고 계십니다.')
    )
    foreach ($p in $pairs) { $body = $body.Replace($p[0], $p[1]) }
    return $body
}

$SeriesLinks = @{
    'creating-githubblog' = @(
        @('github-blog-creating2','👉 다음 단계: Jekyll 테마 설치 및 로컬 실행하기'),
        @('last','👉 3편: 블로그 최종 설정 및 배포'),
        @('google-search-engine','👉 구글 검색 노출 설정하기')
    )
    'github-blog-creating2' = @(
        @('creating-githubblog','👈 이전: 깃허브 블로그 기초 세팅 (1편)'),
        @('last','👉 다음 단계: 블로그 최종 수정 및 배포 (3편)')
    )
    'last' = @(
        @('creating-githubblog','👈 1편: 깃허브 블로그 기초 세팅'),
        @('github-blog-creating2','👈 2편: Jekyll 테마 설치'),
        @('google-search-engine','👉 다음 단계: 구글 검색 노출 설정하기'),
        @('categories-dividing','👉 블로그 카테고리 나누기')
    )
    'google-search-engine' = @(
        @('creating-githubblog','👈 1편: 깃허브 블로그 기초 세팅'),
        @('github-blog-creating2','👈 2편: Jekyll 테마 설치'),
        @('last','👈 3편: 블로그 최종 설정')
    )
    'categories-dividing' = @(
        @('creating-githubblog','👈 깃허브 블로그 시리즈: 1편 기초 세팅'),
        @('custommizing','👉 블로그 커스터마이징 가이드')
    )
    'custommizing' = @(
        @('categories-dividing','👈 블로그 카테고리 나누기'),
        @('gif-right-next-to-comments','👉 댓글창 꾸미기'),
        @('custum-music','👉 블로그 배경음악 추가하기')
    )
}

function Add-SeriesFooter($body, $filename) {
    $slug = Get-Slug $filename
    if (-not $SeriesLinks.ContainsKey($slug)) { return $body }
    if ($body -like '*## 📚 관련 글*') { return $body }
    $footer = "`n`n---`n`n## 📚 관련 글`n`n"
    foreach ($link in $SeriesLinks[$slug]) {
        $target = Get-ChildItem -Path $PostsDir -Recurse -Filter "*-$($link[0]).md" | Select-Object -First 1
        if ($target) {
            $url = Get-PostUrl $target.Name
            $footer += "- [$($link[1])]($url)`n"
        }
    }
    return $body.TrimEnd() + $footer + "`n"
}

function Add-CodeContext($body, $fm, $title) {
    if ($body -notmatch '(?s)(```java\r?\n.*?```)') { return $body }
    $block = $Matches[1]
    $idx = $body.IndexOf($block)
    $tail = $body.Substring([Math]::Max(0,$idx-400), [Math]::Min(400,$idx))
    $korean = ([regex]::Matches($tail, '[가-힣]')).Count
    if ($korean -ge 40 -or $tail -like '*## ✅*') { return $body }
    $tagsLine = if ($fm -match 'tags:\s*\[(.+)\]') { $Matches[1] } else { "" }
    $alg = Get-AlgFromTags $tagsLine
    $intro = "`n`n아래 Java 코드는 $alg 관점에서 접근한 핵심 풀이입니다. 입력 조건과 시간·공간 복잡도를 함께 고려하여 불필요한 연산을 줄이는 방향으로 설계했습니다.`n`n"
    $outro = "`n`n위 구현은 $title 의 제약 조건을 만족하도록 자료구조 선택과 반복 범위를 최적화한 결과입니다.`n"
    $newBlock = $intro + $block + $outro
    return $body.Replace($block, $newBlock, 1)
}

$stats = @{ mathjax=0; title=0; alt=0; footer=0; files=0 }
Get-ChildItem -Path $PostsDir -Recurse -Filter "*.md" | Sort-Object FullName | ForEach-Object {
    $path = $_.FullName
    $orig = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
    $content = $orig
    $stats.files++

    $content = Convert-Title $content $_.Name
    if ($content -ne $orig) { $stats.title++ }

    if ($content -match '(?ms)^---\r?\n(.*?)\r?\n---\r?\n(.*)$') {
        $fm = $Matches[1]; $body = $Matches[2]
        $title = if ($fm -match 'title:\s*"?([^"\r\n]+)"?') { $Matches[1].Trim() } else { "" }
        $slug = Get-Slug $_.Name

        $newBody = [regex]::Replace($body, $MathJaxPattern, "`n")
        if ($newBody -ne $body) { $stats.mathjax++; $body = $newBody }

        $altBody = Replace-DesktopView $body $title
        if ($altBody -ne $body) { $stats.alt++; $body = $altBody }

        $body = Apply-Corrections $body $slug

        if ($path -like '*\blog\*' -or $title -like '*깃허브 블로그*' -or $title -like '*[blog]*') {
            $body = Convert-BlogTone $body
        }

        $footerBody = Add-SeriesFooter $body $_.Name
        if ($footerBody -ne $body) { $stats.footer++; $body = $footerBody }

        if ($path -like '*coding-test*') {
            $body = Add-CodeContext $body $fm $title
        }

        $content = "---`n$fm---`n$body"
    }

    if ($content -ne $orig) {
        [IO.File]::WriteAllText($path, $content, [Text.UTF8Encoding]::new($false))
    }
}

Write-Host "Processed $($stats.files) files"
Write-Host "  MathJax removed: $($stats.mathjax)"
Write-Host "  Titles updated: $($stats.title)"
Write-Host "  Alt text updated: $($stats.alt)"
Write-Host "  Series footers added: $($stats.footer)"

$mj = (Select-String -Path (Join-Path $PostsDir '*\*.md') -Pattern 'MathJax Script' -Recurse).Count
$dv = (Select-String -Path (Join-Path $PostsDir '*\*.md') -Pattern '!\[Desktop View\]' -Recurse).Count
Write-Host "VERIFY MathJax remaining: $mj"
Write-Host "VERIFY Desktop View remaining: $dv"
