---
title:  "두뇌를 자극하는 문제 1"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [stack]
toc: true
toc_sticky: true
math: true
date: 2026-04-05
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
이번문제를 통해 내 능지를 파악해보자

문자열 = "o t o o f o f o o o o t"

target = {'t', 'f', 't'}

d = 5;

라고 가정하자

이때 target의 순서대로 d이내 거리만큼 문자열이 연결되면 1을 반환

그렇지 못하면 0을 반환하자

### 조건
- 문자열의 길이 N (1 ≤ N ≤ 1,000)
- target의 길이 M (1 ≤ M ≤ 100)
- 거리 d (1 ≤ d ≤ N)



### test case
```java
#1. input
o t t o o f o f o o o o t
t f t
5

#1 output
1



#2. output 
j j j j k k k k l l l l 
j k l
2

#2. output
0
```
<br><br>

## 🤔접근법