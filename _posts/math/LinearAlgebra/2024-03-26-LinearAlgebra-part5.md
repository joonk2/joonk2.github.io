---
title: "[선형대수학] 5강. 고윳값과 대각화"
layout: post
categories: [math, LinearAlgebra]
tags: [math, LinearAlgebra, EigenValue, kaley-hammilton, diagonalization of a matrix]
toc: true
toc_sticky: true
date: 2024-03-26 tue 10:40
updated: 
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

```xml
0. 들어가며

1. 고윳값과 벡터
 1-1) 정의
 1-2) characteristic equation(고유방정식)
 1-3) 고유공간

2. 대각화
 2-1) 대각화 정의  
 2-2) 중복도  
 2-3) 닮음 불변량

3. 케일리-해밀턴 정리

4. 연습문제 (2개)
```

# 0. 들어가며
이번 글에서의 주요 내용인 행렬을 고윳값과 고유벡터로 분해하는 과정인 Eigenvalue Decomposition(고윳값 분해)에 대해 알아볼 것 입니다
<br>
그리고 Eigenvalue Decomposition 작용 이후에 대각화 행렬이 되는지도 알아볼 것입니다.
<br><br><br>

# 1. 고윳값과 벡터
## 1-1 정의)
체 F에 대한 벡터공간 V 위의 선형사상 
$$
L: V \rightarrow V
$$
에 대하여 다음 두 조건 <br>

**1)** &nbsp;&nbsp;
$$
v \neq \vec{0}
$$
&nbsp;&nbsp;&nbsp; 

**2)** &nbsp;&nbsp;
$$
L(v) = \gamma v
$$
<br>
을 만족하는 <br>
$$
\gamma \in F
$$
와 
$$
v \in V
$$ 를 각각 ***고윳값***과 ***고유벡터***라고 합니다.
<br><br>

### 위 내용 설명:
Eigen value(고윳값), Eigen vector(벡터) <br>
행렬의 고유값은 곧 선형사상의 고유값이라는 뜻과 같습니다
<br>

### **<font color='red'>조건</font>**:
`a`. 고유벡터는 0벡터이면 안됩니다 <br>
`b`. v를 선형사상한 결과 = 람다(스칼라)*벡터 <br>
(쉽게 말해 선형사상 `람다`라는 값으로 요약할 수 있습니다)
<br><br><br>

그리고 **2)** 는  
$$
L(v) = Mv =  \gamma v
$$
이렇게 행렬M과 벡터v를 곱한 것으로 표현할 수도 있습니다.
<br>
아래에 예시를 들겠습니다. <br> <br>

(2,3) 이라는 v벡터 1개랑 <u>선형사상을 표현하는 행렬M</u>을 하나 만듭니다 <br>
그러면 L(v)에 행렬M과 벡터v를 곱한 것으로 대응되는 계산식을 만들 수 있습니다 
<br>
$$
v = (2, 3), \quad L \Leftrightarrow M =  \begin{pmatrix}    1 & -2 \\ 3 & 4    \end{pmatrix} 
$$
<br><br>

$$
L(v) \Leftrightarrow  Mv = \begin{pmatrix}    1 & -2 \\ 3 & 4    \end{pmatrix} \begin{pmatrix} 2 \\ 3\end{pmatrix} = \begin{pmatrix} -4 \\ -6\end{pmatrix} = -2 \begin{pmatrix} 2 \\ 3\end{pmatrix}
$$
<br><br>

이 식을 보면 -2가 
$$
\gamma
$$
역할입니다 <br><br><br><br>

## 1-2) characteristic equation(고유방정식)
nxn 행렬 M에 대해 
$$
\gamma
$$
가 M의 고윳값이기 위한 필요충분조건은 다음 방정식인
$$
det(\gamma I_n - M)
$$
을 만족합니다. 이 방정식을 고유방정식이라 하며, 좌변의 식을 고유다항식이라 합니다. <br>
(단, 
$$
I_n
$$
은 nxn 단위행렬) <br><br>

### <span style="color:red">**설명**</span>
! 참고:  &nbsp;&nbsp; (
$$
\gamma
$$
는 행렬이 아님!, <u>스칼라</u>다!) <br>

$$
Mv = \gamma v \Leftrightarrow0(영행렬)
$$ 
<br>
$$
\Leftrightarrow \gamma I_nv - Mv = 0 \\ \Leftrightarrow(\gamma I_n -M)v = 0
$$
<br><br><br>

### <u>만약에</u>
$$
det(\gamma I_n -M) \neq 0
$$
일 경우 
$$
\gamma I_n -M
$$
이 역행렬이 존재하여 
$$
(\gamma I_n -M)v = 0
$$
<br>
으로부터 v=0이 유도되어 모순입니다
<br>

즉 **$ \color{red}{\Rightarrow} $**
$$
det( \gamma I_n - M) = 0
$$
<br><br><br>

아래 예시 2개를 통해 characteristic equation이 만족하는지 확인합시다! <br>
### **<font color='red'>ex-1)</font>**
$$
M =   \begin{pmatrix}    1 & -2 \\   3 & -4    \end{pmatrix}, \quad \gamma=-2  
$$
&nbsp;&nbsp;에 대해 <br><br>

$$
det(\gamma I_n - M) = det\left(-2 \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} - \begin{pmatrix} 1 & -2 \\ 3 & -4 \end{pmatrix}\right) = det\begin{pmatrix} -3 & 2 \\ -3 & 2 \end{pmatrix} = -6+6 = 0
$$
<br><br><br>

### **<font color='red'>ex-2)</font>**
$$
M =   \begin{pmatrix}    1 & -2 \\   3 & -4    \end{pmatrix}
$$
&nbsp; 의 고윳값 찾기 <br><br>

