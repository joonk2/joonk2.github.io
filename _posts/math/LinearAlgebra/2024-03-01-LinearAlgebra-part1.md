---
title:  "[선형대수학] 1강 행렬과 행렬식"
layout: post
categories: [math, LinearAlgebra] 
tags: [math, LinearAlgebra]
toc: true
toc_sticky: true
date: 2024-03-01
---

# 목차

```python
0. 선형대수학을 왜 배워야하냐?

1. 행렬     
 1-1) 용어정리     
 1-2) 행렬의 연산   
 
2. 연립일차방정식      
 2-1) 행렬의 표현      
 2-2) 가우스 조던 소거법 & 예제

3. 행렬식     
 3-1) 행렬식이란? & Sarrus 전개     
 3-2) 역행렬     
 3-3) Crammer`s Rule
 3-4) Crammer`s Rule 예제 1개

4. 1강 마무리 연습문제
 4-1) 가우스 조던 소거법
 4-2) 역행렬
 4-3) 크래머공식으로 연립일차방정식 해 구하기(2개)
```

# 0. 선형대수학을 왜 배워야하냐?

- **공간이라고 생각하면 직관이 먹힌다**
    
    이 세상은 3차원의 공간으로 되어있으며, 사람들이 살아가는 이 공간을 표현하고 기술하기 위해 벡터의 무대인 선형대수는 공간을 설명하기에 편리하다
    
- **근사 수단으로 사용하기 편리**
- **기계학습**

<br><br><br>

# 1. 행렬

## 1-1) 용어정리

![Desktop View](/assets/img/math/LinearAlgebra/part1/0.png)
![Desktop View](/assets/img/math/LinearAlgebra/part1/1.png)

## 1-2) 행렬의 연산

![Desktop View](/assets/img/math/LinearAlgebra/part1/2.png)

<br><br><br>

# 2. 연립일차방정식

## 2-1) 행렬의 표현

![Desktop View](/assets/img/math/LinearAlgebra/part1/3.png)

## 2-2) 가우스 조던 소거법 & 예제

![Desktop View](/assets/img/math/LinearAlgebra/part1/4.png)
![Desktop View](/assets/img/math/LinearAlgebra/part1/5.png)
![Desktop View](/assets/img/math/LinearAlgebra/part1/6.png)
![Desktop View](/assets/img/math/LinearAlgebra/part1/7.png)

<br><br><br>

# 3. 행렬식

## 3-1) 행렬식이란? & Sarrus 전개

- >행렬식은 아래처럼 식을 계산하는 것을 의미한다.

![Desktop View](/assets/img/math/LinearAlgebra/part1/8.png)

![Desktop View](/assets/img/math/LinearAlgebra/part1/9.png)

![Desktop View](/assets/img/math/LinearAlgebra/part1/10.png)

## 3-2) 역행렬

![Desktop View](/assets/img/math/LinearAlgebra/part1/11.png)

## 3-3) Crammer`s Rule

- 연립일차방정식 AX = B 에서 A가 행렬식 0이 아닌 정사각행렬일 때

![Desktop View](/assets/img/math/LinearAlgebra/part1/12.png)

## 3-4) Crammer`s Rule 예제 1개

![Desktop View](/assets/img/math/LinearAlgebra/part1/13.png)

![Desktop View](/assets/img/math/LinearAlgebra/part1/14.png)

<br><br>

# 4. 1강 마무리 연습문제

## 4-1) 가우스 조던 소거법
![Desktop View](/assets/img/math/LinearAlgebra/part1/15.png)
![Desktop View](/assets/img/math/LinearAlgebra/part1/16.png)
<br><br>

## 4-2) 역행렬
![Desktop View](/assets/img/math/LinearAlgebra/part1/17.png)
![Desktop View](/assets/img/math/LinearAlgebra/part1/18.png)
<br><br>

## 4-3) 크래머공식으로 연립일차방정식 해 구하기(2개)
![Desktop View](/assets/img/math/LinearAlgebra/part1/19.png)
![Desktop View](/assets/img/math/LinearAlgebra/part1/20.png)
![Desktop View](/assets/img/math/LinearAlgebra/part1/21.png)

# 참고

[행렬로 연립일차방정식 풀기 - 가우스 소거법](https://www.youtube.com/watch?v=VlUfSrDcFzw&list=PLxz77rwoJPpWMrEaUpfGTG9P7X_faMYGi&index=3)

**[[선형대수학] 1강 행렬과 행렬식](https://www.youtube.com/watch?v=83UnOz6HiOY&list=PL127T2Zu76FuVMq1UQnZv9SG-GFIdZfLg&index=2)**

[[선형대수학] 22. 크래머공식, Cramer's Rule](https://blog.naver.com/PostView.naver?blogId=mykepzzang&logNo=221085691637)

[선형대수-0.-왜-선형대수를-배워야-하는가](https://velog.io/@claude_ssim/%EC%84%A0%ED%98%95%EB%8C%80%EC%88%98-0.-%EC%99%9C-%EC%84%A0%ED%98%95%EB%8C%80%EC%88%98%EB%A5%BC-%EB%B0%B0%EC%9B%8C%EC%95%BC-%ED%95%98%EB%8A%94%EA%B0%80)