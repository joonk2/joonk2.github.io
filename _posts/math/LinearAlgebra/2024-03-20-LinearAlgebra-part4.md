---
title: "[선형대수학] 4강. 선형사상"
layout: post
categories: [math, LinearAlgebra]
tags: [Math, LinearAlgebra]
toc: true
toc_sticky: true
date: 2024-03-20 wed 10:46
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
```python
<목차>

* 참고

1. 선형사상
 1-1) 선형사상
 1-2) 여러 선형사상
 
2. 선형대수학의 기본정리 

3. 차원정리
 3-1) 차원정리
 3-2) 비둘기집 원리
  (1) 따름정리
  (2) 비둘기집 원리
   *만약 비둘기집에 선형대수학 논리를 적용시키려면?
   
4. Rank와 Nullity
 
 5. 예제 (3개)
  5-1) 선형사상 증명
  5-2) 동형사상 증명
  5-3) 선형사상 
```

<br><br>

# *참고
![Desktop View](/assets/img/math/LinearAlgebra/part4/1.png) <br><br>
![Desktop View](/assets/img/math/LinearAlgebra/part4/2.png)
<br>

```python
------------------- ∈ vs ⊂ ------------------------------

∈ Element
A={1,2,3} 이면
2 ∈ A
2는 A의 원소이다.

⊂ 부분집합
A={1,2,3}   B={1,3}일 때
B ⊂ A 이면  집합 B는 A의 부분집합이다.
```


# 1. 선형사상
## 1-1)선형사상
잠깐! &nbsp;&nbsp;&nbsp; `사상`은 간단하게 얘기하자면, 대수구조를 다루는 함수

### 선형사상(L):
`가산성 + 동차` 라는 2개 공리(조건)를 동시에 만족하는 사상
![Desktop View](/assets/img/math/LinearAlgebra/part4/3.png)
<br>

$$
\text{가산성(Additivity):}\quad\quad L(u+v) = L(u) + L(v)\quad (u,\quad v \in V)
$$

$$
\text{동차성(Homogeneity):}\quad\quad L(kv) = kL(v)\quad (k \in F,\quad v \in V)
$$

<br>

u, v는 정의역에 해당하는 대수구조인 V(벡터공간)의 원소들입니다. <br>
가산성에 대해 먼저 봅시다. <br>
즉 L(u+v)는 내부에서 두 원소를 덧셈한 선형사상을 뜻하며 이는 결과인 L(u) + L(v)와 같습니다. <br><br>
동차성에 대해 봅시다. <br>
k라는 스칼라가 v에 곱해졌는데, 그걸 괄호 밖에 내도 똑같습니다.
<br><br><br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part4/4.png)

### >설명

1. **핵(kerL)** <br>
선형사상의 결과가 0벡터가 되며, V(벡터공간)에 속한 v들을 모은 집합으로 `커널L`이라고도 합니다. 
<br><br>
2. **상**<br>
치역처럼 생각하면 되고, 선형사상의 결과들을 모두 모은 집합으로 `이미지L`(imL)이라 합니다
<br><br>
3. 자기사상 <br>
V라는 벡터공간과 W라는 벡터공간은 기본적으로 틀린데, 같을 때가 있습니다! <br>
즉 정의역에 해당하는 V와 공역에 해당하는 W의 벡터들 같을 때입니다. <br>
그럴 때, 선형사상을 `자기사상`이라고 합니다. <br><br>

4. **단사사상**<br>
V -> W 이걸 참고하여 <br>
V에서 서로 다른 2개의 벡터 v1, v2를 잡아줬을 때, 그에 대응되는 W의 벡터들도 서로 달라야 합니다<br>
근데! L(u) = L(v)라면 벡터들인 u=v도 만족하는데 그걸 `단사사상`이라 합니다! <br><br>

5. **전사사상** <br>
V에 있는 벡터들이 전부다 W벡터들에 대응된 것 <br>
쉽게 표현하면 ***공역 = 치역***<br>
맨 위에 `*참고` 볼 것 <br><br>

6. **동형사상** <br>
단사사상도 되고 전사사상도 됨 aka 전단사 <br>
즉 동일한 대수구조를 판별함에 있어서 핵심이 됩니다 <br><br>

7. **자기동형사상** <br>
정의역과 공역이 같고, 동시에 1:1 대응인 사상 <br><br>

