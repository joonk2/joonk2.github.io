---
title: "오일러공식의 기하학적 설명"
layout: post
categories: [math, complex-number]
tags: [수학, math, 복소수, ComplexNumber, 회전변환, 회전행렬, 삼각함수, 오일러공식, 미분, 적분]
toc: true
toc_sticky: true
date: 2024-04-09 tue 
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

```markdown
<목차>

1. 들어가며
2. 오일러공식의 기하학적 의미
3. 결론
```

# 1. 들어가며
<p align="center"><iframe  src="https://eulers-formula.netlify.app/" width="650" height = "720" frameborder="0"></iframe></p>

이번 글에서는 오일러 공식의 기하학적인 의미에 대해 알아볼 것입니다. <br>
혹시 위의 슬라이드를 움직였을 때 아예 감이 안잡히신다면, <br>
아래의 링크들을 참고하고 다시 보시면 쉽게 이해되실 것입니다

### [📐미분 방정식을 이용한 오일러공식 유도]([https://joonk2.github.io/posts/ComplexNumber-part1/](https://joonk2.github.io/posts/ComplexNumber-part1/))

### [📐회전변환의 기하학적인 이해](https://joonk2.github.io/posts/easy-euler-formular/)
<br><br><br>

# 2. 오일러 공식의 기하학적 의미
$e^{i \theta} = cos \theta + i sin \theta$ <br>
위는 오일러 공식이다 <br>
참!  &nbsp; $$e^{i \cdot 2\pi} = cos (2\pi) + i (sin 2\pi)$$면 360도니까 한바퀴 다 돈다 <br>

## 우변으로부터
우변에 있는 $cos \theta + i sin \theta$에서  $cos \theta$와 $sin \theta$를 각각 $x$, $y$로 놓고 생각해보면  <br>
$e^{i\theta}$를 복소수라고 생각하여 아래처럼 식을 고칠 수 있다 <br>
**$ \color{pink}{\Rightarrow} $** $e^{i\theta} = x+iy$  <br>
여기서 그 복소수**$$ \color{red}($$** $$e^{i\theta}$$ **$$\color{red})$$**가 길이가 1인 막대가 실수축으로부터 $$\theta$$라디안 만큼 회전한 곳에 위치하는 값이라는 의미를 갖는다

![Desktop View](/assets/img/math/ComplexNumber/Euler_Formula_by_metrics/1.png)
<br>

우측의 그림을 보면 알 수 있듯이, 복소 평면 상에서 표현한 $x+iy$는 <br>
삼각함수로 표현하면 x축으로부터의 각도를 theta 라디안이라 했을 때 <br>
반지름인 r의 길이를 통해 $r cos(\theta) + i r sin(\theta)$다.
<br><br><br><br>

## 좌변으로부터
$e^{i\theta}$라는 것이 복소수이며,  반지름(r)을 1로 임의 설정하자 <br>
이 복소수는 길이가 1인 막대가 실수축으로부터 $\theta$라디안만큼 회전한 곳에 위치하는 값이라는 의미를 찾을 것이라는 걸 염두에 두도록 하자.
<br>

일단 자연상수 $e$의 정의부터 생각해보면 아래와 같다 <br>
$$e = \lim_{n\to \infty}\left(1+\frac{1}{n}\right)^n$$ 
<br>

그러면 자연상수 $$e$$에 지수 $$x$$승이 붙은 경우는?? <br>
$$e^x = lim_{n \to \infty} \left( 1+ \frac{x}{n} \right)^n = \left[\lim_{n\to \infty} \left(1+\frac{x}{n}\right)^{n/x}\right]^x$$
<br><br>

### <span style="color:pink">**잠시 참고!**</span>
`블로그 주인장`이 수학을 너무 몰라서 $e$랑 $e^x$가 눈으로 안그려져 그래프를 추가했다 <br>
이미 아는 분들은 그냥 넘어가도 좋을 것 같다 <br>

![Desktop View](/assets/img/math/ComplexNumber/Euler_Formula_by_metrics/2.png)
<br><br>

