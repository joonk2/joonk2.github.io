---
title: "[선형대수학] 3강. 수학적 벡터 (벡터공간)"
layout: post
categories: [math, LinearAlgebra]
tags: [math, LinearAlgebra]
toc: true
toc_sticky: true
date: 2024-03-09 sat 21:20
updated: 2024-03-19 mon 00:44
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
#### 🙅‍♂️휴대폰으로 볼 때 혹시 글자나 숫자가 화면에 다 안나오면<span style="color:red">**,**</span> 휴대폰 가로로 돌리시면 됩니다


```python
*참고

1. 대수구조
 1-1) 대수구조
 1-2) 여러 대수구조

2. 벡터공간
 2-1) 벡터공간
 2-2) 종류 (norm, 내적, 유클리드)
 2-3) 선형결합(linear combination) & 선형생성(span)
 2-4) 선형독립 & 선형종속
 2-5) 기저
 2-6) 차원

3. 이벤트문제 + 예제(5개)
```

# *참고

시작하기 전 알면 좋은 것

1. 항등원:  
- **덧셈 연산에서 항등원은 0이다:** *a*+0=*a* (모든 *a*에 대해)
- **곱셈 연산에서 항등원은 1이다:** *a*⋅1=*a* (모든 *a*에 대해)

2. 역원
- **덧셈의 경우:** 원소 *a*의 역원을 *a*′라 할 때, *a*+*a*′=0
- **곱셈의 경우:** 원소 *a*의 역원을 *a*′라 할 때, *a*⋅*a*′=1
<br><br><br><br><br> 
    

# 1. 대수구조
- 참고 <br>
우선 대수학부터 알아야 할 것입니다 <br>
대수학 —> 대수구조를 연구하는 학문 <br><br>

## 1-1) 대수구조

간단하게 숫자를 대신한다는 말입니다 <br>
즉 숫자를 대신할 모든 대상으로 하는 집합 + 그 집합에 부여된 연산구조(structure) <br>
ex) 일련의 연산들이 주어진 집합 --> 'x'라는 문자가 1 대신, &nbsp;&nbsp;&nbsp;&nbsp;`ㄱ`이라는 문자가 8**2 대신 가능
즉 우리가 정하기에 따라 어떤 것들도 수학적 대상이 될 수 있습니다

## 1-2) 여러 대수구조
![Desktop View](/assets/img/math/LinearAlgebra/part3/0.jpg)
![Desktop View](/assets/img/math/LinearAlgebra/part3/2.png)

# 2. 벡터공간
## 2-1) 벡터공간
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
![Desktop View](/assets/img/math/LinearAlgebra/part3/3.png)
<br><br><br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/4.png)
<br><br><br><br><br>

## 2-2) 종류 (norm, 내적, 유클리드)
### **(1) Norm 공간**
![Desktop View](/assets/img/math/LinearAlgebra/part3/8.png)
<br><br>

### **(2) 내적공간**
![Desktop View](/assets/img/math/LinearAlgebra/part3/9.png)
![Desktop View](/assets/img/math/LinearAlgebra/part3/10.png)
<br><br>

### **(3) 유클리드 공간**
![Desktop View](/assets/img/math/LinearAlgebra/part3/11.png)
<br><br><br><br><br><br>

## 2-3) 선형결합(linear combination) & 선형생성(span)
### **(1) 선형결합(linear combination)**
벡터 $$V$$가 벡터 $$v_1, v_2 \ldots, v_n$$의 linear combination <br>
#### **<font color='#5ad7b7'>뜻</font>**:
$$V = c_1v_1 + c_2v_2 + \ldots, + c_nv_n$$을 만족하는 <br>
스칼라배가 가능한 실수 $$c_1, c_2 \ldots, c_n$$이 존재한다는 것입니다.<br>
**$ \color{red}{\Rightarrow} $** 쉽게 얘기하면 $$V = c_1v_1 + c_2v_2$$ 이 조건이 맞을 때  $$c_1v_1 + c_2v_2$$는 linear combination입니다

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
<br><br><br><br>