8. **사상의 합성** <br>
합성함수를 생각하면 편합니다 <br>
예시:&nbsp; g(x) = $$x^2$$, &nbsp;&nbsp; f(x) = 2x
$$
h(x)=g(f(x))=(2x)^2 =4x^2        
$$
<br><br>

9. **역사상** <br>
역원이랑 비슷한 개념입니다 <br>
`L2 * L1 = Iv` 로 항등사상 나왔을 때, <br>
L2와 L1 위치 바꿨을 때도 항등사상이면 그때 비로소 역사상이 됩니다
<br><br><br><br>

# 2. 선형대수학의 기본 정리
F-벡터공간 V, W에 대해 V → W로의 선형사상들의 집합을 L(V, W)라 하고, <br>
다음과 같이 L(V, W) 위의 `합`과 `스칼라배`를 정의한다<br><br>

**<font color='green'>조건</font>** = 
$$
(v \in V, \quad k \in F) \\ 
$$
<br>
1) **<font color='blue'>합</font>** = 
$$
(L_1 + L_2)(v)
$$
**<font color='red'>=</font>**
$$
L_1(v) + L_2(v)
$$
<br>
2) **<font color='blue'>스칼라배</font>** =
$$
(kL)(v)
$$
**<font color='red'>=</font>**
$$
kL(v)
$$
<br><br>

F에 속한 m x n 행렬들의 집합을 아래와 같이 나타냅니다

$$
M_{m*n}(F)
$$

두 사상 $$f$$, $$g$$는 다음과 같이 정의합니다 <br>
$$
f: \quad L(V, W) \rightarrow M_{m*n}(F) \\ 정의방법: \quad f(L) = [L]_{Bw}^{Bv} = M \\[5ex] g: \quad M_{m*n}(F) \rightarrow L(V, W) \\ 정의방법: \quad g(M) = L_M([L_M(v)]_{Bw} = M[v]_{Bv}
$$
<br>

### **[기호 참고]**

```python
-->: 가는 방향

사상f:   선형사상 --> 행렬집합의 대수구조
사상g:   행렬집합의 대수구조 --> 선형사상
```

<br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part4/5.png)
<br>

### 1번 설명
**<font color='green'>ex-1)</font>**: &nbsp;&nbsp; V
**<font color='red'>=</font>**
$$
|R^3
$$
**$ \color{red}{\Rightarrow} $**
$$B_v$$
= 
**<font color='blue'>{</font>**
(1,0,0),(0,1,0),(0,0,1)
**<font color='blue'>}</font>**
<br><br>
위는 예를 든 수식입니다 <br>
이는 벡터공간 V가 3개의 기저벡터로 구성된 것을 나타냅니다 <br>
v1, v2, v3을 각각 (1, 0, 0), (0, 1, 0), (0, 0, 1)로 임의 설정했을 때 그 배치순서는 고정합니다. <br>
이것으로 `Bv = V의 순서기저`가 됩니다.
<br><br><br><br><br>


![Desktop View](/assets/img/math/LinearAlgebra/part4/6.png)
V에 속한 v를 갖고와서 $$v_1$$ ~ $$v_n$$까지 벡터들이 Linear combination(선형결합)을 했을 때, <br>
$$k_1$$ ~ $$k_n$$까지 모은 튜플을 행에서 열로 전치시켰네요 <br>
**$$B_v$$**는 꼭 표준기저일 필요는 없는데 여기서 **$$B_v$$**는 $$v_1$$ ~ $$v_n$$까지를 나타냅니다
<br><br><br>

### 2번 설명
1번 v1, v2, v3에 이어서 합니다 <br>
**<font color='green'>ex-2)</font>**: &nbsp;&nbsp;
$$
v \in V, \quad v = 3V_1 + V_2 + 2V_3 \\[3ex]
$$
**$ \color{red}{\Rightarrow} $**
$$
(3, 1,2)^T
$$
**$ \color{red}{\Rightarrow} $**
$$
즉\begin{bmatrix} 3\\ 1 \\ 2 \end{bmatrix} 이는 \quad [v]_{Bv}다
$$ <br>
기저는 아까 언급했듯이 어떤 것이든 상관없는데, 어떤 기저를 잡으면 그 기저에 대해 v라는 벡터를 $$3V_1 + V_2 + 2V_3$$ 처럼 표현하겠다는 뜻입니다.
<br><br><br>

