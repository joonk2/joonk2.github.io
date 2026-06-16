---
title:  "[선형대수학] 2강. 물리적 벡터"
layout: post
categories: [math, linear-algebra] 
tags: [math, LinearAlgebra]
toc: true
toc_sticky: true
date: 2024-03-01
---

#### 🙅‍♂️휴대폰으로 볼 때 혹시 글자나 숫자가 화면에 다 안나오면<span style="color:red">**,**</span> 휴대폰 가로로 돌리시면 됩니다

# 목차

```md
0. 핵심 요약

1. 벡터와 좌표계  
 1-1. 평면벡터   
 1-2. 공간벡터    
 1-3. n차원 벡터

2. 벡터의 연산  
 2-1. Norm    
 2-2. 선형결합   
 2-3. 스칼라 곱 + cosine simmilarity
 2-4. 벡터 곱

3. 벡터의 응용    
 3-1. 직선의 표현    
 3-2. 평면의 표현  

4. 행벡터와 벡터내적간의 연관성

5. 예제
 5-1. cos theta
 5-2. 두 벡터를 활용한 평행사변형 넓이
 5-3. 직선과 평면이 동시에 만나는 좌표

6. 참고
```

<!------------------------------------------------------------------------------------->
# 0. 핵심 요약 (3개)
### <span style="color:red">norm(정규화) 쓰는 이유</span>
$$\frac{a}{\sqrt{a^T a}} = \frac{a}{||a||}$$ &nbsp; (크기가 1인 벡터) <br>
벡터의 norm을 정규화하면 서로 다른 벡터들 간의 크기 비교가 쉽다 <br>
ex) 유클리드 노름을 사용하여 벡터의 길이를 계산하면 벡터 간의 거리를 비교 가능
<br>

벡터의 norm을 정규화하면 벡터의 방향을 유지하면서 크기를 조절할 수 있다 <br>
주로 벡터를 단위 벡터로 변환하여 특정 방향으로의 이동이나 변형을 측정할 때 사용
<br>

### <span style="color:red">벡터의 내적 연산</span>
$$\begin{bmatrix} a_1\\ a_2 \\ \vdots \\ a_n-1 \\ a_n \end{bmatrix} \cdot \begin{bmatrix} h_1\\ h_2 \\ \vdots \\ h_n-1 \\ h_n \end{bmatrix}  = a_1h_1 + a_2h_2 + \ldots + a_{n-1} h_{n-1} + a_{n} h_{n}$$ <br>

즉 $$a \cdot h = \sum_{i=1}^{10} a_i h_i$$
<br>

ex) $$a$$, $$b$$, ... $$z$$ $$\in R^3$$ 일 때 &nbsp;&nbsp; $$a$$과 $$h$$끼리 내적 가능<br>
**$$\color{pink}{\Rightarrow}$$** $$a \cdot h = a_x h_x + a_y h_y + a_z h_z$$
(벡터의 내적은 같은 공간 안에서만 가능하다!) <br>

+ 하나 더 <br>
n차 다항식 벡터공간과 $$R^n$$ 벡터 공간으로 내적이 정의 되는가? <br>
$$\Rightarrow$$ 암 물론 $$f(a, b) = f(b, a)$$가 만족하면 된다
<br>

### <span style="color:red">정사영</span>
![선형대수·수학 개념 설명: <span style="color:red">정사영</span>](/assets/img/math/LinearAlgebra/part2/projection2.png)
$$\vec{a} \cdot \vec{b} = ||a|| \cdot ||b|| cos \theta $$ <br>
($$\theta$$구하고 수선의 발을 내려 $$\perp$$표시하고 다시 확인해보면 자연스럽게 내적 이해가 될 것이다) <br>

$$V \subseteq |R^n$$, &nbsp;&nbsp; V는 부분공간일 때, <br>
$$x \in |R^n$$, &nbsp; $$x = x_1 +x_2$$로 유일하게 표현된다 <br>
단 <span style="color:red">(</span>$$x_1 \in V$$<span style="color:red">,</span> $$x_2 \in V^\perp$$<span style="color:red">)</span>
<br>

### <span style="color:red">ex)</span>
v와 직교하는 다른 벡터 w에 대해 x가 있을 때, <br> 
x를 a벡터랑 b벡터로 분해하려면? <br>
$$\Rightarrow$$
<br>
a <span style="color:pink">=</span> v에 평행한 a벡터 aka 부분벡터공간 v에 속한 벡터<br>
b <span style="color:pink">=</span> w라는 v에 직교하는 여공간 속에 포함되는 b벡터 <br>

