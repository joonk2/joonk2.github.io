---
title:  "[선형대수학] 3강. 수학적 벡터 (벡터공간)"
layout: post
categories: [math, linear-algebra]
tags: [math, LinearAlgebra, 벡터공간, 기저, 차원, basis, dim, dimension, 선형독립, 선형종속]
toc: true
toc_sticky: true
date: 2024-03-07 thur 21:20
updated: 2024-03-19 mon 00:44
---

#### 🙅‍♂️휴대폰으로 볼 때 혹시 글자나 숫자가 화면에 다 안나오면<span style="color:red">**,**</span> 휴대폰 가로로 돌리시면 됩니다


```md
*참고

1. 행렬과 선형변환 & 여러 선형변환의 시각적 예시

2. 대수구조
 2-1 대수구조
 2-2 여러 대수구조

3. 벡터공간
 3-1 벡터공간
 3-2 종류 (norm, 내적, 유클리드)
 3-3 선형결합(linear combination) & 선형생성(span)
 3-4 선형독립 & 선형종속
 3-5 기저
 3-6 차원

4. Rank와 Nullity

5. 이벤트문제(2개) + 예제(5개)
 5-1 row space R(U), column space C(U), null space N(U) 구하기
 5-2 dim 응용
 5-3 예제 5개
```

# *참고
시작하기 전 알면 좋은 것
1. 항등원:  
- **덧셈 연산에서 항등원은 0이다:** *a*+0=*a* (모든 *a*에 대해)
- **곱셈 연산에서 항등원은 1이다:** *a*⋅1=*a* (모든 *a*에 대해)
2. 역원
- **덧셈의 경우:** 원소 *a*의 역원을 *a*′라 할 때, *a*+*a*′=0
- **곱셈의 경우:** 원소 *a*의 역원을 *a*′라 할 때, *a*⋅*a*′=1
3. 복습 <br>
![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/wrath-of-math.png)
<br><br><br><br><br> 
    
# 1. 행렬과 선형변환 & 여러 선형변환의 시각적 예시
![선형대수·수학 개념 설명: 1. 행렬과 선형변환 & 여러 선형변환의 시각적 예시](/assets/img/math/LinearAlgebra/part3/01.png) <br><br><br>

임의의 벡터 $$\vec{a}, \vec{b}$$
와 스칼라 c에 대해 변환 T가 다음의 두 조건을 만족한다면 이 변환 T는 선형변환이다 <br>