### **(2) 선형생성(span)**
span은 쉽게 말해 집합인데, <br>
벡터들의 선형결합으로 만들 수 있는 모든 벡터들을 모아놓은 집합입니다<br>

<span style="color:red">**ex-1**</span>) &nbsp;&nbsp;
span<font color='red'>{</font>$$ v_1 = cv_1 | c \in |R $$<font color='red'>}</font> <br><br>

벡터 1개짜리 span은 직선이 됩니다 <br>
왜냐하면 벡터 하나로 선형결합 할 수있는 것은<br>
자기자신을 상수배 하는 것만 되기 때문입니다. <br>
**$ \color{red}{\Rightarrow} $** 어차피 벡터 하나에서 계속 상수배 하면 결국 직선이 생성됩니다 <br>
(그걸 `직선의 벡터방정식`이라고 부릅니다) &nbsp;&nbsp;&nbsp;&nbsp; 아래 참고⬇️
![Desktop View](/assets/img/math/LinearAlgebra/part3/vector-equation-of-a-line.png)
<br><br><br><br><br><br>

<span style="color:red">**ex-2**</span>) &nbsp;&nbsp;
span{$$ v_1, v_2 | c \in |R $$} <br><br>
조건은 $$v_1, v_2$$벡터 2개가 평행하지 않을 때이고 그때 평면을 커버합니다<br>
평면은 아래 벡터 2개에 대한 선형결합으로 이루어져 있습니다
![Desktop View](/assets/img/math/LinearAlgebra/part3/2vectors-to-linear-combination.png)
<br><br><br><br><br>

#### **<font color='purple'>span 최종 정리</font>**
span은 벡터들이 생성하는 모든 선형조합으로 이루어진 공간을 나타냅니다. <br>
3차원을 기준으로 직선도 생성할 수 있고, 평면도 생성할 수 있습니다 <br>
따라서 Span$$\{v_1, v_2, \ldots, v_n\}$$이 생성하는 공간을 의미하고 이를 H로  표기할 수 있습니다. <br>

즉 $$H = Span\{v_1, v_2, \ldots v_n\}$$은 벡터들 $$v_1, v_2, \ldots v_n$$에 의해 생성되는 공간으로 이러한 공간은 선형결합을 통해 얻을 수 있는 모든 점의 집합이며, 벡터들이 이루는 subspace(부분벡터공간)입니다
![Desktop View](/assets/img/math/LinearAlgebra/part3/4-1.png) <br><br>

사진에 대해 쉽게 얘기하면 대충 보아하니 이것은 3차원인 $$R^3$$에서 
<br>
u벡터인 $$\begin{bmatrix} -1 \\ 0 \\ 0 \end{bmatrix}$$ 그리고 v벡터인 $$\begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}$$를 span 했습니다.<br>
<u>부분벡터공간인 H</u>는 u,v라는 2개의 기저로 span된 3차원에서의 평면 공간입니다 <br>
W는 한 위치에 해당하는 임의의 점입니다 &nbsp; 
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
![Desktop View](/assets/img/math/LinearAlgebra/part3/12.png)
<br>

쉽게 얘기해서 크림빵이 있는데 떼어냈을 때, 크림이 없는 빵 부분이라면 그냥 빵인데<br>
크림도 같이 묻은 빵이 떼어진다면 크림빵이라 할 수 있습니다. <br>
즉 2번째는 크림빵의 성질을 만족합니다
<br><br><br><br>


## 2-4) 선형독립 & 선형종속
벡터방정식 $$c_1v_1 + c_2v_2 \quad ... \quad + c_nv_n = \vec{0}$$ 에서 <br>
$$c_1, c_2\quad \ldots \quad,  c_n = 0$$ 이라면 <br>
**$ \color{pink}{\Rightarrow} $** 해가 영벡터 뿐, 즉 선형독립 <br><br>
영벡터가 이외의 해가 존재<br>
**$ \color{lightblue}{\Rightarrow} $** 선형종속 <br><br><br><br>

