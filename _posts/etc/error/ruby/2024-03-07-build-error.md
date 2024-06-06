---
title:  "[ruby] build error"
layout: post
categories: [etc, error, ruby] 
tags: [blog, jekyll, github, git]
toc: true
toc_sticky: true
date: 2024-03-07
---

# 🚨문제 발생

로컬환경에서 테스트해보기 위해 아래 코드를 ruby 콘솔창에 입력했습니다

```bash
bundle exec jekyll build
```

![Desktop View](/assets/img/error/ruby/1.png)

<br><br>

## 어라 로컬환경에 몬들가네? 
<br><br><br>

# 🔑제가 해결한 방법
아래 코드들을 각각 루비 콘솔창에 입력해주었습니다
```bash
gem install webrick
gem update --system 3.5.6
bundle update jekyll
bundle exec jekyll serve --port 4000
```

![Desktop View](/assets/img/error/ruby/2.png)
![Desktop View](/assets/img/error/ruby/3.png)