$$T(\vec{a}+\vec{b}) = T(\vec{a}) + T(\vec{b}) \\ T(c\vec{a}) = cT(\vec{a}$$
<br>

따라서 위의 선형 변환의 성질에 따라, 임의의 벡터 $$\begin{bmatrix} x \\ y \end{bmatrix}$$
에 대해 다음이 성립한다. <br>

$$
T\begin{bmatrix} x \\ y \end{bmatrix} = T \left(x \begin{bmatrix} 1 \\ 0 \end{bmatrix} + y \begin{bmatrix} 0 \\ 1 \end{bmatrix}\right) = xT \left(\begin{bmatrix} 1 \\ 0 \end{bmatrix} \right) + yT \left(\begin{bmatrix} 0 \\ 1 \end{bmatrix} \right)
$$
<br><br>

### **<font color='red'>자 그러면</font>**
$$R^2$$ 에서 기존 기저벡터를 $$\hat{i} = \begin{bmatrix} 1 \\ 0 \end{bmatrix} \quad\quad \hat{j} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$
그리고 새로운 기저벡터를 $$\hat{i}_{new} \quad\quad \hat{j}_{new}$$
라 했을 때,  &nbsp;&nbsp;&nbsp;
$$\hat{i}_{new} = T\begin{bmatrix} 1 \\ 0 \end{bmatrix} \quad\quad \hat{j}_{new} = T\begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

<br>
T가 선형변환이라면, 벡터
$$\begin{bmatrix} x \\ y \end{bmatrix}$$
는 선형변환 후에, <br>
새로운 기저벡터 
$$\hat{i}_{new}$$ 와 $$\hat{j}_{new}$$
의 x배와 y배의 합으로 표현되야 한다는 것이다
<br><br>

예를들어
$$A= \begin{bmatrix} 2 & -3 \\ 1 & 1 \end{bmatrix}$$을 이용해 벡터 
$$\vec{x} = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$$을 변환시켜 보면, <br>

$$A\vec{x}= \begin{bmatrix} 2 & -3 \\ 1 & 1 \end{bmatrix} \begin{bmatrix} 1 \\ 1 \end{bmatrix} = \begin{bmatrix} -1 \\ 2 \end{bmatrix}$$
임을 알 수 있는데 <br>
아래의 슬라이드를 움직이면 사진처럼 이 값은 새로운 두 기저벡터의 1배와 1배의 합으로 표현된다<br>
그리고 슬라이드를 끝까지 움직여도 원점은 꼭짓점에 고정, 직선의 형태를 유지한게 보일것이다<br>
--> 즉 transformation(선형변환)

<p align="center"><iframe  src="https://joonk2-linear-transformation.netlify.app/" width="650" height = "520" frameborder="0"></iframe></p>
<!-- ![수학 개념 설명 다이어그램](https://github.com/joonk2/math/raw/main/linear-algebra/linear-transformation.gif) -->
![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/02.png)

우선 좌측 사진은 선형변환 전, &nbsp;&nbsp; 우측사진은 A행렬로 선형변환을 한 후 <br>
여기서 초록색은 기저벡터인 i, 그리고 빨간색은 기저벡터인 j <br>
빨간색 좌표인 1,1은 입력 벡터다 <br>
이를 보면 linear transformation 결과로 빨간점의 원래 기저벡터의 -1, 2배로 표현되었지만, <br>
linear transformation(선형변환) 이후 새로운 기저벡터
$$\hat{i}_{new} \quad\quad \hat{j}_{new}$$
에 대해서는 각각 1, 1배로 표현되는 것을 알 수 있다. <br>
즉 일반적으로, 선형대수학의 기본정리에 따르면 벡터공간의 선형변환 = 행렬의 본질
<br><br><br>

### <span style="color:purple">**😎여러 선형변환의 시각적 예시**</span>
위의 시뮬레이션 및 그림에서 눈여겨 볼 점으로 선형 변환을 기하학적으로 표현하자면, 
격자들이 변환 후에도 선의 형태이고, 격자 간의 간격도 균등하게 넓어야 한다는 것이다. <br>
여러가지 선형 변환(즉, 행렬)을 기하학적으로 시각화 하였으니, <br>
격자들이 변환 후에도 선의 형태를 유지하면서도, 격자 간의 간격이 균등하게 넓은지 확인해보자
<br>

아래의 5개 특징들은 행렬과 $$\vec{x}$$라는 벡터인 $$\begin{bmatrix} 1 \\ 1 \end{bmatrix}$$을 곱해 선형변환하는 각각의 시뮬레이션과 결과들이다
## <span style="color:red">**shearing**</span>
전단 or 전단변환이라고 하며, 원래의 사각형이 평행사변형이 되는 등의 변환을 보인다
<br><br>
$$\quad\quad\quad\quad\quad\quad \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$$ <br><br>
![선형대수·수학 개념 설명: <span style="color:red">**shearing**</span>](https://github.com/joonk2/math/raw/main/linear-algebra/linear-transformation/shear/shear.gif)
<br>
![선형대수·수학 개념 설명: <span style="color:red">**shearing**</span>](/assets/img/math/LinearAlgebra/part3/shear.png)
<br><br><br>

## <span style="color:red">**rotation**</span>
$$\quad\quad\quad\quad\quad\quad \begin{bmatrix} cos(\frac{\pi}{2}) & -sin(\frac{\pi}{2}) \\ sin(\frac{\pi}{2}) & cos(\frac{\pi}{2}) \end{bmatrix}
=\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$$
<br>

![선형대수·수학 개념 설명: <span style="color:red">**rotation**</span>](https://github.com/joonk2/math/raw/main/linear-algebra/linear-transformation/rotation/rotation.gif) 
<br>
![선형대수·수학 개념 설명: <span style="color:red">**rotation**</span>](/assets/img/math/LinearAlgebra/part3/rotation.png)
<br><br><br>

## <span style="color:red">**permutation**</span>
행렬의 행 or 열 순서를 변경하여 새로운 배열을 생성하는 것 <br><br>
$$\quad\quad\quad\quad\quad\quad \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$$ <br><br>

이 행렬에서는 행, 열 순서 바꿔도 다 똑같이 나온다
<br><br> 

![선형대수·수학 개념 설명: <span style="color:red">**permutation**</span>](https://github.com/joonk2/math/raw/main/linear-algebra/linear-transformation/permuatation/permutation.gif)
<br><br><br>

## <span style="color:red">**projection on x axis**</span>
x축으로 projection(정사영) 생성 <br>
$$\quad\quad\quad\quad\quad\quad \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$$ <br><br>

![선형대수·수학 개념 설명: <span style="color:red">**projection on x axis**</span>](https://github.com/joonk2/math/raw/main/linear-algebra/linear-transformation/projection_on_x_axis/projection_on_x_axis.gif) <br>
![선형대수·수학 개념 설명: <span style="color:red">**projection on x axis**</span>](/assets/img/math/LinearAlgebra/part3/projection_on_x_axis.png)
<br><br><br>

## <span style="color:red">**projection on a vector$$\begin{bmatrix} 1  \\ 2 \end{bmatrix}$$**</span>
$$\quad\quad\quad\quad\quad\quad \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$$ <br><br>
![선형대수·수학 개념 설명: <span style="color:red">**projection on a vector$$\begin{bmatrix} 1  \\ 2 \end{bmatrix}$$**</span>](https://github.com/joonk2/math/raw/main/linear-algebra/linear-transformation/projection_on_vector/projection_on_vector.gif)

<br><br><br><br><br> 

# 2. 대수구조
- 참고 <br>
우선 대수학부터 알아야 할 것입니다 <br>
대수학 —> 대수구조를 연구하는 학문 <br><br>

## 2-1 대수구조

간단하게 숫자를 대신한다는 말입니다 <br>
즉 숫자를 대신할 모든 대상으로 하는 집합 + 그 집합에 부여된 연산구조(structure) <br>
ex) 일련의 연산들이 주어진 집합 --> 'x'라는 문자가 1 대신, &nbsp;&nbsp;&nbsp;&nbsp;`ㄱ`이라는 문자가 8**2 대신 가능
즉 우리가 정하기에 따라 어떤 것들도 수학적 대상이 될 수 있습니다

## 2-2 여러 대수구조
![선형대수·수학 개념 설명: 2-2 여러 대수구조](/assets/img/math/LinearAlgebra/part3/0.jpg)
![선형대수·수학 개념 설명: 2-2 여러 대수구조](/assets/img/math/LinearAlgebra/part3/2.png)

# 3. 벡터공간
## 3-1 벡터공간
벡터 공간을 이해하기 위해선 우선 **<font color='red'>공간</font>**을 알아야 합니다. <br>
집합 V의 임의의 원소 u, v와 임의의 스칼라 k에 대하여 <br>
1) $$ u+v \in V$$ <br>
2) $$ku \in V$$ <br>
이 2가지 성질을 만족할 때 집합(Set) V를 공간(Space) V라고 합니다. 
<br><br>

그렇다면 **<font color='blue'>벡터공간</font>**은? <br>
공간 V의 임의의 원소 u, v, w와 임의의 스칼라 k, l에 대해 다음이 모두 만족되고,<br> 아래의 **<u>성질 8개를 모두 만족할 때</u>** 공간 V를 벡터공간(Vector Space) V 라고 한다<br>
1)&nbsp; $$u+v = v+u$$ <br>
2)&nbsp; $$(u+v) + w = u + (v+w)$$ <br>
3)&nbsp; $$u + 0 = u$$ <br>
4)&nbsp; $$u + (-u) = 0$$ <br>
5)&nbsp; $$k(u+v) = ku + kv$$ <br>
6)&nbsp; $$(k+l)u = ku + lu$$ <br>
7)&nbsp; $$(kl)u = k(lu) = l(ku)$$ <br>
8)&nbsp; $$lu = u$$ <br><br>

```
아래는 대수구조와 함께 성질 8개에 대한 내용입니다. 
```
![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/3.png)
<br><br><br><br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/4.png)
<br><br><br><br><br>

## 3-2 종류 (norm, 내적, 유클리드)
### **(1) Norm 공간**
![선형대수·수학 개념 설명: **(1) Norm 공간**](/assets/img/math/LinearAlgebra/part3/8.png)
<br><br>

### **(2) 내적공간**
![선형대수·수학 개념 설명: **(2) 내적공간**](/assets/img/math/LinearAlgebra/part3/9.png)
![선형대수·수학 개념 설명: **(2) 내적공간**](/assets/img/math/LinearAlgebra/part3/10.png)
<br><br>

### **(3) 유클리드 공간**
![선형대수·수학 개념 설명: **(3) 유클리드 공간**](/assets/img/math/LinearAlgebra/part3/11.png)
<br><br><br><br><br><br>

## 3-3 선형결합(linear combination) & 선형생성(span)
### **(1) 선형결합(linear combination)**
벡터 $$V$$가 벡터 $$v_1, v_2 \ldots, v_n$$의 linear combination <br>
#### **<font color='#5ad7b7'>뜻</font>**:
$$V = c_1v_1 + c_2v_2 + \ldots, + c_nv_n$$을 만족하는 <br>
스칼라배가 가능한 실수 $$c_1, c_2 \ldots, c_n$$이 존재한다는 것입니다.<br>
**$ \color{red}{\Rightarrow} $** 쉽게 얘기하면 $$c_1v_1$$, $$c_2v_2$$ 라는 벡터들을 조합(combination)하여 V라는 새로운 벡터를 만든다는 겁니다 <br>
(더 쉽게 얘기하면 $$v_1$$, $$v_2$$벡터들을 각각 얼마나<font color='blue'>(</font>$$c_1$$, $$c_2$$<font color='blue'>)</font> 쓸까?)
이걸 식으로 나타내면 이렇습니다 $$V = c_1v_1+c_2v_2$$


