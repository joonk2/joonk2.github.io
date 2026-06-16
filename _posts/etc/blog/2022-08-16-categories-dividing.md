---
title:  "[깃허브 블로그] Jekyll 카테고리 및 태그 분류 설정"
layout: post
categories: [etc, blog] 
tags: [blog, jekyll, github, git]
toc: true
toc_sticky: true
date: 2022-08-16
---

<br>

---
## 🤔카테고리를 어떻게 하면 나눌 수 있을까?
---
<br>
<br>
<br>
<br>

![🤔카테고리를 어떻게 하면 나눌 수 있을까? 관련 설명 이미지](/assets/img/categories-dividing/1.PNG)

<br>
<br>
<br>

![Jekyll 카테고리 및 태그 분류 설정 관련 참고 이미지](/assets/img/categories-dividing/2.PNG)

<br>
<br>

음 뭔가 깔끔해보이지가 않아..\
이걸 카테고리별로 묶기위해 1시간 정도 시행착오를 겪은 후 드디어 방법을 찾았다!.

<br>
<br>
<br>

> # 방법!
> * ①
> _post 안에 `폴더`를 만들어 md파일을 카테고리별로 추가
> * ②
> `md`파일의 카테고리 부분 수정
> * ③
> 재 업로드

<br>
<br>
<br>


그리고 해당되는 md폴더를 열어서 categories를 고치면 됩니다 제꺼를 한번 보여드리겠습니다.
<br>
<br>
<br>
<br>

![Jekyll 카테고리 및 태그 분류 설정 관련 참고 이미지](/assets/img/categories-dividing/4.PNG)

```markdown
categories: [상위폴더명, 하위폴더명] 
```

<br>
이렇게 적으신다면 카테고리 설정이 됩니다.

<br>
<br>

git push 후 결과를 확인해보면?

<br>
<br>
<br>
<br>
<br>
<br>


# 짜잔✅

![짜잔✅ 관련 설명 이미지](/assets/img/categories-dividing/5.PNG)

***
<br>
<br>
<br>
<br>
<br>

# 보시고 미흡한 부분이 있다면 피드백은 언제나 환영합니다!

<br>
<br>
아래 사진을 클릭하면 `제 취미공간`으로 이어집니다 ㅎㅎ 여기에서 메모 및 일상을 기록하는데 놀러오실 분들은 언제나 환영합니다!

<br>

# 링크로 이동하려면 사진을 클릭

[![어서오셔 ㅎ](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk-zPB4TCuWRNJVIF0aWgniDPNJgUTdXmILg&usqp=CAU)](https://discord.gg/zkzk5xtm)

---

## 📚 관련 글

- [👈 깃허브 블로그 시리즈: 1편 기초 세팅](https://joonk2.github.io/posts/2022/08/12/creating-githubblog/)
- [👉 블로그 커스터마이징 가이드](https://joonk2.github.io/posts/2024/02/23/custommizing/)