![선형대수·수학 개념 설명: <span style="color:red">ex)</span>](/assets/img/math/LinearAlgebra/part2/projection.png)
<br><br><br><br><br>

# 1. 행렬
## 1-1. 평면백터
$$R^2$$에서  크기(스칼라)와 방향의 의미를 모두 포함하는 표현도구 <br>
($$R^2$$ —> 실수축 2개로 만들어진 좌표평면이라 생각해봅시다) <br>
ex) 속도 = 벡터 <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 속력 = 스칼라
<br><br>

![선형대수·수학 개념 설명: 1-1. 평면백터](/assets/img/math/LinearAlgebra/part2/1.png)
![선형대수·수학 개념 설명: 1-1. 평면백터](/assets/img/math/LinearAlgebra/part2/2.png)

벡터 v와 방향이 같은 벡터: a, d <br>
벡터 v와 크기가 같은 벡터: c, d <br>
ex) v 벡터를 보자 <br>
(2-0, 6-0) 즉 2,6 <br>

<br><br>

## 1-2. 공간벡터
![선형대수·수학 개념 설명: 1-2. 공간벡터](/assets/img/math/LinearAlgebra/part2/3.png)
<br><br>

## 1-3. n차원 벡터
![선형대수·수학 개념 설명: 1-3. n차원 벡터](/assets/img/math/LinearAlgebra/part2/4.png)
<br><br><br>

# 2. 벡터의 연산
## 2-1. Norm
![선형대수·수학 개념 설명: 2-1. Norm](/assets/img/math/LinearAlgebra/part2/5.png)
<br><br><br>

## 2-2. 선형결합
![선형대수·수학 개념 설명: 2-2. 선형결합](/assets/img/math/LinearAlgebra/part2/6.png)
![선형대수·수학 개념 설명: 2-2. 선형결합](/assets/img/math/LinearAlgebra/part2/7.png)
![선형대수·수학 개념 설명: 2-2. 선형결합](/assets/img/math/LinearAlgebra/part2/8.png)
<br><br>

## 2-3. 스칼라 곱 + cosine simmilarity
- ### 스칼라곱 시작하기 전에 잠깐 삼각함수 표 확인합시다
![선형대수·수학 개념 설명: 2-3. 스칼라 곱 + cosine simmilarity](/assets/img/math/LinearAlgebra/part2/9.png)
![선형대수·수학 개념 설명: 2-3. 스칼라 곱 + cosine simmilarity](/assets/img/math/LinearAlgebra/part2/10.png)
![선형대수·수학 개념 설명: 2-3. 스칼라 곱 + cosine simmilarity](/assets/img/math/LinearAlgebra/part2/11.png)
<br><br>

#### cosine simmilarity
$$cos\theta=\frac{a \cdot b}{\vert a \vert \cdot \vert b \vert} = \frac{\sum\limits_{i=1}^N a_i b_i}{\sqrt{\sum\limits_{i=1}^N a_i^2}\sqrt{\sum\limits_{i=1}^N b_i^2}}$$
<br><br>

## 2-4. 벡터곱
![선형대수·수학 개념 설명: 2-4. 벡터곱](/assets/img/math/LinearAlgebra/part2/12.png)
![선형대수·수학 개념 설명: 2-4. 벡터곱](/assets/img/math/LinearAlgebra/part2/13.png)
![선형대수·수학 개념 설명: 2-4. 벡터곱](/assets/img/math/LinearAlgebra/part2/14.png)
<br><br><br>

# 3. 벡터의 응용
## 3-1. 직선의 표
![선형대수·수학 개념 설명: 3-1. 직선의 표](/assets/img/math/LinearAlgebra/part2/15.png)
<br><br>

![선형대수·수학 개념 설명: 3-1. 직선의 표](/assets/img/math/LinearAlgebra/part2/16.png)
![선형대수·수학 개념 설명: 3-1. 직선의 표](/assets/img/math/LinearAlgebra/part2/17.png)
![선형대수·수학 개념 설명: 3-1. 직선의 표](/assets/img/math/LinearAlgebra/part2/18.png)

## 3-2. 평면의 표현
![선형대수·수학 개념 설명: 3-2. 평면의 표현](/assets/img/math/LinearAlgebra/part2/19.png)
<br><br><br><br><br>