$$
det(\gamma I_n - M) = det\left( \begin{pmatrix} \gamma & 0 \\ 0 & \gamma \end{pmatrix} - \begin{pmatrix} 1 & -2 \\ 3 & -4 \end{pmatrix}\right) = det\begin{pmatrix} \gamma-1 & 2 \\ -3 & \gamma+4 \end{pmatrix} = 0 \\ =\gamma^2 + 3\gamma -4 +6 = \gamma^2 + 3\gamma+2 = (\gamma+2)(\gamma+1) = 0
$$
<br>
그러므로 
$$
\gamma = -2, \quad -1
$$
<br>

즉 이렇게 Eigen value characteristic equation을 통해 찾을 수 있습니다
<br><br><br><br><br>

## 1-3) 고유공간
characteristic equatation을 통해 Eigen value를 찾을 수 있었다면, <br>
Eigen vector는 고유공간에서 찾을 수 있습니다. <br><br>

고유공간: <br>
선형사상 
$$
\gamma I_v - L
$$
의 핵(ker)을 고윳값 
$$
\gamma
$$
의 고유공간이라 한다. &nbsp;&nbsp; (단,
$$
I_v
$$
는 항등사상) <br>
따라서 고유공간의 영벡터가 아닌 벡터는 **<font color='red'>고유벡터</font>** 다
<br>

또한 
$$
L
$$
의 고유벡터들로 구성된 V의 기저를 선형사상 
$$
L
$$
의 **<font color='green'>고유기저</font>**라 한다.
<br>
$$
L(v) = \gamma v 
\\ \Leftrightarrow L(v) = \gamma I_v(v) \\ 
\Leftrightarrow \gamma I_v(v) -L(v) = \vec{0} \\ \Leftrightarrow (\gamma I_v-L)(v) = \vec{0} 
$$
<br>
**$ \color{red}{\Rightarrow} $** 즉 
$$
ker(\gamma I_v -L)
$$

```xml
[매우 중요!] --> 4번째 수식을 보고 알 수 있는 것

1. 고유공간이 곧 고유벡터인 v
2. 선형사상의 결과가 0벡터가 되게하는 그때의 v를 찾는게 선형사상의 핵(ker)을 찾는 것입니다
```
<br>

### **<font color='red'>행렬버젼</font>**
$$
(\gamma I_n - M)v = 0(영행렬)
$$
<br>
여기서 곧 v의 해공간이자 영공간인
$$
(\gamma I_n -M)
$$
이 곧 고유공간인  
$$
ker(\gamma I_v -L)
$$
가 됩니다 <br><br>

### **<font color='red'>ex)</font>**
$$
M =   \begin{pmatrix}    1 & -2 \\   3 & -4    \end{pmatrix}, \quad \gamma=-1  
$$
일 때, 이것 참고 —> 
$$
(\gamma I_n - M)v = 0
$$
<br>

즉 풀이를 하면 이렇게 됩니다 <br>
$$
\Leftrightarrow \left( -1\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} - \begin{pmatrix} 1 & -2 \\ 3 & -4 \end{pmatrix}\right)*\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = 0(영행렬)
$$
<br>
$$
\Leftrightarrow \begin{pmatrix} -2 & 2 \\ -3 & 3 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} \\ 
$$
$$
\Leftrightarrow \begin{pmatrix} -2 & 2 & 0\\ -3 & 3 & 0\end{pmatrix}
$$
**$$ \color{red}{\Rightarrow} $$**
$$
\begin{pmatrix} 1 & -1 & 0\\ 0 & 0 & 0\end{pmatrix}
$$
<br> 

여기서 
$$
v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad v_2 = \begin{pmatrix} -1 \\ 0 \end{pmatrix}
$$
&nbsp;&nbsp; 인데 행렬에서 방정식으로 되돌려보면<br>
$$
v_1 + v_2 = \vec{0} \\ \Leftrightarrow v_1 - v_2 = \vec{0} \\ \Leftrightarrow v_1 = v_2
$$
<br>
가 되기에, 따라서 
$$
v_1, v_2
$$
를 특정할 수 없으므로 아래처럼 s로 매개변수(free variables)화를 해줍니다 <br><br>

$$
\begin{cases} v_1 = s \\ v_2 = s\end{cases} \quad \rightarrow \quad v = s\begin{pmatrix} 1 \\ 1\end{pmatrix}
$$
<br>
즉 (1,1)은 -1에 대응하는 고유기저고 여기에 s배를 해주면, 무수히 많은 벡터가 만들어지는데<br>
그게 전부다 고유벡터의 후보군입니다 <br>
그러므로 고유벡터 = (s,s) &nbsp;&nbsp;
$$
s \neq 0
$$
<br>

s가 1일 때 v=(1,1)이 되고 위에 있는 예시를 참고하면  &nbsp;
$$
Mv = \gamma v
$$
&nbsp; 증명 가능합니다
<br><br><br><br>


마지막 예시로 3x3행렬 보겠습니다.<br>

$$
M = \begin{pmatrix} 0 & 0 & -2 \\ 1 & 2 & 1 \\ 1 & 0 & 3\end{pmatrix}
$$
&nbsp; 의 고윳값, 고유벡터 고유기저 구하기
<br><br>

**<font color='red'>step 1</font>** &nbsp;&nbsp; 고윳값 구하기 <br>
(고유방정식부터 구합시다.) <br>