<br><br>
예시로 벡터 $$V=\begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}$$ &nbsp;이라고 하면, <br>
벡터 V는 $$\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$$ + $$\begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}$$ 이 두 벡터를 더한 linear combination이라고 할 수 있습니다. <br><br><br>

그러면 $$V=\begin{bmatrix} 1 \\ 2 \\ 2 \end{bmatrix}$$ 일때는 <br>
$$\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$$ + $$2\begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}$$ 이렇게 linear combination을 해주어 만들 수 있습니다
<br><br><br>

이건 linear combination이 불가능한 경우입니다. <br>
$$V=\begin{bmatrix} 1 \\ 2 \\ 2 \end{bmatrix}$$ 일때 &nbsp;&nbsp;
$$V \neq \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} + \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$$<br><br>

왜? --> 맨 아래 원소 둘다 0이라 각각 상수배 하여 덧셈해줘도 2 못 만듦
<br><br><br>

### 😎**<font color='red'>시각화</font>**
자 쉬운 이해를 위해 시각화로 보겠습니다 <br>
우선 2차원에서 $$v_1$$, $$v_2$$ 벡터를 가지고 linear combination 하겠습니다
<br>
벡터를 더하려면?? **$\Rightarrow$** $$\color{red}{\vec{v}_{2}}$$를 $$\color{lightblue}{\vec{v}_{1}}$$ 끝점으로 옮겨라 <br>
$$\therefore$$ **<font color='yellow'>노란벡터</font>**(더한 결과) <br>

![선형대수·수학 개념 설명: 😎**<font color='red'>시각화</font>**](https://github.com/joonk2/math/raw/main/linear-algebra/linear-comb/linear-comb-1.gif)
<br><br>

그러면 이번에는 $$\color{lightblue}{\vec{v}_{1}}$$, $$\color{red}{\vec{v}_{2}}$$에 각각 스칼라배를 바꾸어 선형결합한 결과를 
<br> <font color='yellow'>노란색</font>으로 나타내고, 선형결합했던 흔적을 회색으로 표현하겠습니다 <br>
![수학 개념 설명 다이어그램](https://github.com/joonk2/math/raw/main/linear-algebra/linear-comb/linear-comb-2.gif)

<br><br><br><br>

### **(2) 선형생성(span)**
span은 쉽게 선택한 벡터들로 생성된 공간인데, <br>
주어진 벡터들의 선형 조합으로 생성되는 모든 벡터들의 집합입니다<br>

### 😎**<font color='red'>시각화</font>**
쉽게 이해하기 위해 $$R^3$$에서 벡터2개와 벡터3개가 각각 span하는 모습을 보겠습니다. <br>

<font color='blue'>ex-1)</font>벡터 2개로 span
$$R^3$$에서 $$c_1\color{lightblue}{\vec{v}_{1}}$$, $$c_2\color{pink}{\vec{v}_{2}}$$로 선형결합 결과인 $$\color{green}{\vec{V}}$$를 나타낸 것 <br>
$$\rightarrow$$ 즉 $$R^3$$에서 2차원 평면공간 내에 모든 곳을 나타낼 수 있다
![선형대수·수학 개념 설명: 😎**<font color='red'>시각화</font>**](https://github.com/joonk2/math/raw/main/linear-algebra/linear-comb/R3-2vec.gif)
<br><br>

<font color='blue'>ex-2)</font>벡터 3개로 span
$$R^3$$에서 $$c_1\color{lightblue}{\vec{v}_{1}}$$, $$c_2\color{pink}{\vec{v}_{2}}$$, $$c_3\color{red}{\vec{v}_{3}}$$로 선형결합한 결과 <br>
$$\rightarrow$$ 즉 $$R^3$$에서 3차원 평면공간 내에 모든 곳을 나타낼 수 있다 <br>
![수학 개념 설명 다이어그램](https://github.com/joonk2/math/raw/main/linear-algebra/linear-comb/R3-3vec.gif)

<br><br><br>

### (3) **부분벡터 공간**
벡터공간 V에 포함된 부분집합(subset) H가 벡터공간의 성질 8개를 만족할 때<br>
**<font color='#5ad7b7'>부분공간</font>**<font color='#5ad7b7'>(</font>Subspace<font color='#5ad7b7'>)</font> or **<font color='#5ad7b7'>부분벡터공간</font>**이라고 하며 &nbsp; W다.<br><br>

우선 조건은 3가지로 아래와 같습니다. <br>
1)&nbsp; $$zero \quad vector \quad 보유$$ <br>
2)&nbsp; $$\vec{v}+\vec{u} \in V$$ <br>
3)&nbsp; $$k\vec{v} \in V$$ <br><br>

$$R^3$$에 있다고 가정하고 우선 영벡터인 $$\vec{0} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}$$이 있어야 합니다. <br>
그리고 임의의 벡터 v+u를 더한게 V벡터공간에 속해야 하고, <br>
스칼라배를 한 벡터도 V벡터공간에 속해야 합니다.
![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/12.png)
<br>

쉽게 얘기해서 크림빵이 있는데 떼어냈을 때, 크림이 없는 빵 부분이라면 그냥 빵인데<br>
크림도 같이 묻은 빵이 떼어진다면 크림빵이라 할 수 있습니다. <br>
즉 2번째는 크림빵의 성질을 만족합니다
<br><br><br><br>


## 3-4 선형독립 & 선형종속
우선 선형독립, 선형종속의 영상부터 먼저 보고 시작하겠습니다. <br>
### 선형독립
![선형대수·수학 개념 설명: 선형독립](https://github.com/joonk2/math/raw/main/linear-algebra/dependent-independent/linearly-independent.gif)
<br>

### 선형종속
![선형대수·수학 개념 설명: 선형종속](https://github.com/joonk2/math/raw/main/linear-algebra/dependent-independent/linearly-dependent.gif)
<br><br><br><br><br>

벡터방정식 $$c_1v_1 + c_2v_2 \quad ... \quad + c_nv_n = \vec{0}$$ 에서 <br>
$$c_1, c_2\quad \ldots \quad,  c_n = 0$$ 이라면 <br>
**$ \color{pink}{\Rightarrow} $** 해가 영벡터 뿐, 즉 선형독립 <br><br>
영벡터가 이외의 해가 존재<br>
**$ \color{lightblue}{\Rightarrow} $** 선형종속 <br><br><br><br>

쉽게 보기위해 각 벡터집합인 $$v_1, v_2\quad \ldots \quad,  v_n$$을 전개해보겠습니다 <br>
아래는 선형독립과 종속에 대한 판별법입니다 <br><br>
$$v_1=\begin{bmatrix} 1 \\ 0 \\ 2 \end{bmatrix}, \quad v_2=\begin{bmatrix} -1 \\ 1 \\ 2 \end{bmatrix}, \quad v_3=\begin{bmatrix} -2 \\ 3 \\ 1 \end{bmatrix}, \quad v_4=\begin{bmatrix} 2 \\ 1 \\ 1 \end{bmatrix}$$

<br>
이렇게 4개의 벡터가 있다고 가정할 때 <br>
선형독립을 구하는 방법은 <br>
정말 쉽게 얘기해서 각각의 벡터에 k상수배를<br>
곱하거나 안곱하여 더해줬을 때 그 중에 한 벡터의 값이 나오거나 0 이외의 해가 나오면 안됩니다<br>

case 1) &nbsp; 한 벡터의 값이 나오는 경우 <br>
**$ \color{red}{\Rightarrow} $**
$$k_2v_2 +k_3v_3 + k_4v_4 = v_1$$ 이렇게 표현되면 안된다는 얘기입니다 <br>
(즉 전부 독립적이어야 합니다 --> 그래야 선형독립입니다)
<br><br>

case 2) &nbsp; 0 이외의 해가 나오는 경우 <br>
쉽게 얘기해 0 이외의 스칼라가 존재하는 경우입니다<br>
$$k_1\begin{bmatrix} 1 \\ 0 \end{bmatrix} + k_2\begin{bmatrix} 0 \\ 1 \end{bmatrix} + k_3\begin{bmatrix} 1 \\ 1 \end{bmatrix}= \vec{0}$$ 
&nbsp;&nbsp; 이라면