#### 왜 $$3v_1,v_2,2v_3$$이 아니고 대문자인 $$3V_1, V_2, 2V_3$$이냐? 
**$ \color{blue}{\Rightarrow} $**
`기저벡터`는 보통 대문자, &nbsp;&nbsp;&nbsp; `특정벡터`는 소문자입니다 
<br><br><br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part4/7.png)
$$B_v \Rightarrow B_w$$

```python
v1:  V의 원소
L(v1):  선형변환을 거친v1 즉 L(v1)는 w의 원소 
--> 즉 L(v1)을 분리시키려면 w기저를 따라야 한다.
```

<br>

### 3번 설명
![Desktop View](/assets/img/math/LinearAlgebra/part4/8.png)
![Desktop View](/assets/img/math/LinearAlgebra/part4/9.png)

<br><br><br><br>

# 3. 차원정리
## 3-1) 차원정리
L: &nbsp;&nbsp;&nbsp; V -> W 에 대하여 다음이 성립한다 <br>
dim(**$ \color{red}V$**) = dim(ker **$\color{lightblue}L $**) + dim(im **$\color{lightblue}L $**) <br><br>

요약본과 A to Z 방식으로 총 2개 작성합니다.
### 요약본
![Desktop View](/assets/img/math/LinearAlgebra/part4/10.png)

<br><br><br>

### A to Z
![Desktop View](/assets/img/math/LinearAlgebra/part4/11.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part4/12.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part4/13.png)
<br><br><br><br>

## 3-2) 비둘기집 정리
![Desktop View](/assets/img/math/LinearAlgebra/part4/14.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part4/15.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part4/16.png)
<br><br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part4/17.png)
<br>

**—> n+1개의 물건을 n개의 상자에 넣을 때 적어도 어느 한 상자에는 두 개 이상의 물건이 들어 있다는 원리** <br><br><br><br><br>

### *<U>만약 비둘기집에 선형대수학 논리를 적용시키려면?</U>
`조건 임의설정`: L이 V에서 W로 가는 선형사상 <br>
-> 그러면 L(v)에서 가능한 v의 선택지는 1차원이라도 무한개 <br><br>
L(v), L(2v)이런식으로 모든 v에 대해서 다 함수값을 정해줘야 하는데, <br>
귀찮기에 유한개로 정의하고 끝내자 <br>
*`(`우선 L(v)를 f(x)로 생각하면 편하다*`)` <br><br>
기저 
**<font color='blue'>{</font>**
$$v_1$$
**<font color='red'>,</font>**
$$...$$
**<font color='red'>,</font>**
$$v_n$$
**<font color='blue'>}</font>**
에서 L의 함수값을 정하면 <br>
$$L(v)$$
**<font color='red'>=</font>**
$$L(a_1v_1 + ... + a_nv_n)$$
**<font color='red'>=</font>**
$$a_1L(v_1) + ... + a_nL(v_n)$$
이라서 <br>
모든 함수의 벡터값이 다 정의된다
<br><br><br><br>

# 4. Rank와 Nullity
rank를 들어가기 전 잠깐 개념 복습 하겠습니다. <br>
아래는 rank의 연산법인 연립일차행렬방정식에 대한 간단한 예시입니다! <br>
아래 식으로 행렬을 AX = B 꼴로 고쳤습니다 <br>
A = 계수행렬, &nbsp;&nbsp;&nbsp; X = 변수를 포함한 열벡터 &nbsp;&nbsp;&nbsp; B = 상수벡터 <br>
초기 형태는 아래와 같습니다<br><br>
$$
\begin{bmatrix} 2 & -1 \\ 1 & 1 \end{bmatrix}
\begin{bmatrix} x \\ y \end{bmatrix}
=
\begin{bmatrix} 4 \\ -1 \end{bmatrix}
$$ 
<br><br><br>

$$
\begin{cases}
2x-y = -1 \\
x+y = 4
\end{cases}
$$
**$ \color{red}{\Rightarrow} $** 
$$
\begin{cases}
x+y = 4 \\
2x-y = -1 
\end{cases}
$$
**$ \color{red}{\Rightarrow} $** 
$$
\begin{cases}
2x+2y = 8 \\
2x-y = -1 
\end{cases}
$$
**$ \color{red}{\Rightarrow} $** 
$$
\begin{cases}
2x+2y = 8 \\
0-3y = -9 
\end{cases}
$$
<br>
**$ \color{red}{\Rightarrow} $** 
$$
\begin{cases}
x+y = 4 \\
\quad\quad y = 3 
\end{cases}
$$
<br><br><br>