$$
det( \gamma I_3 - M) \\ \Leftrightarrow det\begin{pmatrix} \gamma & 0 & 2 \\ -1 & \gamma - 2 & -1 \\ -1 & 0 & \gamma -3 \end{pmatrix} \\ \Leftrightarrow det = \gamma \begin{vmatrix}
\gamma-2 & -1 \\ 
0 & \gamma-3 \\ 
\end{vmatrix} - 0 \begin{vmatrix}
-1 & -1 \\ 
-1 & \gamma-3 \\ 
\end{vmatrix} + 2 \begin{vmatrix}
-1 & \gamma-2 \\ 
-1 & 0 \\ 
\end{vmatrix} \\ \Leftrightarrow\gamma(\gamma^2-5\gamma+6) + 2(\gamma-2) = 0 \\ \Leftrightarrow(\gamma-1)(\gamma-2)^2 = 0
$$
<br><br>

즉 고유값: &nbsp;&nbsp; 
$$
\gamma
$$
= 1 or 2 
<br><br><br>

**<font color='red'>step 2</font>**고유벡터 구하기
<br>

case 1) 
$$
\gamma = 1
$$
<br><br>

$$
(\gamma I_3 - M)v = 0 \\ \Leftrightarrow \begin{pmatrix} 1 & 0 & 2 \\ -1 & -1 & -1 \\ -1 & 0 & -2 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3\end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}
$$

$$
\Leftrightarrow \begin{pmatrix} 1 & 0 & 2 & 0\\ -1 & -1 & -1 & 0\\ -1 & 0 & -2 & 0\end{pmatrix}
$$
**$ \color{red}{\Rightarrow} $**
$$
\begin{pmatrix} 1 & 0 & 2 & 0\\ 0 & -1 & 1 & 0\\ 0 & 0 & 0 & 0\end{pmatrix}
$$
**$ \color{red}{\Rightarrow} $**
$$
\begin{pmatrix} 1 & 0 & 2 & 0\\ 0 & 1 & -1 & 0\\ 0 & 0 & 0 & 0\end{pmatrix}
$$
<br>

여기에 
$$
v_1, v_2, v_3
$$
을 곱하고 
$$
v_3
$$
을 S로 둔다면 Eigen value의 해는 이렇게 나올겁니다. <br>

$$
\begin{cases} v_3 = s \\ v_2 = s \\ v_1 = -2s \end{cases} \quad \rightarrow \quad 즉 \quad v = s\begin{pmatrix} -2 \\ 1 \\ 1\end{pmatrix}
$$
<br><br>
그러므로  $$\gamma =1 \quad 일 때$$ 
<br>

고유벡터 = 
$$
(-2s, s, s) \quad s \neq0
$$
<br>
고유기저 = 
$$
\{(-2,1,1)\}
$$
<br><br><br><br>

case 2)
$$
\gamma = 2
$$
<br><br>
$$
(2I_3 - M)v = 0 \\ \Leftrightarrow \begin{pmatrix} 2 & 0 & 2 \\ -1 & 0 & -1 \\ -1 & 0 & -1 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \\ v_3\end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} \\ \Leftrightarrow \begin{pmatrix} 1 & 0 & 1  & |0\\ 0 & 0 & 0 & |0 \\ 0 & 0 & 0 & |0\end{pmatrix} 
$$
<br>
$$
v_2 = \begin{pmatrix} 0 \\ 0 \\ 0  \end{pmatrix} = t \quad\quad v_3 = \begin{pmatrix} 1 \\ 0 \\ 0  \end{pmatrix}= r \quad\quad v_1 = \begin{pmatrix} 1 \\ 0 \\ 0  \end{pmatrix} = -r \\ 즉, \quad v = t \begin{pmatrix} 0 \\ 1\\ 0  \end{pmatrix} + r \begin{pmatrix} -1 \\ 0 \\ 1  \end{pmatrix}
$$

```latex
v_2가 영행렬이라 먼저 free variables로 t를 설정해주고 나머지를 r로 구합니다
어차피 해공간은 0이 나와야 합니다
v_3과 v_1는 같은벡터로 중복을 제거할겸 v_3 + v+1 = 0을 통해 합쳐주고
즉 free variables 2개를 사용하여 v의 해공간은 위와 같이 나옵니다
```

### [free variables에 대해 잘 모르겠으면 클릭 —> ✍](https://joonk2.github.io/posts/LinearAlgebra-part4/#중요)
그러므로 
$$
\gamma = 2
$$
&nbsp;&nbsp;&nbsp; 일때는 <br>
고유벡터: &nbsp;&nbsp; (-r, t, r) <br>
고유기저: &nbsp;&nbsp; {(0,1,0)**<span style="color:red">,</span>** (-1,0,1)}
<br><br>

#### **<span style="color:red">결론</span>**: 

즉 이 3x3행렬 
$$
M = \begin{pmatrix} 0 & 0 & -2 \\ 1 & 2 & 1 \\ 1 & 0 & 3\end{pmatrix}
$$
에 대해 <br>

$$
\gamma(고유값) = 1
$$
&nbsp; 일때는 <br>
고유기저가 원소 1개인 {(-2,1,1)} <br><br>
$$
\gamma(고유값) = 2
$$
&nbsp; 일때는 <br>
고유기저가 원소 2개인 {(0,1,0)**<span style="color:red">,</span>** (-1,0,1)} 
<br><br><br><br>

# 2. 대각화
```latex
*잠깐! 대각행렬이란?
--> 대각성분들 외에 나머지 원소 전부 0
```
## 2-1) 대각화 정의
Diagonalization 라고 하며 <br>
두 정사각행렬 A, B에 대하여 방정식
$$
B = P^{-1}AP
$$
&nbsp; 를 만족하는 대각행렬 B와 가역행렬 P가 존재하면, <br>
행렬 A는 **<span style="color:red">대각화 가능 행렬</span>**이라고 한다. <br>
또한 이 경우 행렬 P는 A를 **<span style="color:blue">대각화 한다</span>**고 한다. <br>

특징: <br>
하나의 선형사상을 대각화를 통해 여러개의 선형사상으로 분해 가능
<br><br>