<br><br>
$$k_1 = k_2 = 1$$ &nbsp;&nbsp;&nbsp;&nbsp;  $$k_3 = -1$$로 선형종속 입니다

처음부터 차근차근 보겠습니다<br>
우선 &nbsp;
$$v_1, v_2, v_3$$ &nbsp; 만 비교해보겠습니다<br>
$$c_1v_1 + c_2v_2 + c_3v_3 = \vec{0}$$ **$ \color{red}{\Rightarrow} $** $$c_1, c_2, c_3 = 0$$
<br><br>

이걸 식으로 고쳐보겠습니다<br>

$$\begin{bmatrix}1 & -1 & -2 \\ 0 & 1 & 3 \\  2 & 2 & 1 \end{bmatrix} \begin{bmatrix} c_1 \\ c_2 \\ c_3 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}$$
<br><br>

현재 Ax = 0 형태인데 기약행 사다리꼴형태가 되는지 확인합니다 <br>
<font color='red'>방법1</font>: &nbsp;&nbsp;&nbsp;&nbsp; $$A^-1$$ 을 곱하여 $$I$$인 [(1,0,0)(0,1,0)(0,0,1)]를 확인<br>
<font color='blue'>방법2</font>: &nbsp;&nbsp;&nbsp;&nbsp; 기약행 사다리꼴로 $$I$$가 되는지 확인 <br><br><br>

참고: &nbsp;&nbsp;&nbsp;&nbsp;(행렬 계산할 때는 각 행을 열로 전치시킴) 
<br>
확인해보니 만들 수 있네요! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 아래 참고⬇️
<br><br>

$$\begin{bmatrix}1 & 0 & 0 \\0 & 1 & 0 \\ 0 & 0 & 1\end{bmatrix}$$
<br><br>

위 3개 벡터들은 선형독립이니 아래처럼 휘어진 좌표계들로<br>
3차원 전체를 나타낼 수 있습니다
<br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/linear-independant.png)
<br><br>

즉 $$v_1, v_2, v_3$$으로 3차원 전체를 표현할 수 있어 $$v_4$$는 필요 없습니다<br>
$$Span\{v_1, v_2, v_3\} = |R^3$$
**$ \color{red}{\Rightarrow} $** 그리하여 $$v_1,v_2,v_3,v_4$$는 선형독립이 아니고, 
<br>
$$v_1,v_2,v_3$$ 끼리만 선형독립입니다.
<br><br>

근데 $$v_1$$을 제외하고 $$v_2,v_3,v_4$$ 이 3개만으로 선형독립이 안된다는 보장도 없습니다. <br>
계산하면 $$Span\{v_2, v_3, v_4\} = |R^3$$ <br>
이렇게 3차원 전체를 나타낼 수도 있습니다

<br><br><br><br>
<br><br>

조금 더 예시를 살펴보면 아래와 같습니다. <br>

```
case 1)
$$R^3$$ 의 세 벡터 (1, 0, 0), (0, 1, 0), (0, 0, 1)은 선형독립이다
```
![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/7-1.png)
<br><br><br>

```
case 2)
$$R^3$$ 의 세 벡터 (1, 0, 0), (0, 1, 0), (2, 1, 0)은 선형종속이다
그래서 기저가 될 수없다. 왜냐하면 v_1인 (1,0,0)과 v(0,1,0)으로
v_3인 (2,1,0)을 나타낼 수 있기 때문이다
```
![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/7-2.png)
<br><br><br><br><br><br>

## 3-5 기저
기저(basis)란 특정 벡터 공간 안에서 그 공간을 형성하는 벡터들의 집합으로<br>
$$R^n$$의 임의의 원소를 표현하기 위해 필요한 최소한의 벡터로 이루어진 집합입니다. <br>
쉽게 생각하면 **$ \color{red}{\Rightarrow} $**기저벡터의 갯수 = $$R^n$$라는 차원에서의 n차원 평면도형을 표현 가능 <br>
ex) <u>각 벡터의 원소가 5개인 기저벡터가 3개라면 3차원 평면도형을 만들 수 있음</u>
<br>

그래서 3차원의 기저가 **<font color='blue'>[</font>**[1,0,0]<font color='red'>,</font>[0,1,1]<font color='red'>,</font>[0,0,1]**<font color='blue'>]</font>** 일수도 있고, <br>
**<font color='blue'>[</font>**[1,1,0,0,0]<font color='red'>,</font>[0,0,1,-1,0]<font color='red'>,</font>[0,0,0,0,1]**<font color='blue'>]</font>** 이렇게 형성될 수도 있다.

아래는 $$R^2$$을 기준으로 기저와 임의의 고유기저로 만든 **(3,4)**에 대해 확인한 내용입니다.
![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/7-3.png)
<br>
표준기저: &nbsp; $$\{(1,0), (0,1)\}$$ <br>
기저: &nbsp; $$\{(1,1), (0,1)\} \\ \{(1,?), (0,1)\}$$  <br><br>



표준기저로는  $$\begin{bmatrix} 3 \\ 4 \end{bmatrix}=3\begin{bmatrix} 1 \\ 0 \end{bmatrix} + 4\begin{bmatrix} 0 \\ 1 \end{bmatrix}$$ 
**$ \color{red}{\Rightarrow} $** 좌표: &nbsp; $$\begin{bmatrix} 3 \\ 4 \end{bmatrix}$$  
<br><br>

기저로는  $$\begin{bmatrix} 3 \\ 4 \end{bmatrix}=3\begin{bmatrix} 1 \\ 1 \end{bmatrix} + 1\begin{bmatrix} 0 \\ 1 \end{bmatrix}$$  **$ \color{red}{\Rightarrow} $** 좌표: &nbsp; $$\begin{bmatrix} 3 \\ 1 \end{bmatrix}$$  <br><br><br>

여기 있는 기저들로 &nbsp; (3, 4)를 나타낼 수 있습니다. <br>
즉 여기 있는 $$R^2$$ 차원(그래프)에 있는 원하는 원소(aka 벡터)들을 생성해낼 수 있을 때<br>
우리는 그것들을 `기저`라고 부릅니다

3(1,1) + 1(0,1)