쉽게 보기위해 각 벡터집합인 $$v_1, v_2\quad \ldots \quad,  v_n$$을 전개해보겠습니다 <br>
아래는 선형독립과 종속에 대한 판별법입니다 <br><br>
$$
v_1=\begin{bmatrix} 1 \\ 0 \\ 2 \end{bmatrix}, \quad
v_2=\begin{bmatrix} -1 \\ 1 \\ 2 \end{bmatrix}, \quad
v_3=\begin{bmatrix} -2 \\ 3 \\ 1 \end{bmatrix}, \quad
v_4=\begin{bmatrix} 2 \\ 1 \\ 1 \end{bmatrix}
$$
<br><br>
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
$$
k_1\begin{bmatrix} 1 \\ 0 \end{bmatrix} +
k_2\begin{bmatrix} 0 \\ 1 \end{bmatrix} +
k_3\begin{bmatrix} 1 \\ 1 \end{bmatrix}
= \vec{0}
$$ 
&nbsp;&nbsp; 이라면

<br><br>
$$k_1 = k_2 = 1$$ &nbsp;&nbsp;&nbsp;&nbsp;  $$k_3 = -1$$로 선형종속 입니다

처음부터 차근차근 보겠습니다<br>
우선 &nbsp;
$$v_1, v_2, v_3$$ &nbsp; 만 비교해보겠습니다<br>
$$
c_1v_1 + c_2v_2 + c_3v_3 = \vec{0}
$$
**$ \color{red}{\Rightarrow} $**
$$
c_1, c_2, c_3 = 0
$$
<br><br>

이걸 식으로 고쳐보겠습니다<br>

$$
\begin{bmatrix}
1 & -1 & -2 \\
0 & 1 & 3 \\ 
2 & 2 & 1
\end{bmatrix}
\begin{bmatrix} c_1 \\ c_2 \\ c_3 \end{bmatrix}
= \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}
$$
<br><br>

현재 Ax = 0 형태인데 기약행 사다리꼴형태가 되는지 확인합니다 <br>
<font color='red'>방법1</font>: &nbsp;&nbsp;&nbsp;&nbsp; $$A^-1$$ 을 곱하여 $$I$$인 [(1,0,0)(0,1,0)(0,0,1)]를 확인<br>
<font color='blue'>방법2</font>: &nbsp;&nbsp;&nbsp;&nbsp; 기약행 사다리꼴로 $$I$$가 되는지 확인 <br><br><br>

참고: &nbsp;&nbsp;&nbsp;&nbsp;(행렬 계산할 때는 각 행을 열로 전치시킴) 
<br>
확인해보니 만들 수 있네요! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 아래 참고⬇️
<br><br>

$$
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\ 
0 & 0 & 1
\end{bmatrix}
$$
<br><br>