### ex)
$$
A = \begin{pmatrix} 1 & -2  \\ 3 & -4 \end{pmatrix}, \quad P = \begin{pmatrix} 1 & 2  \\ 1 & 3 \end{pmatrix}
$$
&nbsp;&nbsp; 이라 하자 <br><br>

[역행렬 공식이 기억안난다면 여기 클릭🪅](https://joonk2.github.io/posts/LinearAlgebra-part1/#%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%A0%95%EB%A6%AC:~:text=%EC%9E%A0%EA%B9%90!-,%EC%97%AD%ED%96%89%EB%A0%AC%20%EA%B3%B5%EC%8B%9D,-A) <br><br>

$$
P^{-1} = \frac{1}{3-2} \begin{pmatrix} 3 & -2  \\ -1 & 1 \end{pmatrix} \\  P^{-1} AP = \begin{pmatrix} 3 & -2  \\ -1 & 1 \end{pmatrix} \begin{pmatrix} 1 & -2  \\ 3 & -4 \end{pmatrix} \begin{pmatrix} 1 & 2  \\ 1 & 3 \end{pmatrix} \\ = \begin{pmatrix} -3 & 2  \\ 2 & -2 \end{pmatrix} \begin{pmatrix} 1 & 2  \\ 1 & 3 \end{pmatrix} \\ = \begin{pmatrix} -1 & 0  \\ 0 & -2 \end{pmatrix} = B
$$
<br><br>

$$
\begin{pmatrix} -1 & 0  \\ 0 & -2 \end{pmatrix} = B
$$
출력 결과 보면 `대각행렬`이란 것을 알 수 있습니다. <br>
딱 대각성분 빼고 나머지 원소 전부 0입니다
<br><br><br>

### 🏌️‍♂️대각화하는 방법
🕵️‍♂️잠깐 정지! --> 특징
```latex
n x n 행렬 A에 대하여 다음 두 명제는 동치이다

1) A는 대각화 가능 행렬이다
2) A는 n개의 선형독립인 고유벡터를 갖는다
```
<br><br>

n x n 행렬 A에 대하여 <br>
**<span style="color:red">step 1</span>** <br>
n개의 선형독립인 고유벡터를 찾아 대각화 가능 행렬인지 확인한다 <br>
(반드시 n개일 것!) <br><br>

**<span style="color:red">step 2</span>** <br>
n개의 고유벡터 
$$
v_1, ..., v_n
$$
&nbsp; 로부터 행렬 <br>
$$
P = (v_1v_2...v_n)
$$
&nbsp; 을 만든다 <br>
(
$$
v_1,v_2...v_n
$$
각각의 벡터들을 열벡터로 나열하여 정사각행렬인 P를 꾸며줌
) <br><br>

**<span style="color:red">step 3</span>** <br>
$$
P^{-1} AP
$$
&nbsp; 는 대각화 행렬이 된다 <br>
(P = A를 대각화해주는 행렬)
<br><br><br>

### **<span style="color:purple">예시 ㄱ) 대각화 불가능 사례 **</span> <br>**
$$
A = \begin{pmatrix} 2 & 1  \\ 0 & 2 \end{pmatrix}
$$
&nbsp; 는 대각화 가능한가?
<br>

*위의 행렬 A가 대각화가 가능하려면 선형독립인 고유벡터가 2개가 나와야함
<br>

### 1️⃣고윳값 구하기
고유방정식 **$ \color{red}{\Rightarrow} $**
$$
det(\gamma I_2 - A)= det \begin{pmatrix} \gamma-2 & -1  \\ 0 & \gamma-2 \end{pmatrix} = (\gamma-2)^2 = 0 \\ \Leftrightarrow \gamma =2(중근)
$$
<br>

### 2️⃣고유벡터 구하기
$$
(2I_2 - A)v = 0 \\ \Leftrightarrow \begin{pmatrix} 0 & -1  \\ 0 & 0 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$
<br>

여기서 v는 free variables인 `s` 하나 잡고 (1,0)을 하던 (-1,0)을 하던 상관없는데, <br>
(1,0)으로 선택하겠습니다.
<br><br>

**$ \color{red}{\Rightarrow} $** 즉 
$$
v = s\begin{pmatrix} 1 \\ 0 \end{pmatrix}
$$
&nbsp; 으로 대각화 불가능 <br>
왜? —> 고유기저 = {(1,0)}  &nbsp; 1개라서 안된다! <br>
왜냐하면 선형독립인게 2개가 잡히려면 고유기저가 2개가 필요 <br>
(행렬의 n x n)에서 행 or 열갯수랑 매치될 것 
<br><br><br>

### **<span style="color:green">예시 ㄴ) 대각화 가능 사례</span>**
아까 위의 내용을 토대로 &nbsp;&nbsp;
$$
A = \begin{pmatrix} 1 & -2  \\ 3 & -4 \end{pmatrix}
$$
&nbsp; 에 대한 P 찾기 <br><br>

이건 된다 왜냐하면
$$
\gamma(고윳값) =-1  
$$
&nbsp; 일 때, <br>
$$
\rightarrow 고유벡터 (s,s)
$$
<br>
$$
\rightarrow P_1\begin{pmatrix} 1 \\ 1 \end{pmatrix}
$$
&nbsp; 일 때,
$$
\rightarrow 고유벡터 (2t,3t)
$$
<br><br><br>

$$
\gamma(고윳값) = -2 
$$
&nbsp; 일 때 <br>
$$
\rightarrow P_2\begin{pmatrix} 2 \\ 3 \end{pmatrix}
$$
<br><br>

즉 
$$
P = P_1 P_2 = \begin{pmatrix} 1 & 2 \\ 1 & 3 \end{pmatrix} \\ P^{-1} = \begin{pmatrix} 3 & -2 \\ -1 & 1 \end{pmatrix} \\ P^{-1} A P = B
$$
<br><br>

<u>참!</u> &nbsp; 
$$
P_2 P_1
$$
&nbsp; 로 위치를 바꿔 열벡터들을 나열하여 계산해도 대각화가 됩니다!
<br><br><br><br><br>

## 2-2) 중복도
대각화가 가능한지 판별하는 또 다른 방법입니다<br>
`기하적 중복도`, `대수적 중복도`를 비교하여 구할 수 있습니다 <br>
일단 요약하면 `기하적 중복도 = 대수적 중복도` &nbsp; 일 때, 행렬의 대각화가 가능 합니다 <br><br>

**기하적 중복도**: <br>
고유값에 대응하는 고유공간의 차원 갯수
<br><br>

**대수적중복도**: <br>
고유 다항식에서 
$$
\gamma-\gamma_0
$$
가 인수로 나타나는 횟수 <br>
(대수적으로 고유값이 총 몇 거듭제곱인지?) <br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part5/1.png)

