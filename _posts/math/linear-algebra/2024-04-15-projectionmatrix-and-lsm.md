---
title: "ProjectionMatrix & LSM"
layout: post
categories: [math, linear-algebra]
tags: [math, LinearAlgebra, EigenValue, kaley-hammilton, diagonalization of a matrix, 유니터리행렬, 복소벡터공간, 켤레복소수, 선형대수학, 오일러공식, 자연상수, 삼각함수, 정사영행렬, 최소제곱법]
toc: true
toc_sticky: true
date: 2024-04-15 mon
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

# 목차
```md
1. PreRequisites
2. 문제 상황
3. 😵‍💫어떡하지?
4. 에니메이션
5. 이제 Least Squares을 어떻게 쓰지?
6. 참고
```
<br>

# 1. PreRequisites
1. [projection](https://joonk2.github.io/posts/linear-algebra-part2/) <br>
2. [LSM (최소제곱법)](https://ko.wikipedia.org/wiki/%EC%B5%9C%EC%86%8C%EC%A0%9C%EA%B3%B1%EB%B2%95)
<br>


# 2. 문제 상황
$$A_{10\cdot3}$$ 행렬이 있고 $$R^{10}$$에서 3차원을 span하는 C(A) aka 열공간A가 있다고 하자 <br>
여기서 $$R^{10}$$에 있는 $$\vec{b}$$가 어떻게 해야 C(A)와 최소 거리를 가질까? <br>
(3차원 열공간A가 아래처럼 평면으로 그려져도 진짜 평면은 아니다.) → 그냥 쉽게 쉽게 그렸다<br>


![Desktop View](/assets/img/math/LinearAlgebra/projectionMatrix-LSM/1.png)

<span style="color:red">참!</span> 여기서 $$Ax \neq b$$다 왜냐하면 $$\vec{b}$$가  A가 span하는 공간 내부에 없고 다른데 있기 때문 <br>
(열공간밖에 있어서) <br>
$$\Rightarrow$$ $$A \vec{x}$$로는 $$\vec{x}$$를 아무리 바꿔봤자 $$\color{red}{\neq}$$ $$b$$ 다

# 3. 😵‍💫어떡하지?

$$\color{red}\therefore$$그러면 최대한 $$\vec{b}$$랑 가깝게 만드는 $x$라도 찾아보자 <br>
$$\Rightarrow$$ Least Square Matrix 적용 가능한 문제 상황 <br>
일단 아래에서는 최소거리를 나타내기 위해 어떤 벡터가 나을지 탐색해보자 <br>
어떤 $$Ax$$벡터가 $$\vec{b}$$랑 가까울까? <br>

# 4. 에니메이션
![Desktop View](https://github.com/joonk2/math/raw/main/linear-algebra/proj-lsm/Ax/Ax.gif) <br>

$$A \vec{x}$$가 span공간상에서 탐험하다가 $$\vec{b}$$와 길이가 가장 짧은 그순간의 $$\vec{x}$$가 우리가 찾고자 하는 값이다 <br>
그때 찾게될 $$\vec{b}$$와의 최소거리 벡터를 $$A\hat x$$라고 하겠다 <br>
그때의 높이를 $$\vec{b}-A \hat x$$라 나타내고 이를 error벡터인 $$\vec{e}$$로 나타내겠다 <br>
$$\Rightarrow$$즉 $$\vec{e}$$가 가장 작아지도록하는 $$x$$를 찾아야한다 <br>
최종적으로는 Least Square vector로 보면 $$||\vec{e}_{2}||^{2}$$ 즉 <span style="color:red">(</span>$${Norm_2}^2$$<span style="color:red">)</span>을 줄여야 한다 <br>

이를 나타내면 아래 사진과 같다 ($\perp$이야기는 아래에서 하겠다) <br>

![Desktop View](/assets/img/math/LinearAlgebra/projectionMatrix-LSM/2.png)
<br>
최소제곱법(LSM)을 구하기 위해 수선의 발을 내리자 <br>
$$\color{pink}\Rightarrow$$ $$\vec{b}$$랑 제일 거리가 가까운 벡터인 $$A{\hat{x}}$$와 $$\vec{e}$$가 $$\perp$$여야 한다. <br>
😎참고! → $$A$$가 정방행렬이면 $$A^{T}$$의 Rank랑 서로 같다 <br>
게다가 $$A A^T({A A^T})^{-1} = I$$  <br><br>

아무튼 이어서 $$\left( b-A \hat{x} \right)^TA\hat x = 0$$ <br>
<span style="color:yellow">**(**</span> $$b^TA-\hat x^T A^T A$$ <span style="color:yellow">**)**</span>  $$\hat x = 0$$ <br>
노란 괄호 안이 0이 되야 한다 <br>

<span style="color:yellow">**(**</span>  $$b^TA = \hat x^T A^T A$$ <span style="color:yellow">**)**</span>  여기서 한번더 $$T$$(전치)를 해주면 아래와 같이 된다 <br>
$$A^T b = A^T A \hat x$$ 이것을 normal equation이라고 한다<br>
자 이것에 대해 양변에 $$({A^T A})^{-1}$$을 곱하자 <br>
$$\Rightarrow$$  $$({A^T A})^{-1}  A^T b = \hat x$$   <br>

우리는 이렇게 $$\hat{x}$$을 구했으니  $$A \hat{x}$$에 대입해보자 <br>
$$A \hat{x}$$   = <span style="color:red">**[**</span> $$A({A^T A})^{-1}  A^T$$ <span style="color:red">**]**</span> $$b$$ <br>
여기서 <span style="color:red">**[괄호 안]**</span>이 projection matrix가 된다 <br>

# 5. 이제 Least Squares을 어떻게 쓰지?
위를 보면 알 수 있듯이 $$\vec{x}$$는 바로 얻을 수 없는 대신 아래와 같은 형태로 <br>
우리에게 noise를 더해 $$\vec{z}$$로 전달된다 <br>
(A라는 행렬도 통과하고 noise도 더해 우리에게 온다는 말이다) <br>
$$\vec{z}$$는 우리가 측정한 것이니 measurement라고 한다 <br>

$$z = Ax+n$$ <br>
$$\therefore$$ measurement를 보고 $$x$$를 알아내야한다 <br>
이를 그림으로 나타내면 아래와 같다 <br>

![Desktop View](/assets/img/math/LinearAlgebra/projectionMatrix-LSM/3.png)
<br>

그림을 보고 알 수 있는 것은 $$z$$랑 가깝게 만드는 $$x$$를 찾자는거다 <br>
위의 내용들을 보면 알 수 있듯이 $$e$$랑 $$A \hat x$$가 $$\perp$$할때니까 <br>
내적을 했을 때 0이 되야한다(직각이니까) <br>

$$A \hat x$$  $$\color{red}\cdot$$ $$e$$ = 0
<br><br>

# 6. 참고
**[혁펜하임 | AI & 딥러닝  &nbsp;&nbsp;&nbsp; [선대]  (Least squares & Projection matrix)](https://www.youtube.com/watch?v=B_WZdmCGqBc&t=163s)**