```
🙂기저의 원소 갯수는 정해져있지 않지만, 표준기저는 무조건 단위 행렬입니다.
```
ex) 
$$R^2$$에서 &nbsp; 임의로 정한 기저 = 
$$\left\{\begin{bmatrix} 0 \\ 0 \\ 0 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 0 \\ 0 \\ 1 \end{bmatrix}\right\}$$
<br>
이 기저들로 2차원에서 2차원 평면을 표현할 수 있다
<br><br><br><br><br>

### <span style="color:purple">**기저가 아닌 경우**</span>: <br>
총 2가지를 예시로 들어보겠습니다 <br><br>

2차원의 임의의 원소를 표현하는데 2개의 벡터만 있으면 되는데, 아래는 4개므로 불필요한게 2개 더 있습니다.  그러므로 "m차원의 임의의 원소를 표현하기 위해 필요한 최소의 벡터로 이루어진 집합"인 기저(basis)가 아닙니다.
![선형대수·수학 개념 설명: <span style="color:purple">**기저가 아닌 경우**</span>: <br>](/assets/img/math/LinearAlgebra/part3/7-4.png)
<br><br><br><br><br>

3차원의 임의의 원소를 표현하기 위해서 필요한 최소한의 벡터는 3개입니다<br>
아래의 예는 이미 1번열, 2번열 벡터로 3번열 벡터를 표현할 수 있기에 3차원 기저에서 탈락입니다 <br>
게다가 3개 벡터의 세번째 원소가 모두 '0'으로 되어 있어서, <br>
3차원의 세번째 차원을 표현할 방법이 없으므로 기저가 아닙니다.  <u>기저X</u> <br>
그리고 0 이외의 해도 존재하여 <span style="color:red">**선형종속**</span> <br>
$$ \begin{cases} c_1 = 0 \\ c_2 = 0 \\ c_3 = 0 \end{cases} ~ 이외에도 ~  \begin{cases} c_1 = 2 \\ c_2 = 1 \\ c_3 = -1 \end{cases} \begin{cases} c_1 = -2 \\ c_2 = -1 \\ c_3 = 1 \end{cases}$$
<br><br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/7-5.png)
<br><br><br><br>

## 3-6 차원 (정말 중요!!)
일반적으로, n차원 벡터 공간은 n개의 독립적인 기저 벡터로 구성됩니다. <br>
예를 들어 2차원 벡터 공간은 두 개의 독립적인 벡터로 구성되며, <br>
3차원 벡터 공간은 세 개의 독립적인 벡터로 구성<br>
또한 V의 차원을 dim`V`로 표시한다
<br><br>

### <span style="color:purple">**특징**</span>:
기저는 변할 수 있지만 <u>기저의 갯수는 변하지 않습니다</u>! <br>
차원의 갯수 = 기저 <br>
아까 말했지만 기저는 절대로 $$\vec{0}$$가 될 수 없습니다! <br>
왜? --> 예를들어 $$R^3$$ $$\vec{0}$$가 있다고하면 $$\begin{bmatrix} 0 \\ 0 \\0 \end{bmatrix}$$으로 선형종속성을 가지기 때문입니다.<br>
즉 기저가 되려면 n차원을 전부 표현할 수 있어야 하고, 선형독립성이 있어야해서 $$\vec{0}$$이 되면 안됩니다
<br><br><br><br><br>

### <span style="color:lightblue">**다음 벡터공간에 대해 차원을 구하면?**</span>
```
예제 1)
```
$$V = \{(a,b,c,d) \quad | \quad a=b=c\}$$
<br><br>
a, b, c가 같으니까 1로 고정시켰는데 d가 없네요 <br>
이게 뭐냐면 d는 혼자 움직일 수 있는 축에서 따로 놀고 있다는 뜻입니다. <br>
즉 d는 0으로 채워지고 또 따로 하나 (0, 0, 0, 1)로 잡아줘야 합니다<br>
즉 답은 아래와 같습니다. <br>
**$ \color{red}{\Rightarrow} $**(1, 1, 1, 0)<span style="color:red">**,**</span> &nbsp;&nbsp; (0, 0, 0, 1)<br>
즉 dim(V)=2로 &nbsp; 기저 2개 <br><br>

만약 저 기저로 (2, 2, 2, 5)를 만드려면 어떻게 해야할까요? <br>

$$(2, 2, 2, 5) = 2(1,1,1,0) + 5(0,0,0,1)$$ **$ \color{red}{\Rightarrow} $** 좌표: &nbsp; $$\begin{bmatrix} 2 \\ 5 \end{bmatrix}$$ <br><br><br>

```
예제 2)
``` 
$$V = \{(a,b,c,d,e) \quad | \quad a=b, c=-d \}$$
<br><br>

**case 1)** <br>
a가 1로 고정되면 b도 똑같이 된다는 뜻입니다! <br>
c, d는 0으로 따로 잡아줍시다 why? --> a,b랑 별개라서 <br>
e는 혼자 놀고 있으니 따로 0으로 잡읍시다! <br><br>

**case 2)** <br>
a, b를 0으로 고정<br>
c, d는 그러면 1로 고정 <br>
e는 역시 혼자 놀기에 그대로 0 <br><br><br>

sol: <br>
이렇게 되면 case 1, 2와 함께 혼자만 움직일 수 있는 e를 위한 축도 따로 잡아줍니다 <br>
**$ \color{red}{\Rightarrow} $** (1,1,0,0,0)<span style="color:red">**,**</span> (0,0,1,-1,0)<span style="color:red">**,**</span> (0,0,0,0,1) <br>
기저는 총 3개라서 3차원이 됩니다! &nbsp;&nbsp;&nbsp; dim(V) = 3
<br><br><br>

```
예제 3)
``` 
$$V = \{(a,b,c,d,e) \quad | \quad a=b=c=0 \}$$
<br><br>

<span style="color:blue">**{**</span>(0,0,0,1,0)<span style="color:red">**,**</span> (0,0,0,0,1)<span style="color:blue">**}**</span> 로 총 기저는 2개며 $$R^2$$입니다
<br><br><br>

```
예제 4)
``` 
$$W = \begin{cases}\begin{pmatrix}x_1 \\x_2 \\x_3\end{pmatrix}\end{cases}
\in R^3 \quad | \quad x_1 + 2x_3 = 0, \quad x_2 - x_3 = 0$$ 
<br><br>
문제를 보니 $$x_1$$이 1이면, &nbsp; $$x_3$$은 $$-\frac{1}{2}$$되고, &nbsp; $$x_2$$는 $$\frac{1}{2}$$가 됩니다. <br>
**$ \color{red}{\Rightarrow} $** 즉 기저는 1개로 $$\{(1, -\frac{1}{2},-\frac{1}{2}) \}$$ 가 되어 1차원 입니다
<br><br><br><br>

# 4. Rank와 Nullity
rank를 들어가기 전 잠깐 개념 복습 하겠습니다. <br>
아래는 rank의 연산법인 연립일차행렬방정식에 대한 간단한 예시입니다! <br>
아래 식으로 행렬을 AX = B 꼴로 고쳤습니다 <br>
A = 계수행렬, &nbsp;&nbsp;&nbsp; X = 변수를 포함한 열벡터 &nbsp;&nbsp;&nbsp; B = 상수벡터 <br>
초기 형태는 아래와 같습니다<br><br>
$$\begin{bmatrix} 2 & -1 \\ 1 & 1 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix}=\begin{bmatrix} 4 \\ -1 \end{bmatrix}$$ 
<br><br><br>