### [👉고유벡터, 고유기저를 잘 모르겠다면 이것 클릭](https://joonk2.github.io/posts/LinearAlgebra-part5/#:~:text=1%20or%202-,step%202%EA%B3%A0%EC%9C%A0%EB%B2%A1%ED%84%B0%20%EA%B5%AC%ED%95%98%EA%B8%B0,-case%201)

<br><br><br><br>

## 2-3) 닮음 불변량
두 정사각행렬 A, B에 대하여
$$
B = P^{-1}AP
$$
&nbsp; 를 만족하는 가역행렬 P가 존재하면 <br>
A, B는 서로 `닮은 행렬`이라 하고, 기호로 `A~B`라 표현한다.
<br><br>

서로 닮은 두 행렬의 다음과 같은 성질들은 서로 일치한다. <br>
그 중에 일단 10개만 보겠습니다 <br>
```latex
(1) 행렬식
(2) 가역성 
(3) rank 
(4) nullity 
(5) 고유다항식(고유방정식의 좌변을 얘기함) 
(6) 고윳값 
(7) 고유공간의 차원 
(8) 대각성분들의 합 
(9) 대수적 중복도 
(10) 기하적 중복도 
```
서로 닮아 보이더라도, 선형사상들은 일반적으로 파악하기가 복잡한데 <br>
상당히 많은 선형사상들이 이 특성들 중 최소 한개라도 따를 확률이 높으니 <br>
선형사상들을 분해하여 간소화된 선형사상들에게서<br>
저 특성들 중 최소 1개 이상을 찾을 수 있습니다 <br>
(즉 복잡하게 말고 쉽게쉽게 보자는 얘깁니다)
<br><br><br><br>

# 3. 케일리-해밀턴 정리
임의의 정사각행렬 A과 그 고유다항식 <br>
$$
f(\gamma) = det(\gamma I - A) = \sum\limits_{i=0}^n a_i\gamma^2
$$
&nbsp;&nbsp;
에 대하여 

$$
f(A) = 0
$$
이 성립하며, 이를 `캐일리-해밀턴 정리` 라고 한다. &nbsp;&nbsp; (단, 0은 영행렬)
```latex
쉽게 말하면 람다자리에 A행렬을 넣었더니 영행렬이 나오더라
```
<br><br><br>

이 글에서는 예시 2가지를 작성합니다
### **<span style="color:red">ex-1)</span>** <br>

$$
A = \begin{pmatrix} 1 & -2 \\ 3 & -4 \end{pmatrix} \\ f(\gamma) = det(\gamma I_2 - A) \\ = det \begin{pmatrix} \gamma-1 & 2 \\ -3 & \gamma+4 \end{pmatrix}
$$
<br><br>

그러면 
$$
\gamma
$$
(고유값)는 아래와 같이 나옵니다 <br>
$$
= \gamma^2 + 3\gamma + 2
$$

<br>
이걸 아래처럼 고칠 수도 있습니다 <br>
$$
= a_2\gamma^2 + a_1\gamma^1 + a_0\gamma^0
$$
<br><br>

여기서 A행렬을 대입하면 다음과 같습니다 <br>
$$
f(A) = A^2 + 3A + 2I = 0 \quad 성립하는가?
$$
<br><br>

$$
f(A) = \begin{pmatrix} 1 & -2 \\ 3 & -4 \end{pmatrix}^2 + 3\begin{pmatrix} 1 & -2 \\ 3 & -4 \end{pmatrix}^1 + 2\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \\ \\ \Leftrightarrow \begin{pmatrix} -5 & 6 \\ -9 & 10 \end{pmatrix} + \begin{pmatrix} 3 & -6 \\ 9 & -12 \end{pmatrix}+ \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix} = 0
$$
<br><br><br>

### **<span style="color:red">ex-2)</span> <br>**
행렬 &nbsp;
$$
A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
$$
에 대하여 

$$
A^3
$$
&nbsp; 를 `케일리 해밀턴 정리`를 이용해 A와 단위행렬 
$$
I_2
$$
로써 표현하시오.
<br><br>

### **<span style="color:red">풀이</span>**:
$$
A^3
$$
를 이용하는 것보단, <br>
$$
A^2
$$
를 이용하는게 푸는데 더 쉬울 수도 있습니다. <br><br>

$$
f(\gamma) = det(\gamma I_2 - A) = det \begin{pmatrix} \gamma-1 & -2 \\ -3 & \gamma-4 \end{pmatrix} = \gamma^2 -5\gamma-2 \\ \rightarrow f(A) = A^2 -5A -2I_2 =0 \quad 성립하는가?
$$
<br><br>

$$
\rightarrow f(A) = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} - 5\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} - 2\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix} = 0
$$
<br><br>

