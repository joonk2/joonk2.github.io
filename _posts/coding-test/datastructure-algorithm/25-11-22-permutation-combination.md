---
title:  "permutation && combination"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [permutation, combination]
toc: true
toc_sticky: true
date: 2025-11-22
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


### 🙋‍♂️들어가며
이번에 학습할 내용은 `순열` 그리고 `조합`이다 <br>

순열은 중복이 가능하고, 조합은 중복이 불가능하다. <br>
- 순열 ex) -> 자리 배치
- 조합 ex) -> 요리재료 선택

순열의 경우 그냥 factorial을 통해 구현하면 되겠다 <br>

### ▲permutation

P = $\frac{n!}{(n-r)!}$

카드 5개 중 2개 고르기

$_{5}P_{2}$ -> 20

<br><br><br><br><br>

### 🍕combination
조합이다

피자를 만들기 위해 재료 a,b,c,d,e 중 3개만 고르겠다.

전체 경우의 수 = `(특정 x를 선택한 경우의 수)` + `(특정 x를 미선택한 경우의 수)`

이걸 나타내면 아래와 같겠다

$_{5}C_{3} = _{4}C_{2} + _{4}C_{3}$

그러면 전체 조합의 경우의 수인 10가지가 도출된다.

이걸 코드로 나타내면 아래와 같겠네


```java
C[5][3] = C[4][2] + C[4][3]
```
<br><br><br>


### 조합 - 일반점화식 코드

이걸 일반 점화식 코드로 나타내면 아래와 같겠네

```java
C[r][c] = C[r-1][c-1] + C[r-1][c-1]
```

<br><br><br><br>

### ⏱️**시간복잡도**
#### permutation
- O(n!)

#### combination
- 조합 점화식 DP -> O(nr)