위 3개 벡터들은 선형독립이니 아래처럼 휘어진 좌표계들로<br>
3차원 전체를 나타낼 수 있습니다
<br>
![Desktop View](/assets/img/math/LinearAlgebra/part3/linear-independant.png)
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
R^3 의 세 벡터 (1, 0, 0), (0, 1, 0), (0, 0, 1)은 선형독립이다
```
![Desktop View](/assets/img/math/LinearAlgebra/part3/7-1.png)
<br><br><br>

```
case 2)
R^3 의 세 벡터 (1, 0, 0), (0, 1, 0), (2, 1, 0)은 선형종속이다
```
![Desktop View](/assets/img/math/LinearAlgebra/part3/7-2.png)
<br><br><br><br><br><br>

## 2-5) 기저
기저(basis)란 특정 벡터 공간 안에서 그 공간을 형성하는 벡터들의 집합<br>

다른 말로 표현하자면, <u>기저</u>는 $$ \quad R^n$$의 임의의 원소를 표현하기 위해 필요한 최소한의 벡터로 이루어진 집합"입니다. <br>

아래는 $$R^2$$을 기준으로 표준기저와 임의의 기저로 만든 **(3,4)**에 대해 확인한 내용입니다.
![Desktop View](/assets/img/math/LinearAlgebra/part3/7-3.png)
<br>
표준기저: &nbsp; $$\{(1,0), (0,1)\}$$ <br>
기저: &nbsp; $$\{(1,1), (0,1)\} \\ \{(1,?), (0,1)\}$$  <br><br>



표준기저로는  $$
\begin{bmatrix} 3 \\ 4 \end{bmatrix}=
3\begin{bmatrix} 1 \\ 0 \end{bmatrix} + 
4\begin{bmatrix} 0 \\ 1 \end{bmatrix}
$$ 
**$ \color{red}{\Rightarrow} $** 좌표: &nbsp; $$\begin{bmatrix} 3 \\ 4 \end{bmatrix}$$  <br><br><br>

기저로는 $$(3,4) = 3(1,1) + 1(0,1)$$ **$ \color{red}{\Rightarrow} $** 좌표: &nbsp; $$\begin{bmatrix} 3 \\ 1 \end{bmatrix}$$ <br><br>

여기 있는 기저들로 &nbsp; (3, 4)를 나타낼 수 있습니다. <br>
즉 여기 있는 $$R^2$$ 차원(그래프)에 있는 원하는 원소(aka 벡터)들을 생성해낼 수 있을 때<br>
우리는 그것들을 `기저`라고 부릅니다

3(1,1) + 1(0,1)


```
🙂기저의 갯수는 정해져있지 않지만, 표준기저는 1개입니다.
```
<br>

#### 잠깐!
아래는 $$R^4$$의 표준기저에 대한 내용입니다.
$$M_{n*n}$$를 2x2 행렬의 표준기저로 봅시다 <br><br>
$$
\left\{
    \begin{pmatrix}
        1 & 0 \\
        0 & 0 
    \end{pmatrix},
    \begin{pmatrix}
        0 & 1 \\
        0 & 0 
    \end{pmatrix},
    \begin{pmatrix}
        0 & 0 \\
        1 & 0 
    \end{pmatrix},
    \begin{pmatrix}
        0 & 0 \\
        0 & 1 
    \end{pmatrix}
\right\}
$$
<br><br>

각 자리는
$$
\begin{pmatrix}
a & b \\
c & d 
\end{pmatrix}
$$을 나타낸 것입니다 <br>

마찬가지로 $$R^4$$에서 어떤 원소든 생성해낼 수 있습니다.<br><br>

마지막으로 개념정리겸 예제 하나 보고 넘어가겠습니다!
```
예제
```
$$R^2$$의 순서기저 $$S = \{(-1,1), (2,0)\}$$에 대한 벡터 $$v=(3,-1)$$의 좌표벡터는?<br>

**sol**:
(-3,1) = -1(-1,1) + 1(2,0) <br>
= (-a+2b, a) <br>
**$ \color{red}{\Rightarrow} $** a = -1, &nbsp;&nbsp; b = 1 <br>
즉 좌표벡터(좌표행렬)는 $$\begin{bmatrix} -1 \\ 1 \end{bmatrix}$$
<br><br><br><br><br>

### <span style="color:purple">**기저가 아닌 경우**</span>: <br>
총 2가지를 예시로 들어보겠습니다 <br><br>

2차원의 임의의 원소를 표현하는데 필요한 최소한의 벡터는 2개인데 반해, 아래의 예는 4개의 벡터로 구성되어 있으므로 군더더기 벡터가 2개나 더 있는 셈입니다.  그러므로 "m차원의 임의의 원소를 표현하기 위해 필요한 최소의 벡터로 이루어진 집합"인 기저(basis)가 아닌 것입니다.
![Desktop View](/assets/img/math/LinearAlgebra/part3/7-4.png)
<br><br><br><br><Br>

3차원의 임의의 원소를 표현하기 위해서 필요한 최소한의 벡터는 3개인데요. 아래의 예는 3개 벡터의 세번째 원소가 모두 '0'으로 되어 있어서 3차원의 세번째 차원을 표현할 방법이 없으므로 기저가 아닌 경우입니다.  <u>기저X, 선형독립O</u>
![Desktop View](/assets/img/math/LinearAlgebra/part3/7-5.png)

<br><br><br>

## 2-6) 차원 (정말 중요!!)
기저는 변할 수 있지만 <u>기저의 갯수는 변하지 않습니다</u>! <br>
차원의 갯수 = 기저 <br>
아까 말했지만 기저는 절대로 $$\vec{0}$$가 될 수 없습니다! <br>
왜? --> 예를들어 $$R^3$$ $$\vec{0}$$가 있다고하면 $$\begin{bmatrix} 0 \\ 0 \\0 \end{bmatrix}$$으로 종속성을 가지기 때문입니다.<br>
즉 기저가 되려면 독립성이 있어야해서 0이 되면 안됩니다
<br><br>

### <span style="color:purple">**차원**</span>: <br>
벡터공간 1개가 n개의 벡터로 이루어진 기저를 갖는다면, V의 차원을 n이라고 한다.<br>
또한 V의 차원을 dim`V`로 표시한다
<br><br>

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

$$(2, 2, 2, 5) = 2(1,1,1,0) + 5(0,1)$$ **$ \color{red}{\Rightarrow} $** 좌표: &nbsp; $$\begin{bmatrix} 2 \\ 5 \end{bmatrix}$$ <br><br><br>

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
$$
W = \begin{cases}
\begin{pmatrix}
x_1 \\
x_2 \\
x_3
\end{pmatrix}
\end{cases}
\in R^3 \quad | \quad x_1 + 2x_3 = 0, \quad x_2 - x_3 = 0 
$$ 
<br><br>
문제를 보니 $$x_1$$이 1이면, &nbsp; $$x_3$$은 $$-\frac{1}{2}$$되고, &nbsp; x_2는 $$\frac{1}{2}$$가 됩니다. <br>
**$ \color{red}{\Rightarrow} $** 즉 기저는 1개로 $$\{(1, -\frac{1}{2},-\frac{1}{2}) \}$$ 가 되어 1차원 입니다



<br><br><br><br>

# 3. 이벤트문제 + 예제(5개)
```
(ง˙∇˙)ว 이벤트 문제
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



