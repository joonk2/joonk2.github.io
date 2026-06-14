---
title:  "[간단한 수학] 토너먼트"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [math]
toc: true
toc_sticky: true
math: true
date: 2026-06-14
---

<!-- MathJax Script for this post only -->
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ['\\(','\\)'] ],
      displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
      processEscapes: true
    }
  });
</script>


## 🙋‍♂️ 들어가며
일상에서 많이 접하는 `토너먼트의 경기 수`는 도대체 어떻게 구하는지에 대해 구해보도록 하겠다. (단일 경기 기준)

먼저 4, 8, 16일때 기준으로 계산해보았다

### 4명
![Desktop View](/assets/img/data-alg/math/tournament/4people.jpg)

이때 총 3경기

1 + 2^1
<br>

### 8명
![Desktop View](/assets/img/data-alg/math/tournament/8people.jpg)

이때 총 7경기

1 + 2^1 + 2^2
<br>

### 16명
![Desktop View](/assets/img/data-alg/math/tournament/16people.jpg)

이때 총 15경기

1 + 2^1 + 2^2 + 2^3
<br><br><br>


그래서 나는 경기가 2^x 라면 총 경기수는 2^0 + ... + 2^{x-1} 라고 생각했으나

반례가 있더라
<br><br>

### 7명
![Desktop View](/assets/img/data-alg/math/tournament/7people.jpg)

이때 총 6경기
<br>

### 10명
![Desktop View](/assets/img/data-alg/math/tournament/10people.jpg)

이때 총 9경기
<br>

### 12명
![Desktop View](/assets/img/data-alg/math/tournament/12people.jpg)

이때 총 11경기
<br><br><br>



아 다시 계산해보니,  `총 경기수 - 1` 라는 식을 도출할 수 있었다

그래서 단일 토너먼트의 총 경기수는 이런 방식으로 구할 수 있겠다