이를 통해 
**$$
A^2 = 5A+2I
$$**
&nbsp; 라는 것을 확인할 수 있습니다<br>
그러면 이어서 마저 계산해봅시다 <br>

$$
A^3 = 5A^2 + 2A \\ \Leftrightarrow  A^3 = 5(5A + 2I_2) + 2I_2 \\ \Leftrightarrow  A^3 = 27A + 12I_2
$$
<br><br><br><br><br>

# 4. 연습문제 (2개)
## 4-1) 예제1
행렬 
$$
A = \begin{pmatrix} 0 & -3 & -3 \\ 1 & 4 & 1 \\ -1 & -1 & 2\end{pmatrix}
$$
&nbsp; 에 대해 다음 물음에 답하시오. <br>

(1) &nbsp; A를 대각화하는 행렬 P를 구하고, <br>
대각행렬 &nbsp; 
$$
B = P^{-1}AP
$$
를 구하시오 <br>

(2) &nbsp; 두행렬 A, B에 대해 본문에 제시된 10가지 닮음 불변량을 각각 확인하시오
[🎨여기 클릭해서 확인](https://joonk2.github.io/posts/LinearAlgebra-part5/#:~:text=%EC%84%B1%EC%A7%88%EB%93%A4%EC%9D%80%20%EC%84%9C%EB%A1%9C%20%EC%9D%BC%EC%B9%98%ED%95%9C%EB%8B%A4.-,%EA%B7%B8%20%EC%A4%91%EC%97%90%20%EC%9D%BC%EB%8B%A8%2010%EA%B0%9C%EB%A7%8C%20%EB%B3%B4%EA%B2%A0%EC%8A%B5%EB%8B%88%EB%8B%A4,-1%0A2%0A3) <br><br><br><br>

### <span style="color:orange">풀이</span>
#### **<span style="color:blue">(1)-ㄱ 고윳값 구하기</span>** <br>
$$
det(\gamma I_3 -A) \\ =det \begin{pmatrix} \gamma & 3 & 3 \\ -1 & \gamma-4 & -1 \\ 1 & 1 & \gamma-2\end{pmatrix} \\ \Leftrightarrow det = \gamma \begin{vmatrix}
\gamma-4 & -1 \\ 
1 & \gamma-2 \\ 
\end{vmatrix} - 3 \begin{vmatrix}
-1 & -1 \\ 
1 & \gamma-2 \\ 
\end{vmatrix} + 3 \begin{vmatrix}
-1 & \gamma-4 \\ 
1 & 1 \\ 
\end{vmatrix} \\ \Leftrightarrow \gamma(\gamma-3)^2= 0 \\ \rightarrow \gamma = 0 \quad or \quad 3
$$
<br>

즉 Eigenvalue
$$
(\gamma) = 0 \quad or \quad 3 
$$
<br><br><br>

#### **<span style="color:blue">(1)-ㄴ</span>**
$$
\gamma =0
$$
&nbsp; 일 때 <br><br>

$$
\begin{pmatrix} 0 & 3 & 3 & |0 \\ -1 & -4 & -1 & |0 \\ 1 & 1 & -2 & |0 \end{pmatrix} \\ \Leftrightarrow \begin{pmatrix} 1 & 1 & -2 & 0 \\ 0 & -3 & -3 & 0 \\ 0 & 3 & 3 & 0 \end{pmatrix} \\ \Leftrightarrow \begin{pmatrix} 1 & 0 & -3 & 0 \\ 0 & 1 & 1 & 0 \\ 0 & 0 & 0 & 0 \end{pmatrix}
$$
<br>

u로 행렬방정식을 나타내보겠습니다. &nbsp;&nbsp;&nbsp;
$$
u_1 -3u_3 = 0 \\ u_2 + u_3 = 0
$$
<br>

$$
u_3
$$
를 매개변수인 t로 표현하니 나머지 <br>
$$
u_1, u_2
$$
도 표현이 가능하더라 <br>

그러므로
$$
u = t \begin{vmatrix} 3 \\ -1 \\ 1\end{vmatrix}
$$
<br>

즉 
$$
\gamma =0
$$
일 때 고유벡터인 u의 성분은 

$$
\begin{vmatrix} 3t \\ -t \\ t \end{vmatrix}
$$
가 되더라
<br><br><br>

#### **<span style="color:blue">(1)-ㄷ</span>**
$$
\gamma = 3
$$
&nbsp; 일 때 <br><br>

$$
\begin{pmatrix} 3 & 3 & 3 & |0 \\ -1 & -1 & -1 & |0 \\ 1 & 1 & 1 & |0 \end{pmatrix} \\ \Leftrightarrow \begin{pmatrix} 1 & 1 & 1 & 0 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{pmatrix} 
$$
<br>

이번에는 s와 r이라는 free variables를 설정하겠습니다 <br>
$$
v = s\begin{vmatrix} ? \\ ? \\ ? \end{vmatrix} + r\begin{vmatrix} ? \\ ? \\ ? \end{vmatrix}
$$
<br>

## (링크 —> 왜 free variables 설정했는지 모르겠다면 여기 클릭)[]
보아하니 첫번째 성분(1번행)과달리 2, 3번째 성분들은 0이네요. <br>
그에 대해  2번째 성분에 대해 볼 때, &nbsp; 3번째 성분 = 0 <br>
3번째 성분에 대해 볼 때, &nbsp; 2번째 성분 = 0 <br>
이를 나타내면 아래와 같습니다. <br>

$$
v = s\begin{vmatrix} -1 \\ 1 \\ 0 \end{vmatrix} + r\begin{vmatrix} -1 \\ 0 \\ 1 \end{vmatrix}
$$
<br><br>

여기서 고유기저는
$$
\begin{vmatrix} -s \\ s \\ 0 \end{vmatrix} + \begin{vmatrix} -r \\ 0 \\ r \end{vmatrix}
$$
&nbsp;&nbsp; 이 2개의 성분으로 만들 수 있는 집합들을 의미합니다.
<br><br><br>

#### **<span style="color:blue">(1)-ㄹ</span>**
$$
P = \begin{pmatrix} 3 & -1 & -1 \\ -1 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix}
$$
&nbsp; 일 때 <br><br>

