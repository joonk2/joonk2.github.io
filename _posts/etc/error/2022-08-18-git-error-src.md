---
title:  "[error src refspec main does not match any] 깃에러2"
layout: post
categories: [etc, error] 
tags: [git error]
toc: true
toc_sticky: true
date: 2022-08-17
---

<br>
<br>
<br>
<br>

> # 🚨문제 발생
> * 사진 참고

<br>
<br>

![Desktop View](/assets/img/git-error/error-src/1.PNG)

<br>
<br>

해당 오류는 깃허브에서 pull 없이 push할 경우 기존 내용을 삭제하거나 하는 문제가 생길 수 있기 때문에,\
에러 메세지를 발생시키는 것. &nbsp;&nbsp;&nbsp;

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

> # 🔑내가 해결한 방법 

```bash
$git clone "나의 깃허브 리포 주소"  
$git init
$git branch -m main
$git remote add origin "나의 깃허브 리포 주소" 
$git add .
$git commit -m "first commit"
$git push origin main
```
저는 이렇게 해결하였습니다!

# [준환과 함께 깃 명령어 알아보러 가기🤓](https://joonhwan2.github.io/posts/git-add/)

<br>
<br>
<br>
<br>
<br>
<br>

## 보시고 미흡한 부분이 있다면 피드백은 언제나 환영합니다!

<br>
<br>
아래 사진을 클릭하면 `제 취미공간`으로 이어집니다 ㅎㅎ 여기에서 메모 및 일상을 기록하는데 놀러오실 분들은 언제나 환영합니다!

<br>

# 링크로 이동하려면 사진을 클릭

[![어서오셔 ㅎ](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk-zPB4TCuWRNJVIF0aWgniDPNJgUTdXmILg&usqp=CAU)](https://discord.gg/zkzk5xtm)