위의 그래프를 보면 e에 대해 훨씬 더 이해가 잘 되었을 것이다. <br>
아까 내용에서 이어서 하자면, 지수 $x$승 대신에 허수지수인 $i$승으로 바꾸면 어떨까? <br>
$$e^i = lim_{n \to \infty} \left( 1+ \frac{i}{n} \right)^n = \left[\lim_{n\to \infty} \left(1+\frac{i}{n}\right)^{n/i}\right]^i$$ <br>
위의 식에서 이 부분만 보자 **$$\color{pink}{\Rightarrow}$$** $$lim_{n \to \infty} \left( 1+ \frac{i}{n} \right)^n$$
<br><br>

## **자연상수에 붙은 허수 지수: 호(arc) 위의 점**
<span style="color:red">**어?**</span> 위에는 $$lim_{n \to \infty}$$인데 n=1부터 보면 어떨까?
<br>
<span style="color:yellow">**(**</span>i를 1로 생각하자<span style="color:yellow">**)**</span> <br>

### <span style="color:red">**n=1**</span>
$$\text{n=1 }$ **$ \color{pink}{\Rightarrow} $$** $$\left(1+\frac{i}{1}\right)^1$$ <br>
이것은 $1+i$라는 복소수를 의미하며, 이때 real(실수부), Im(허수부)를 나누면 $$\Rightarrow$$ $$x, iy$$좌표는 (1, i)  <br>
이 좌표의 길이 **$$\color{pink}{\Rightarrow}$$** $$|1+i| = \sqrt{(1+i)(1-i)} = \sqrt{2} \approx 1.4$$ <br>
복소평면 상에서 표현하면 아래와 같다 <br>
![Desktop View](/assets/img/math/ComplexNumber/Euler_Formula_by_metrics/3.png)
<br><br>

## <span style="color:red">**n=2**</span>

$\text{n=2}$ $$\color{pink}{\Rightarrow}$$ $$\left(1+\frac{i}{2}\right)^2 = \left(1+\frac{i}{2}\right)\left(1+\frac{i}{2}\right) = 0.75+i$$  <br>

어? $$\left(1+\frac{i}{2}\right)\left(1+\frac{i}{2}\right)$$ &nbsp; 이게 뭔말이지? <br>
한마디로 설명하면 $$(1+\frac{i}{2})$$를 그려서 얻은 직각 삼각형에 대해, <br>
그 빗변의 길이 $$\frac{1}{2}$$의 높이로 하는 직각삼각형을 한번 더 그림<br>
x, iy 좌표는 실수부, 허수부를 나누어 --> (0.75, i) <br>
이 좌표의 길이 **$$\color{pink}{\Rightarrow}$$** $$|0.75+i| = \sqrt{(0.75+i)(0.75-i)} = \sqrt{1.5625} \approx 1.25$$ <br>
<span style="color:red">**(**</span>아래 그림 참고<span style="color:red">**)**</span> <br>

![Desktop View](/assets/img/math/ComplexNumber/Euler_Formula_by_metrics/4.png)
<br><br><br>

## <span style="color:red">**n=3**</span>
![Desktop View](/assets/img/math/ComplexNumber/Euler_Formula_by_metrics/5.png)
<br><br><br>

# 3. 결론
n이 커지면 커질 수록 1과 $$\frac{1}{n}$$을 밑변과 높이로 하는 직각 삼각형의 <br>
빗변의 길이(원점에서 부터의 x,y 좌표 길이)는 작아지면서 거의 1에 가까워지며, <br>
n이 커질 수록 반지름이 1이고, 길이가 1인 호(arc) 위의 점에 가까워지는 것을 알 수 있다. <br>
아래 시뮬레이션을 움직여보고 gif사진을 보면 n이 커질수록, <br>
허수 축인 i 즉 y축의 1에 가까워지는 것을 알 수 있다 <br>
(여기서는 복소평면좌표라 1을 i로 대신 표시했다) <br>

<p align="center"><iframe  src="https://eulers-formula.netlify.app/" width="650" height = "720" frameborder="0"></iframe></p>

![Desktop View](https://github.com/joonk2/math/raw/main/complex-number/euler-formula/main/euler-formula-metric-theorm.gif)
<br><br><br>

# 참고
1. [공돌이의 수학정리노트 &nbsp;&nbsp; **오일러 공식의 기하학적 의미**](https://angeloyeo.github.io/2020/07/07/Euler_Formula.html)