`P` = A를 대각화하는 행렬 <br>
여기선 
$$
P^{-1}
$$
도 필요한데 가우스 소거법을 통해 진행하겠습니다. <br><br>
방법은 P행렬 크기만큼 우측에 단위행렬을 이어줍니다 <br>
그리고 좌측 행렬을 기약행 사다리꼴로 만들면 됩니다 <br> 
$$
P^{-1} = \begin{pmatrix} 3 & -1 & -1 & |1 & 0 & 0 \\ -1 & 1 & 0 & |0 & 1 & 0\\ 1 & 0 & 1 & |0 & 0 & 1\end{pmatrix} \\ \Leftrightarrow \begin{pmatrix} 3 & -1 & -1 & 1 & 0 & 0 \\ -1 & 1 & 0 & 0 & 1 & 0\\ 1 & 0 & 1 & 0 & 0 & 1\end{pmatrix}
$$
<br>

이렇게 보니 3행의 1열이 선도원소라서 첫번째행으로 올리고 3행은 아래로 내려온 후에 <br>
각각 행들을 연산해 소거 해줍니다
<br><br>

$$
\Leftrightarrow \begin{pmatrix} 1 & 0 & 1 & 0 & 0 & 1 \\ 0 & 1 & 1 & 0 & 1 & 1 \\ 0 & -1 & -4 & 1 & 0 & -3 \end{pmatrix} \\ \Leftrightarrow \begin{pmatrix} 1 & 0 & 1 & 0 & 0 & 1 \\ 0 & 1 & 1 & 0 & 1 & 1 \\ 0 & 0 & -3 & 1 & 1 & -2 \end{pmatrix} \\ P^{-1} =  \begin{pmatrix} 1 & 0 & 0 & \frac{1}{3} & \frac{1}{3} & \frac{1}{3} \\ 0 & 1 & 0 & \frac{1}{3} & \frac{4}{3} & \frac{1}{3} \\ 0 & 0 & 1 & -\frac{1}{3} & -\frac{1}{3} & \frac{2}{3} \end{pmatrix} \\ \Leftrightarrow P^{-1} = \frac{1}{3} \begin{pmatrix} 1 & 1 & 1 \\  1 & 4 & 1 \\ -1 & -1 & 2\end{pmatrix} 
$$
<br><br>

이제 본식에 대입해봅니다 <br>
$$
B = P^{-1}AP
$$
<br>

$$
= \frac{1}{3} \begin{pmatrix} 0 & 0 & 0 \\  3 & 12 & 3 \\ -3 & -3 & 6 \end{pmatrix} \begin{pmatrix} 3 & -1 & -1 \\  -1 & 1 & 0 \\ 1 & 0 & 1 \end{pmatrix} \\ = \begin{pmatrix} 0 & 0 & 0 \\  0 & 3 & 0 \\ 0 & 0 & 3 \end{pmatrix}
$$
<br><br><br>

### **<span style="color:purple">(2)</span>** **<span style="color:blue">`링크`</span>**
(이것을 참고하여 증명)[]

`A 행렬`, &nbsp;&nbsp;&nbsp;`B행렬`(A를 대각화시킨 행렬)<br>
을 아래와 같이 구했습니다. <br>
$$
A = \begin{pmatrix} 0 & -3 & -3 \\  1 & 4 & 1 \\ -1 & -1 & 2 \end{pmatrix}
\quad\quad\quad B = \begin{pmatrix} 0 & 0 & 0 \\  0 & 3 & 0 \\ 0 & 0 & 3 \end{pmatrix}
$$
<br><br>

`1. 행렬식` <br>
B행렬은 det = 0 나오는게 너무 자명하다. <br>
그러면 A행렬도 과연 0이 나올까? <br>
(A행렬을 1열 방향으로 계산했음) <br>
$$
detA = 0 \begin{vmatrix}
4 & 1 \\ 
-1 & 2 \\ 
\end{vmatrix}
-1
\begin{vmatrix}
-3 & -3 \\ 
-1 & 2 \\ 
\end{vmatrix}
-1
\begin{vmatrix}
-3 & -3 \\ 
4 & 1 \\ 
\end{vmatrix}
= -1(-6-3)-(-3+12) = 0 \\
detB = 0
$$
<br>
이로써 둘다 같습니다
<br><br><br>

`2. 가역성` <br>
detA = 0, &nbsp;&nbsp;&nbsp; detB = 0 <br>
즉 둘다 역행렬이 존재하지 않아 비가역성
<br><br><br>

`3. rank` <br>
rankB = 2
<br><br>

A행렬을 기약행사다리꼴로 변환하면 rankA도 구할 수 있음<br>
$$
A = \begin{pmatrix} 0 & -3 & -3 \\  1 & 4 & 1 \\ -1 & -1 & 2 \end{pmatrix}
\rightarrow
\begin{pmatrix} 1 & 4 & 1 \\  0 & 3 & 3 \\ 0 & -3 & -3 \end{pmatrix}
\rightarrow
\begin{pmatrix} 1 & 0 & -3 \\  0 & 1 & 1 \\ 0 & 0 & 0 \end{pmatrix}
$$
<br><br>
즉 rankA = 2 
<br><br><br>

`4. Nullity` <br>
nullityA = n-rankA = nullityB<br>
3-2 = 1
<br><br><br>