$$
\begin{equation}
   \begin{pmatrix} 
   2 & -1  & | -1\\ 
   1 & 1  & |\quad 4\\ 
   \end{pmatrix}  
\end{equation} 
$$
**$ \color{red}{\Rightarrow} $**
$$
\begin{equation}
   \begin{pmatrix} 
   1 & 1  & |\quad 4\\ 
   2 & -1  & | -1\\ 
   \end{pmatrix}  
\end{equation} 
$$
**$ \color{red}{\Rightarrow} $**
$$
\begin{equation}
   \begin{pmatrix} 
   2 & 2  & |\quad 8\\ 
   2 & -1  & | -1\\ 
   \end{pmatrix}  
\end{equation} 
$$
**$ \color{red}{\Rightarrow} $**
$$
\begin{equation}
   \begin{pmatrix} 
   2 & 2  & |\quad 8\\ 
   0 & -3  & | -9\\ 
   \end{pmatrix}  
\end{equation} 
$$
<br>
**$ \color{red}{\Rightarrow} $**
$$
\begin{equation}
   \begin{pmatrix} 
   1 & 1  & | 4\\ 
   0 & 1  & | 3\\ 
   \end{pmatrix}  
\end{equation} 
$$

<br>
우선 행 위치를 변경한 이유는 1번 행의 첫번째 자리에 1이 오면 계산하기 편합니다 <br>
<u>이 문제에서는</u> 1,2열까지 범위로 잡은 것을 **<font color='pink'>계수행렬</font>**(coefficient matrix)이라하고 <br>
1,2,3열 범위를 다 잡은 것을 **<font color='green'>확대행렬</font>**(augmented matrix)이라고 합니다
<br><br><br><br><br>


### **<font color='red'>Rank</font>**
이제 Rank부터 먼저 보겠습니다. &nbsp;&nbsp;&nbsp; 특성은 아래와 같습니다. <br>
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

![Desktop View](/assets/img/math/LinearAlgebra/part4/null-space-1.png)
![Desktop View](/assets/img/math/LinearAlgebra/part4/null-space-2.png)
![Desktop View](/assets/img/math/LinearAlgebra/part4/null-space-3.png)
<br><br><br>

Rank와 Nullity 예시로 3개만 들겠습니다
```
예시 1)
```
$$
\begin{equation}
   \begin{pmatrix} 
   -1 & 0 & 5 \\ 
   -3 & 7 & 0 \\
   0 & 2 & 1 
   \end{pmatrix}  
\end{equation} 
$$
**$ \color{red}{\Rightarrow} $** $$\ldots$$ **$ \color{red}{\Rightarrow} $**
$$
\begin{equation}
   \begin{pmatrix} 
   -1 & 0 & 5 \\ 
   0 & 14 & -30 \\
   0 & 0 & 37 
   \end{pmatrix}  
\end{equation} 
$$
<br>

계산해보면 rank 구하는 방법에 맞게 각 행들의 선도원소 아래는 zero가 되었고, 각 행들이 전부 0인 것은 없네요! <br>
PivotColumn도 2개네요! (=선도 원소아래 zero) <br>
free column은 3번째 열인 1개<br>
**$ \color{red}{\Rightarrow} $** 즉 rank = 3, &nbsp;&nbsp;&nbsp; nullity = 0, &nbsp;&nbsp;&nbsp; row = 3 <br>
![Desktop View](/assets/img/math/LinearAlgebra/part4/stairs.png)<br>
여기서 **<font color='green'>초록색 선</font>**을 보시면 계단모양 같다고 하여 echelon form(사다리꼴 모양)라 합니다
<br><br><br>

```
예시 2)
```
$$
\begin{equation}
   \begin{pmatrix} 
   1 & 4 & 2 \\ 
   3 & 1 & -5 \\
   -2 & 3 & 7 \\
   -7 & 5 & 19
   \end{pmatrix}  
\end{equation} 
$$
**$ \color{red}{\Rightarrow} $**
$$\ldots$$ 
**$ \color{red}{\Rightarrow} $**
$$
\begin{equation}
   \begin{pmatrix} 
   1 & 4 & 2 \\ 
   0 & -11 & -11 \\
   0 & 11 & 11 \\
   0 & 33 & 33
   \end{pmatrix}  
\end{equation} 
$$
**$$ \color{red}{\Rightarrow} $$**
$$
\begin{equation}
   \begin{pmatrix} 
   1 & 4 & 2 \\ 
   0 & -11 & -11 \\
   0 & 0 & 0 \\
   0 & 0 & 0
   \end{pmatrix}  