$$\begin{cases}2x-y = -1 \\x+y = 4\end{cases}$$
**$ \color{red}{\Rightarrow} $** $$\begin{cases}x+y = 4 \\2x-y = -1 \end{cases}$$ **$ \color{red}{\Rightarrow} $** $$\begin{cases}2x+2y = 8 \\2x-y = -1 \end{cases}$$ **$ \color{red}{\Rightarrow} $** $$\begin{cases}2x+2y = 8 \\n0-3y = -9 \end{cases}$$
<br>

**$ \color{red}{\Rightarrow} $** $$\begin{cases}x+y = 4 \\\quad\quad y = 3 \end{cases}$$
<br><br><br>

$$\begin{equation}\begin{pmatrix} 2 & -1  & | -1\\ 1 & 1  & |\quad 4\\ \end{pmatrix}  \end{equation} $$
**$ \color{red}{\Rightarrow} $**
$$\begin{equation}\begin{pmatrix} 1 & 1  & |\quad 4\\ 2 & -1  & | -1\\ \end{pmatrix}  \end{equation} $$n**$ \color{red}{\Rightarrow} $** $$\begin{equation}\begin{pmatrix} 2 & 2  & |\quad 8\\ 2 & -1  & | -1\\ \end{pmatrix}  \end{equation} $$ **$ \color{red}{\Rightarrow} $** $$\begin{equation}\begin{pmatrix} 2 & 2  & |\quad 8\\ 0 & -3  & | -9\\ \end{pmatrix}  \end{equation}$$
<br>

**$ \color{red}{\Rightarrow} $** $$\begin{equation}\begin{pmatrix} 1 & 1  & | 4\\ 0 & 1  & | 3\\ \end{pmatrix}  
\end{equation} $$

<br>
우선 행 위치를 변경한 이유는 1번 행의 첫번째 자리에 1이 오면 계산하기 편합니다 <br>
<u>이 문제에서는</u> 1,2열까지 범위로 잡은 것을 **<font color='pink'>계수행렬</font>**(coefficient matrix)이라하고 <br>
1,2,3열 범위를 다 잡은 것을 **<font color='green'>확대행렬</font>**(augmented matrix)이라고 합니다
<br><br><br><br><br>


### **<font color='red'>Rank</font>**
이제 Rank의 개념부터 먼저 보겠습니다. <br>
```
1. 임의의 행렬 A가 있을 때, 이 행렬A의 열들로 생성될 수 있는 벡터 공간의 차원
2. 행렬의 선형 독립성과 차원을 이해하는데 중추적인 역할
```

특성은 아래와 같습니다. <br>
1. rank의 연산은 연립방정식의 성질을 갖고 있습니다. <br>
2. rank연산 - row operation만 가능 
<br><br>

### 📐 **<font color='yellow'>아주 중요</font>**
### 미지수가 n개인 연립일차방정식의 해와 계수(rank)의 관계
```
연립일차방정식의 계수행렬을 A,   확대행렬을 A|B라 하자

미지수(x,y,z 같은 것)의 갯수는 n --> 즉 계수행렬의 계수
```
1) `rankA < rank(A|B)`면 해가 존재하지 않는다 <br>

2) `rankA = rank(A|B) = n` 이면 해가 오직 하나만 존재 <br>

3) `rankA = rank(A|B) < n` 이면 무수히 많은 해를 가짐 <br>
<=> ex) $$R^3$$에서 (0,0,0)이외의 해를 가진다
<br><br>

### <u>💎매우 중요</u>
rankA &nbsp;=&nbsp; coefficient matrix(계수행렬)의 범위에서 확인한 값, <br>
rankA|B &nbsp;=&nbsp; augmented matrix(확대행렬) 범위에서 계산한 값
<br><br><br><br><br>

#### **<font color='red'>Rank 구하는 방법</font>**:
1. 첫번째행의 선도원소는$$\neq 0$$**<font color='red'>,</font>** 그리고 첫번째 열에 위치**<font color='red'>,</font>** 선도원소(pivot) 아래 전부 0 <br>
2. 두번째행의 선도원소도 $$\neq 0$$**<font color='red'>,</font>** 두번째 열에 위치**<font color='red'>,</font>** 선도원소(pivot) 아래 전부 0 <br>
3. 다음행들도 동일 적용 (더이상 못할 때 까지)<br>
4. 최종적으로 각 행들이 전부 0이 아닌 것만 rank의 갯수로 가산
<br><br>

#### **<font color='blue'>Nullity</font>**:
선형 변환에 의해 영벡터로 매핑되는 벡터의 차원입니다 <br>
예를들어 A행렬이 3x3행렬이면 행이 (0,0,0)인 것의 갯수입니다. <br>
row = rank + Nullity<br><br>

#### <u>중요</u>
Nullity를 알려면 Null space(영공간)를 구해야 합니다<br>
AX=0에 대한 예시를 들겠습니다 <br>
아래는 3x5행렬 A입니다<br>

![선형대수·수학 개념 설명: <u>중요</u>](/assets/img/math/LinearAlgebra/part3/null-space-1.png)
![선형대수·수학 개념 설명: <u>중요</u>](/assets/img/math/LinearAlgebra/part3/null-space-2.png)
![선형대수·수학 개념 설명: <u>중요</u>](/assets/img/math/LinearAlgebra/part3/null-space-3.png)
<br><br><br>

Rank와 Nullity 예시로 3개만 들겠습니다
```
예시 1)
```
$$\begin{equation}\begin{pmatrix} -1 & 0 & 5 \\ -3 & 7 & 0 \\0 & 2 & 1 \end{pmatrix}  \end{equation} $$
**$ \color{red}{\Rightarrow} $** $$\ldots$$ **$ \color{red}{\Rightarrow}$**
$$\begin{equation}\begin{pmatrix} -1 & 0 & 5 \\ 0 & 14 & -30 \\0 & 0 & 37\end{pmatrix}  \end{equation} $$
<br>

계산해보면 rank 구하는 방법에 맞게 각 행들의 선도원소 아래는 zero가 되었고, 각 행들이 전부 0인 것은 없네요! <br>
PivotColumn도 2개네요! (=선도 원소아래 zero) <br>
free column은 3번째 열인 1개<br>
**$ \color{red}{\Rightarrow} $** 즉 rank = 3, &nbsp;&nbsp;&nbsp; nullity = 0, &nbsp;&nbsp;&nbsp; row = 3 <br>
![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/stairs.png)<br>
여기서 **<font color='green'>초록색 선</font>**을 보시면 계단모양 같다고 하여 echelon form(사다리꼴 모양)라 합니다
<br><br><br>