`5. 고유다항식` <br>
$$
\gamma(\gamma-3)^2= 0, \quad\quad\quad 
B =\begin{pmatrix} 0 & 0 & 0 \\  0 & 3 & 0 \\ 0 & 0 & 3 \end{pmatrix}
$$
<br>
B행렬의 대각성분과 좌측의 고유다항식을 보니 서로 일치합니다
<br><br><br>

`6. 고윳값` <br>
$$
\gamma = 0 \quad or \quad 3
$$
<br><br><br>

`7. 고유기저 차원` <br>
$$
\gamma = 0
$$
&nbsp; 일 때 1개 <br>
[링크 참조1]()
<br><br>

$$
\gamma = 3
$$
&nbsp; 일 때 2개 <br>
[링크 참조2]()
<br><br><br>

`8. 대각성분합` <br>
A행렬: <br>
tr(A) = 0+4+2 = 6
<br>

B행렬: <br>
tr(B) = 0+3+3 = 6
<br><br><br>

`9. 대수적 중복도` <br>
$$
\gamma
$$
의 계수 <br>
$$\gamma=0$$
일 때 1 <br>
$$\gamma=3$$
일 때, 2

`10. 기하적 중복도` <br>
말 그대로 기저의 원소 갯수 <br>
[링크 참조1]() <br>
[링크 참조2]()
<br><br><br><br><br>


## 4-2) 예제2
행렬
$$
M =\begin{pmatrix} 0 & 1 & 0 \\  0 & 0 & 1 \\ 1 & -3 & 3 \end{pmatrix}
$$
&nbsp;&nbsp; 에 대하여 행렬 <br>
$$
3M^5-5M^4
$$
를 케일리 해밀턴 정리를 이용해 구하시오.
<br><br>

```
케일리 해밀턴 정리
필요한것: -고유다항식-
```
<br>

**<span style="color:lightgreen">step 1 &nbsp;&nbsp;&nbsp;고유다항식 찾기</span>** <br>
$$
f(\gamma) = det(\gamma I_3 -M) \\
det = 
\begin{pmatrix} \gamma & -1 & 0 \\  0 & \gamma & -1 \\ -1 & 3 & \gamma-3 \end{pmatrix}
$$
<br>
1열로 det 정리하면 될 듯 <br>
$$
detM = 
\gamma
\begin{vmatrix}
\gamma & -1 \\ 
3 & \gamma-3 \\ 
\end{vmatrix}
-0
\begin{vmatrix}
-1 & 0 \\ 
3 & \gamma-3 \\ 
\end{vmatrix}
-1
\begin{vmatrix}
-1 & 0 \\ 
\gamma & -1 \\ 
\end{vmatrix}
\\ \Leftrightarrow
\gamma^3-3\gamma^2+3\gamma-1 \\
\Leftrightarrow M^3-3M^2+3M-I_3 = 0
$$
<br><br>

이것을 
$$
M^3
$$
에 대해 정리하면 아래와 같이 됩니다.
<br>

$$
M^3 = 3M^2-3M+I_3
$$
<br><br><br><br>
**<span style="color:lightgreen">step 2 &nbsp;&nbsp;&nbsp;수식 변환 응용</span>** <br>
방금 위의 식에 M을 곱하면 아래처럼 됩니다. <br>
$$
M^4 = 3M^3 - 3M^2 + M
$$
<br><br>
**<span style="color:red">이 식에서</span>**
$$
M^3
$$
**<span style="color:red">에 대해 계산한 것을 대입하면 됩니다</span>** <br>
계산하면 이렇게 정리가 가능합니다 <br>
$$
M^4 = 3(3M^2 - 3M + I_3) -3M^2 + M \\
\Leftrightarrow
M^4 = 6M^2 -8M +3 I_3
\\
M^5 = MM^4 = M(6M^2 -8M +3 I_3)
$$
<br>
이 식에 아까구했던 
$$
M^3
$$
에 대한 수식을 대입하면 됩니다 <br><br>

$$
M^5 = 6(3M^2-3M+I_3) - 8M^2 + 3M \\
\Leftrightarrow M^5 = 10M^2 - 15M + 6I_3
$$
<br><br>

이로써 
$$
M^5 \quad M^4
$$
를 둘다 구했으니 이제 문제에 맞춰 각각 변형시킵시다 <br>
$$
\Leftrightarrow
3M^5-5M^4 \\3(10M^2 - 15M + 6I_3) \quad - \quad 5(6M^2 -8M +3 I_3) \\
\Leftrightarrow -5M + 3I_3
$$
<br><br>

### **<span style="color:red">결과</span>**
준식: &nbsp;&nbsp;
$$
-5M + 3I_3
= 
\begin{pmatrix} 3 & -5 & 0 \\  0 & 3 & -5 \\ -5 & 15 & -12 \end{pmatrix}
$$
<br><br><br>

# 참고
1. [[선형대수학] 5강. 고윳값과 대각화](https://www.youtube.com/watch?v=gKQ3doGGZdU&list=PL127T2Zu76FuVMq1UQnZv9SG-GFIdZfLg&index=15)

2. [[장황수학] &nbsp;&nbsp; 고유치 및 고유벡터](https://www.youtube.com/watch?v=V7a86NUYjhY&t=2s)

3. [[장황수학] &nbsp;&nbsp; 고유치 및 고유벡터의 성질](https://www.youtube.com/watch?v=EqYcIFdLWdo&list=PL-09gNfChBkrLusPDje3qXSRBN-GKHfaH&index=5)

4. [[장황수학] &nbsp;&nbsp; 닮은 및 대각화 행렬](https://www.youtube.com/watch?v=Iin-PLpN4V4&list=PL-09gNfChBkrLusPDje3qXSRBN-GKHfaH&index=5)