# 4. 행벡터와 벡터내적간의 연관성
`질문`: 벡터의 내적이 기하학적으로 한 벡터에서 다른 벡터로의 정사영과 관련이 있을까? <br>
![선형대수·수학 개념 설명: 4. 행벡터와 벡터내적간의 연관성](/assets/img/math/LinearAlgebra/part2/basic1.png)
관례적으로 변화가 되는 대상인 열벡터를 우리가 “흔히 말하는” 벡터라고 본다. <br>
행벡터는 열벡터에 대한 함수로, 열벡터는 ‘변화의 대상’이 되는 것에 반해 행벡터는 변화를 시키는 행위자인 것이다. <br>
가령 [2, 1]이라는 행벡터와 $$[3, -4]^T$$라는 열 벡터에 대해 다음과 같은 곱셈을 생각해보자 <br>
$$
\begin{bmatrix} 2 & 1 \end{bmatrix} \begin{bmatrix} 3 \\ -4 \end{bmatrix}
= 2 * 3 + 1(-4) = 2
$$

<br>

즉, 행벡터는 열벡터를 입력으로 받아 스칼라를 출력하는 &nbsp;
$$f: V \Rightarrow R$$
인 함수
<br><br>

우선 `ax+by+c = 0` 인 식을 통해, 출력 스칼라 값4가 어떤 의미일지 확인하자 <br>
우리는 행벡터에 해당하는 [2, 1] 을 그리고 2x+y=4 라는 점까지의 거리를 생각하자
![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part2/rowVEC-innerProduct.png)
생각해보면  `2x+y=c`에 해당하는 점선은 모두 행벡터 [2, 1]에 수직이다 <br>
<span style="color:red">**why?**</span> --> 행벡터가 점선으로 표현한 함수들에 대해 법선 벡터역할을 하기 때문 <br>
따라서 위의 그림에서 빨간색으로 표현한 길이는 다음과 같이 직각 삼각형의 높이를 계산함으로써 얻을 수 있다.

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part2/inner-product2.png)
<br>

직각 삼각형의 넓이를 구하는 방법을 이용해 d의 길이를 계산할 수 있다. <br>
즉 4x2 = d * $$\sqrt 20$$ 이므로, $$d=\frac{8}{\sqrt20} = \frac{4}{\sqrt5}$$이다 <br>
여기서 행벡터 [2, 1]의 길이는 $$\sqrt5$$인데, 이 길이를 d에 곱하면 <br>
$$d*\sqrt5 = \frac{4}{\sqrt5}*\sqrt5 = 4$$ 

<br>

즉 <u>열벡터의 정사영 길이 * 행벡터의 길이 = 내적 값 </u> <br>
결과값은 아래와도 똑같이 4로 같다 <br>
$$ ||v|| * ||w|| * cos60 $$ 
<br>
이것은 다시 말해 열벡터의 정사영 길이가 내적 계산에 이용되기 때문임을 기하학적으로 확인할 수 있는 것이다.
<br><br>

# 5. 예제
## 5-1. cos theta
![선형대수·수학 개념 설명: 5-1. cos theta](/assets/img/math/LinearAlgebra/part2/20.png)
<br><br>

## 5-2. 두 벡터를 활용한 평행사변형 넓이
![선형대수·수학 개념 설명: 5-2. 두 벡터를 활용한 평행사변형 넓이](/assets/img/math/LinearAlgebra/part2/21.png)
<br><br>

## 5-3. 직선과 평면이 동시에 만나는 좌표
![선형대수·수학 개념 설명: 5-3. 직선과 평면이 동시에 만나는 좌표](/assets/img/math/LinearAlgebra/part2/22.png)
![선형대수·수학 개념 설명: 5-3. 직선과 평면이 동시에 만나는 좌표](/assets/img/math/LinearAlgebra/part2/23.png)
![선형대수·수학 개념 설명: 5-3. 직선과 평면이 동시에 만나는 좌표](/assets/img/math/LinearAlgebra/part2/24.png)
<br><br>

# 6. 참고
[[선형대수학] 2강. 물리적 벡터 (임시재업)](https://www.youtube.com/watch?v=rSmVevqyFu4&t=159s)

[[공돌이의 수학정리노트 (Angelo's Math Notes)] &nbsp;&nbsp;&nbsp; 행벡터의 의미와 벡터의 내적](https://angeloyeo.github.io/2020/09/09/row_vector_and_inner_product.html)

[[쑤튜브 &nbsp;&nbsp;&nbsp; 선형대수학 64강: 정사영 정리[쑤튜브]]](https://www.youtube.com/watch?v=HFONMxI8b2Q)

[[김강용: 심화와 응용에 강한 수학 &nbsp;&nbsp;&nbsp; [수학기초잡기] 정사영 쌩기초잡기]](https://www.youtube.com/watch?v=mszuZZJRAFA)

[[설레는 수학 &nbsp;&nbsp;&nbsp; 벡터의 내적 8분만 투자하세요 내적을 구하는 3가지 방법 벡터의 곱셈??]](https://www.youtube.com/watch?v=2aNkZjGeonA&t=209s)