```
예시 2)
```
$$\begin{equation}\begin{pmatrix} 1 & 4 & 2 \\ 3 & 1 & -5 \\-2 & 3 & 7 \\-7 & 5 & 19\end{pmatrix} \end{equation} 
$$**$ \color{red}{\Rightarrow} $**
$$\ldots$$ **$ \color{red}{\Rightarrow} $** $$\begin{equation}\begin{pmatrix} 1 & 4 & 2 \\ 0 & -11 & -11 \\0 & 11 & 11 \\0 & 33 & 33\end{pmatrix} \end{equation} $$
**$$ \color{red}{\Rightarrow} $$** $$\begin{equation}\begin{pmatrix} 1 & 4 & 2 \\ 0 & -11 & -11 \\0 & 0 & 0 \\ 0 & 0 & 0\end{pmatrix}  \end{equation} $$
<br>

계산해보면 rank 구하는 방법에 맞게 1, 2행만 선도원소 아래가 zero가 되었고,<br>
3번행부터는 선도원소가 없고 3, 4행은 zero행이네요! <br>
**$ \color{red}{\Rightarrow} $** 즉 rank = 2, &nbsp;&nbsp;&nbsp; nullity = 2, &nbsp;&nbsp;&nbsp; row = 4
<br><br><br>

```
예시 3)
```
일차연립방정식 
$$\begin{equation}\begin{pmatrix} 1 & 2 & 1 & 0 \\ 2 & 5 & 5 & 1 \\-2 & -3 & 0 & 3 \\3 & 4 & -2 & -4\end{pmatrix}  \end{equation} $$
$$\begin{equation}\begin{pmatrix} x_1 \\ x_2 \\x_3 \\x_4\end{pmatrix}  \end{equation} $$ =$$\begin{equation}\begin{pmatrix} 0 \\ 0 \\0 \\1\end{pmatrix} \end{equation} $$
를 만족하는 실수해는? <br><br>

$$(1) 단 하나 존재  \\(2) 무한히 많이 존재   \\(3) 존재 안함   \\(4) 판정 불가$$
<br><br>

<u>정석으로 풀어보면</u> 아래처럼 순서대로 진행됩니다<br>
1행 -> 2, 3, 4열 소거 <br>
2행 -> 3, 4열 소거 <br>
3행 -> 4열 소거 <br>
**$ \color{red}{\Rightarrow} $**
$$\begin{equation}\begin{pmatrix} 1 & 2 & 1 & 0 &|0\\ 0 & 1 & 3 & 1 & |0\\0 & 0 & -1 & 2 & |0\\0 & 0 & 0 & 0 & |1\end{pmatrix}  \end{equation}$$
로 만들어 집니다 <br>
1~4열까지 rankA 구하는 구간 <br>
1~5열까지 rankA|B 구하는 구간
<br><br>

따라서 rankA = 3 &nbsp;&nbsp;&nbsp; rankA|B = 4 <br>
해가 존재하지 않아서 답은 (3)
<br><br><br><br><Br>

# 5. 이벤트문제(2개) + 예제(5개)
## 5-1 row space R(U), &nbsp; column space C(U), &nbsp; null space N(U) 구하기
#### [💎행공간, 열공간 잘 모르겠으면 여기 클릭](https://joonk2.github.io/posts/Orthgonoliy-of-The-Four-Subspaces/)
```
(ง˙∇˙)ว 이벤트 문제 1
(혹시 문제가 끊어져 보이면, 휴대폰을 가로로 돌리시면 보일겁니다!)
```
다음의 기약행 사다리꼴(reduced row-echelon form)행렬 U를 보자 <br>
$$U = \begin{equation}\begin{pmatrix} 1 & 0 & 0 & 2 & 2 \\ 0 & 1 & 0 & -1 & 3 \\0 & 0 & 1 & 4 & -1 \\0 & 0 & 0 & 0 & 0\end{pmatrix}  \end{equation} $$
<br>

(1) <span style="color:red">**row space**</span> R(U) <br>
행 사다리꼴에서 제로행이 아닌 행들은 선형독립으로 마지막 제로행을 제외한 <br>
처음의 3개행들은 선형독립이다. 이들이 U의 행공간 R(U)를생성하고 R(U)의 basis가 된다 <br>
basis of R(U) = 
$$ {(1, 0, 0, 2, 2), (0, 1, 0, -1, 3), (0, 0, 1, 4, -1)}\\dim R(U) = 3$$
<br><br>

