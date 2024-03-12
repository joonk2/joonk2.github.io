---
title:  "gradient 작동 원리 [수기 작성]"
layout: post
categories: [DataScience, ML] 
tags: [gradient, ML, DataScience]
toc: true
toc_sticky: true
date: 2024-02-28
---

# GD(경사하강법)
- 비용함수를 최소화 하기위해 파라미터를 반복적으로 수정하는 것

ex) 짙은 안개산에서 앞은 안보이고 발 끝으로 산의 기울기만 느낄 수 있을 때, 탈출하기 위해 가장 기울기가 급한 길을 따라 내려가는 것

![Desktop View](/assets/img/DataScience/ML/0.png)

<br><br><br>

# GD를 수기 작성으로 이해해보자
* 나동빈 선생님의 설명을 토대로 똑같이 적어보았습니다.<br>
>진행순서는 순차적으로 이어집니다.<br>
>아래 종이에 적힌 것을 보면 경사하강법의 증명을 알 수 있습니다.


![Desktop View](/assets/img/DataScience/ML/1.png)
![Desktop View](/assets/img/DataScience/ML/2.png)
![Desktop View](/assets/img/DataScience/ML/3.png)
![Desktop View](/assets/img/DataScience/ML/4.png)



<br>
<br>

# 참고

### 1. https://www.youtube.com/watch?v=ve6gtpZV83E
### 2. https://hi-guten-tag.tistory.com/205
### 3. https://www.inflearn.com/course/lecture?courseSlug=파이썬-머신러닝&unitId=89443