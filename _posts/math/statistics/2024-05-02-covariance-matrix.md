---
title: "covariance matrix"
layout: post
categories: [math, statistics]
tags: [math, statistics, 공분산 행렬, covariance matrix, 수학, 통계]
toc: true
toc_sticky: true
date: 2024-05-02 thur
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

<u>3명의 피실험자가 있다고 가정하자</u> <br>
피실험자1은 사과나 바나나를 먹으면 둘다 만족도1을 얻는다. <br>
피실험자2는 사과를 먹으면 만족도3을 얻고 바나나에서는 얻지 못한다. <br>
피실험자3은 사과랑 바나나를 먹을때 각각 불만족도 -1을 얻는다 <br>
(아무튼 과일을 정말 싫어한다는 뜻이다) <br>

|대상|사과|바나나|
|:---|---:|:---:|
|**<font color='red'>피실험자1</font>**|1|1|
|**<font color='purple'>피실험자2</font>**|3|0|
|**<font color='skyblue'>피실험자3</font>**|-1|-1| <br>

아래는 $$R^2$$ 좌표에서 피실험자 3명을 각 벡터로 나타낸 것이다 <br>

![Desktop View](/assets/img/math/statistics/CovarianceMaxtrix/1.png) <br>

변수는 x,y가 각각 사과, 바나나로 2개다 <br>
그래서 2x2 행렬이 되겠다 <br>
$$\begin{bmatrix} cov(x,x) & cos(x,y) \\cov(y,x) & cos(y,y) \end{bmatrix}$$ <br>

![Desktop View](/assets/img/math/statistics/CovarianceMaxtrix/2.png) <br>

여기서 cov(사, 사)는 사과와 사과끼리의 공분산을 나타낸 것인데 이는 var(사)로 바꿀 수도 있다<br>
마찬가지로 cov(바, 바) $\Rightarrow$ var(바) <br>
이제 covariance matrix를 채우기 위해 `사과`와 `바나나`의 평균 계산하자 <br>
$$사과m \Rightarrow \frac{1+3-1}{3} \rightarrow 1$$ <br>
$$바나나m \Rightarrow \frac{1+0-1}{3} \rightarrow 0$$ <br>

## covariance matrix process
$$Cov(A,B)\\=E(AB)-E(A)E(B)$$ <br>

여기서 E(AB)는 `사과x바나나`니까 각각 곱해 더하면 1, 0, 1 나온다 <br>
근데 3개니까 $$\frac{1+0+1}{3} \Rightarrow \frac{2}{3}$$ <br>
자 근데 가만보니 E(B)는 $$\frac{1}{3}+\frac{0}{3}-\frac{1}{3}=0$$ 이 되기에 E(A)E(B)는 의미가 없어지므로 E(AB)만 구하면 되겠다 <br><br>

자 그럼 이번엔 cov(사, 사)를 구해보자 <br>
$$Cov(A,A)\\=E(A^2)-E(A)$$ <br>
$$E(A^2) \Rightarrow \frac{1^2+3^2+(-1)^2}{3} = \frac{11}{3}$$ <br>
$$E(A) \Rightarrow \frac{1+3-1}{3} = 1$$ <br>
$$\therefore \frac{11}{3}-1 = \frac{8}{3}$$ <br><br>

마지막으로 cov(바, 바)를 구하자 <br>
$$Cov(B,B)\\=E(B^2)-E(B)$$ <br>

아까 E(B)=0 이었으니 이건 제끼자 <br>
$$E(B^2) \Rightarrow \frac{1^2+0^2+(-1)^2}{3} = \frac{2}{3}$$ <br>
$$\therefore \frac{2}{3}-0 = \frac{2}{3}$$ <br>

## $\color{red}{\therefore}$covariance matrix
$$\begin{bmatrix} \frac{8}{3} & \frac{2}{3} \\ \frac{2}{3} & \frac{2}{3} \end{bmatrix}$$ <br>

# 참고
[[ritvikmath] &nbsp;&nbsp; covariance matrix](https://www.youtube.com/watch?v=152tSYtiQbw)