\end{equation} 
$$
<br>

계산해보면 rank 구하는 방법에 맞게 1, 2행만 선도원소 아래가 zero가 되었고,<br>
3번행부터는 선도원소가 없고 3, 4행은 zero행이네요! <br>
**$ \color{red}{\Rightarrow} $** 즉 rank = 2, &nbsp;&nbsp;&nbsp; nullity = 2, &nbsp;&nbsp;&nbsp; row = 4
<br><br><br>

```
예시 3)
```
일차연립방정식 
$$
\begin{equation}
   \begin{pmatrix} 
   1 & 2 & 1 & 0 \\ 
   2 & 5 & 5 & 1 \\
   -2 & -3 & 0 & 3 \\
   3 & 4 & -2 & -4
   \end{pmatrix}  
\end{equation} 
$$
$$
\begin{equation}
   \begin{pmatrix} 
   x_1 \\ 
   x_2 \\
   x_3 \\
   x_4
   \end{pmatrix}  
\end{equation} 
$$
=
$$
\begin{equation}
   \begin{pmatrix} 
   0 \\ 
   0 \\
   0 \\
   1
   \end{pmatrix}  
\end{equation} 
$$
를 만족하는 실수해는? <br><br>

$$
   (1) 단 하나 존재  \\
   (2) 무한히 많이 존재   \\
   (3) 존재 안함   \\
   (4) 판정 불가 
$$
<br><br>

<u>정석으로 풀어보면</u> 아래처럼 순서대로 진행됩니다<br>
1행 -> 2, 3, 4열 소거 <br>
2행 -> 3, 4열 소거 <br>
3행 -> 4열 소거 <br>
**$ \color{red}{\Rightarrow} $**
$$
\begin{equation}
   \begin{pmatrix} 
   1 & 2 & 1 & 0 &|0\\ 
   0 & 1 & 3 & 1 & |0\\
   0 & 0 & -1 & 2 & |0\\
   0 & 0 & 0 & 0 & |1
   \end{pmatrix}  
\end{equation} 
$$
로 만들어 집니다 <br>
1~4열까지 rankA 구하는 구간 <br>
1~5열까지 rankA|B 구하는 구간
<br><br>

따라서 rankA = 3 &nbsp;&nbsp;&nbsp; rankA|B = 4 <br>
해가 존재하지 않아서 답은 (3)
<br><br><br><br>

# 5. 예제 (3개)
## 5-1) 선형사상 증명
![Desktop View](/assets/img/math/LinearAlgebra/part4/19.png)

```python
*이 문제를 풀기 위해서는 가산성, 동차성을 증명해야한다
```
![Desktop View](/assets/img/math/LinearAlgebra/part4/20.png)

## 5-2) 동형사상 증명
![Desktop View](/assets/img/math/LinearAlgebra/part4/21.png)

```python
* 3차 다항식 집 --> 4차원 
L1과 L2가 동형사상이 되기위한 산식을 증명해봐라
즉, 한 대수구조에서 다른 대수구조로 가는 사상의 구체적인 산식을 알맞게 정의하라는 뜻 
```
![Desktop View](/assets/img/math/LinearAlgebra/part4/22.png)
![Desktop View](/assets/img/math/LinearAlgebra/part4/23.png)
![Desktop View](/assets/img/math/LinearAlgebra/part4/24.png)
<br><br><br>

## 5-3) 선형사상
![Desktop View](/assets/img/math/LinearAlgebra/part4/25.png)
![Desktop View](/assets/img/math/LinearAlgebra/part4/26.png)
![Desktop View](/assets/img/math/LinearAlgebra/part4/27.png)

# 참고

1. **[[선형대수학] 4강. 선형사상](https://www.youtube.com/watch?v=euOckRpDB10&list=PL127T2Zu76FuVMq1UQnZv9SG-GFIdZfLg&index=22)**

2. [[장황수학] &nbsp; **랭크1**](https://www.youtube.com/watch?v=FUfTJgDi1u0&t=845s)

3. [[장황수학] &nbsp; **랭크의 활용**](https://www.youtube.com/watch?v=a8KFURdP4L8&t=1s)

4. [[Wrath of Math] &nbsp;&nbsp;&nbsp;&nbsp;**Find Null Space and Nullity of a Matrix - Linear Algebra**](https://www.youtube.com/watch?v=iApoNPcI5eI)