<br><br><br>
![Desktop View](/assets/img/math/LinearAlgebra/part3/j2.jpeg)
<br><br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/19.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/20.png)
<br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/21.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/22.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/23.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/24.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/25.png)
![Desktop View](/assets/img/math/LinearAlgebra/part3/25-1.png)
<br><br><br><br><br><br><br><br><br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/26.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/27.png)

<br><br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/28.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/29.png)
<br><br><br><br><br>


# 참고
1. **[[선형대수학] 3강. 수학적 벡터 (벡터공간)](https://www.youtube.com/watch?v=Q8NkThsTp_g&list=PL127T2Zu76FuVMq1UQnZv9SG-GFIdZfLg&index=23)**
2. [[장황수학], &nbsp;&nbsp; 벡터공간 및 부분공간](https://youtu.be/u2HX_h1Y3Zo?si=DrDQpy80EIYDNYgS)
3. [기저 (선형대수학)](https://ko.wikipedia.org/wiki/%EA%B8%B0%EC%A0%80_(%EC%84%A0%ED%98%95%EB%8C%80%EC%88%98%ED%95%99))
4. [R, Python 분석과 프로그래밍의 친구 (by R Friend):티스토리](https://rfriend.tistory.com/163)
5. [[수학채널 쑤튜브] &nbsp;&nbsp;&nbsp;&nbsp; 선형대수학 24강: 선형결합(linear combination)과 생성(span)](https://www.youtube.com/watch?v=TEhZ8HwxULE)
6. [desmos](https://www.desmos.com/3d?lang=ko)