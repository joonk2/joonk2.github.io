---
title:  "[blog] 블로그 커스터마이징"
layout: post
categories: [blog] 
tags: [blog, jekyll, github, git]
toc: true
toc_sticky: true
date: 2024-02-23
written: 2024-02-23 fri 18:20
---

<br>

---
## 어떻게 하면 블로그에 들어오자마자 내가 원하는 페이지를 바로 볼 수 있을까?
---
<br>
<br>
<br>
<br>

![Desktop View](/assets/img/blog/1.PNG)


<br>
<br>
<br>

`_tabs/` 에서 기존에 있던 5개 md파일들을 삭제하고 수정했다 (파일명 포함)
그 중 내가 남겨놓은 것은 2개이다.

### study diary.md
```
---
layout: categories
title: study diary
show_toggle: true
icon: fas fa-stream
order: 1
permalink: /
---
```
<br>

### about Me.md
```
---
title: About Me
icon: fas fa-info-circle
show_toggle: false
order: 4
---
```

```
bundle exec jekyll serve
```
입력하니 아래와 같은 결과가 나왔다.

![Desktop View](/assets/img/blog/2.PNG)


<br>
<br>

여기서 가만히 보니 카테고리화된 STUDY DIARY를 메인 페이지로 사용하고 싶어졌다.<br>

study-diary.md 파일을 메인 페이지로 사용하되, 카테고리 형식으로 나누어 보고 싶다면 다음과 같이 고쳐보자.<br>
`.config_yml`,  &nbsp;&nbsp;&nbsp;&nbsp; `_tabs/study-diary.md`


### .config_yml⬇️

```yaml
defaults:
  - scope:
      path: ''          
      type: posts
    values:
      layout: categories/posts
      comments: true    
      toc: true         
      permalink: /posts/:title/
```
여기서 우리가 확인할 것은 type, layout, permalink 총 3개다.
<br>
<br>
### _tabs/study-diary.md⬇️

```md
---
layout: categories
title: study diary
show_toggle: true
icon: fas fa-stream
order: 1
permalink: /
---
```
여기서 우리가 확인할 것은 permalink 이다

<br>
<br>

우리가 마지막으로 또 고쳐줘야 할 것이 한가지 남았다. <br>
_post/ 에서 글을 작성할 때 md 파일에 추가해줘야하는데 바로 layout이다. 그걸 추가하지 않으면 글을 클릭해도 내부로 안들어가지고 계속 메인홈페이지로 돌아와질 것이다.
나의 경우 post를 사용하기에 `layout: post`를 md파일 맨 위에 추가했다. 

ex) 2024-02-23-custommzing.md

```
---
title:  "[blog] 블로그 커스터마이징"
layout: post
categories: [blog] 
tags: [blog, jekyll, github, git]
toc: true
toc_sticky: true
date: 2024-02-23
---
```

<br>
<br>
<br>

# 짜잔✅

![Desktop View](/assets/img/blog/3.PNG)

메인 홈페이지로 카테고리화된 페이지가 나오게 변경해줬다! <br>
내부 페이지를 클릭해봐도 잘 들어가질 것이다. <br>
만약 잘 모르겠다면 내 깃허브로 가서 참고하자 <br>

<br><br>

## 글을 마치며
_tabs/ 에 home.md가 없는데 왼쪽 사이드바에 home이 생성된다. 아직 방법을 찾지 못해 그대로 있는데 나중에 이것도 없앨 수 있도록 날잡고 한번 봐야겠다.