(2) <span style="color:blue">**column space**</span> C(U) <br>
행 사다리꼴에서 선행 1(leading 1's)을 포함하는 열들은 선형독립이다 <br>
나머지 4, 5열은 1,2,3 열의 선형결합으로 표현이 가능하다 <br>
그래서 처음 3개의 열벡터들이 U의 열공간 C(U)를 생성하고 이들이 C(U)의 basis
basis of C(U) =
$$\left\{\begin{bmatrix} 1 \\ 0 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 1 \\ 0 \end{bmatrix}\right\}\\dim C(U) = 3$$
<br><br>

(3) <span style="color:pink">**Null space**</span> N(U) <br>
영공간의 차원은 Nullity로 N(U)는 homogeneous equtation U`x` = **0**의 해집합이다 <br>
U가 free variables을 가지니 $$x_4, x_5$$가 무수히 많은 해를 갖는다
<br>
$$\begin{equation}\begin{pmatrix} 1 & 0 & 0 & 2 & 2 \\ 0 & 1 & 0 & -1 & 3 \\0 & 0 & 1 & 4 & -1 \\0 & 0 & 0 & 0 & 0\end{pmatrix}  \end{equation} \begin{pmatrix} x_1 \\ x_2 \\x_3 \\x_4 \\x_5\end{pmatrix} =\begin{pmatrix} 0 \\ 0 \\0 \\0 \\0\end{pmatrix} $$
<br>
$$x_5 = t \\x_4 = s \\x_3 = -4s + t \\x_2 = s-3t \\x_1 = -2s -2t$$
<br>

$$\begin{pmatrix} x_1 \\ x_2 \\x_3 \\x_4 \\x_5\end{pmatrix} =\begin{pmatrix} -2s-2t \\ s-3t \\-4s+t \\s \\t\end{pmatrix} =s\begin{pmatrix} 
-2 \\ 1 \\-4 \\1 \\0\end{pmatrix} +t\begin{pmatrix} -2 \\ -3 \\1 \\0 \\
1\end{pmatrix} =s \vec{n}_s+t \vec{n}_t$$
<br>

U`x`=**0** 의 해가 $$n_s$$와 $$n_t$$의 선형결합으로 나타나기에 $$n_s$$와 $$n_t$$는 N(U)를 생성한다 <br>
또한 {$$n_s$$, $$n_t$$}는 선형독립이기에 N(U)의 basis가 된다 -->
($$n_s$$와 $$n_t$$의 마지막 두 성분을 보면 자명하다) <br>

basis of N(U) = 
$$\left\{ \vec{n}_s, \vec{n}_t \right\}$$ <br>
nullity = dim`N`(U) = 2
<br><br>

### <span style="color:purple">**참고**</span>
- gaussian elimination 수행 전 행렬: A
- 가우스 소거 후 행렬: U <br>
⬆️임의로 위의 상황을 설정 
<br><br>

**$$R(A)=R(U)​$$** <br>
기약 행 사다리꼴 U의 행벡터들 또한 A의 행벡터들의 선형 결합이라 U의 행공간 = A의 행공간
<br><br>

**$N\left(A\right)=N\left(U\right)$** <br>
영공간의 경우 homogeneous system Ax=0과 Ux=0은 같은 해를 갖기 때문에 두 해집합은 같다. <br>
따라서 A의 영공간 N(A)와 U의 영공간 N(U)이 같음은 자명하다.
<br><br>

**$$C(A)≠C(U)$$** <br>
C(A)의 basis를 구하려면 C(U)의 basis를 구하면 안되고, A의 열벡터들 중에서 선형 독립인 것만 추출해야함
<br><br><br><br><br>

## 5-2 dim 응용
```
(ง˙∇˙)ว 이벤트 문제 2
(혹시 문제가 끊어져 보이면, 휴대폰을 가로로 돌리시면 보일겁니다!)
```
---
벡터공간 $$R^4$$의 두 부분공간 V와 W를<br>
$$V = \{(a,b,c,d) \in R^4 \quad | \quad b+c+d = 0 \},$$ <br>
$$W = \{(a,b,c,d) \in R^4 \quad | \quad a+b=0, \quad c=2d \}$$로 정의할 때 <br>
$$dim(V)$$ <span style="color:red">**+**</span> $$dim(W)$$ <span style="color:red">**+**</span> $$dim(V \cap W)$$의 값은?<br>
------------------------------------------------------------------------------------
<br><br><br><br>


먼저 <span style="color:red">**V**</span>와 <span style="color:blue">**W**</span>의 교집합을 찾아줍시다!
$$V \cap W = V = \{(a,b,c,d)  \quad | \quad b+c+d = 0, \quad a+b = 0, \quad c=2d\}$$ <br>
이렇게 총 3가지네요! <br><br>

#### [<span style="color:red">**V**</span>의 기저 찾기]
이제 차원을 구하기 위해 V의 기저부터 찾아봅시다! <br>
V를 보니 a는 혼자서 놀고 있어서 --> (1,0,0,0) <br>
그다음에 b가 1이면 d는 당연히 -1 --> (0,1,0,-1) <br>
그리고 c가 1이면 d는 당연히 -1 --> (0,0,1,-1) <br><br>
따라서 V의 기저는 총 3개로 (1,0,0,0)<span style="color:red">**,**</span> (0,1,0,-1)<span style="color:red">**,**</span> (0,0,1,-1) <br>
**$ \color{red}{\Rightarrow} $** 즉 dim(V) = 3
<br><br>

#### [<span style="color:blue">**W**</span>의 기저 찾기]
W를 보니 a가 1로 고정되면 b는 당연히 -1 그리고 c,d는 따로 놀게! --> (1,-1,0,0)<br>
그 다음에 c가 1이면 d는 당연히 $$\frac{1}{2}$$ --> (0,0,1,$$\frac{1}{2}$$)<br><br>
따라서 W의 기저는 (1,-1,0,0)<span style="color:red">**,**</span> (0,0,1,$$\frac{1}{2}$$)
<br>
**$ \color{blue}{\Rightarrow} $** 즉 2차원이어서 기저는 총2개로 dim(W) = 2
<br><br>

#### [<span style="color:red">**V**</span>$$\cap$$<span style="color:blue">**W**</span>의 기저 찾기]
$$V \cap W$$를 통해 a부터 정하니 복잡하네 그러면 거꾸로 c부터 정해서 보자! <br>
c를 2로 먼저 정하면 d는 1 그럼 b는 -3이네! --> 자동으로 a는 3되네 <br>
**$ \color{green}{\Rightarrow} $** (3,-3,2,1) 즉 기저는 1이라서 2개의 교집합은 1차원이네!<br><br>

따라서 정답은 6
<br><br><br><br><br><br><br>

## 5-3 예제 5개
![선형대수·수학 개념 설명: 5-3 예제 5개](/assets/img/math/LinearAlgebra/part3/j2.jpeg)
<br><br><br>

![선형대수·수학 개념 설명: 5-3 예제 5개](/assets/img/math/LinearAlgebra/part3/19.png)
<br>

![선형대수·수학 개념 설명: 5-3 예제 5개](/assets/img/math/LinearAlgebra/part3/20.png)
<br><br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/21.png)
<br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/22.png)
<br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/23.png)
<br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/24.png)
<br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/25.png)
![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/25-1.png)
<br><br><br><br><br><br><br><br><br><br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/26.png)
<br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/27.png)

<br><br><br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/28.png)
<br>

![수학 개념 설명 다이어그램](/assets/img/math/LinearAlgebra/part3/29.png)
<br><br><br><br><br>


# 자료 출처
1. **[[선형대수학] 3강. 수학적 벡터 (벡터공간)](https://www.youtube.com/watch?v=Q8NkThsTp_g&list=PL127T2Zu76FuVMq1UQnZv9SG-GFIdZfLg&index=23)**
2. [혁펜하임 &nbsp;&nbsp;&nbsp; [선대] 2-6강. span 과 column space (열공간) 직관적 설명](https://www.youtube.com/watch?v=g0eaDeVRdZk)
3. [3Blue1Brown &nbsp;&nbsp;&nbsp; 선형 조합, 범위 및 기저 벡터 2장 선형대수학의 본질](https://www.youtube.com/watch?v=k7RM-ot2NWY)
4. [Wrath of Math &nbsp;&nbsp;&nbsp; Linear Transformations of a Vector (with standard matrix)](https://www.youtube.com/watch?v=L31O-1ngXKE)
5. [[장황수학], &nbsp;&nbsp; 벡터공간 및 부분공간](https://youtu.be/u2HX_h1Y3Zo?si=DrDQpy80EIYDNYgS)
6. [기저 (선형대수학)](https://ko.wikipedia.org/wiki/%EA%B8%B0%EC%A0%80_(%EC%84%A0%ED%98%95%EB%8C%80%EC%88%98%ED%95%99))
7. [R, Python 분석과 프로그래밍의 친구 (by R Friend):티스토리](https://rfriend.tistory.com/163)
8. [[수학채널 쑤튜브] &nbsp;&nbsp;&nbsp;&nbsp; 선형대수학 24강: 선형결합(linear combination)과 생성(span)](https://www.youtube.com/watch?v=TEhZ8HwxULE)
9. [desmos](https://www.desmos.com/3d?lang=ko)
10. [[장황수학] &nbsp; **랭크1**](https://www.youtube.com/watch?v=FUfTJgDi1u0&t=845s)
11. [[장황수학] &nbsp; **랭크의 활용**](https://www.youtube.com/watch?v=a8KFURdP4L8&t=1s)
12. [[Wrath of Math] &nbsp;&nbsp;&nbsp;&nbsp;**Find Null Space and Nullity of a Matrix - Linear Algebra**](https://www.youtube.com/watch?v=iApoNPcI5eI)
13. [[프린키피아] &nbsp;&nbsp;&nbsp;&nbsp; 행공간, 열공간, 영공간(Row, Column and Null](https://m.blog.naver.com/PostView.naver?blogId=qio910&logNo=221559201470&proxyReferer=&noTrackingCode=true)
14. [[공돌이의 수학정리노트]&nbsp;&nbsp; 행렬과 선형변환](https://angeloyeo.github.io/2019/07/15/Matrix_as_Linear_Transformation.html)
