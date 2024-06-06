---
title: "오일러공식을 이해하기 위한 쉬운 설명(회전변환)"
layout: post
categories: [math, trigonometric-functions]
tags: [수학, math, 복소수, ComplexNumber, 회전변환, 회전행렬, 삼각함수, 오일러공식, 미분, 적분]
toc: true
toc_sticky: true
date: 2024-04-09 tue 19:17
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


```md
<목차>

1. 들어가며
2. 회전변환 증명
```

# 1. 들어가며
### 질문: 평면 위의 점 (x, y)를 $$\theta$$만큼 회전시키면 좌표가 어떻게 변할까?
![Desktop View](/assets/img/math/Trigonometric_Functions/euler's_formula_1/1.png)

# 2. 회전변환 증명
우선 (x’, y’)를 구하기 위해 아래의 직사각형을 생각해보자
그럼 그 직사각형 역시 $$\theta$$만큼 회전하여 놓이게 될 것이다.<br>
아래는 <span style="color:red">**결과 사진**</span>과 <span style="color:blue">**시뮬레이션.gif**</span>다. <br>
![Desktop View](/assets/img/math/Trigonometric_Functions/euler's_formula_1/2.png)

![Desktop View](https://github.com/joonk2/math/raw/main/complex-number/euler-formula/part1/rotation1.gif)
<br><br><br><br>

이제 이 회전하여 놓인사각형의 초록색 꼭짓점을 보면, <br>
그 회전이동한 사각형의 밑변의 길이는 보라색 선을 통해 이동한 것이니까 $x$가 된다 <br> 
여기서 다시 주황색 직각삼각형을 생각해보자 <br>
주황색 삼각형의 빗변의 길이가 x랑 같으니까  자연스럽게 밑변은 $$xcos \theta$$가 되고, 높이는 
$$x sin \theta$$가 되며 그 점의 좌표는 ($$x cos \theta$$, $$x sin \theta$$)가 된다.
아래는 <span style="color:red">**결과 사진**</span>과 <span style="color:blue">**시뮬레이션.gif**</span>다. <br>

![Desktop View](/assets/img/math/Trigonometric_Functions/euler's_formula_1/3.png)
![Desktop View](https://github.com/joonk2/math/raw/main/complex-number/euler-formula/part2/part2.gif)
<br><br><br><br>

마지막으로 ($$x’, y’$$)의 좌표를 찾기위해 아래의 빨간색 직각삼각형을 생각해보자 <br>
이는 아래 주황색 삼각형과 닮음이다. <br>
왜냐하면 회색 수평선을 그엇을 때 생긴 $$\theta$$각과 합쳤을 때 양쪽 각각 직각이 되기 때문이다. <br>
그리하여 자연스럽게 주황색 삼각형의 모든 각이 빨간색 삼각형의 각들과 닮음으로 일치한다 <br>

빨간색 직사각형은 회전이동을 한것이라 둘다 크기와 길이가 똑같다 <br>
**$ \color{pink}{\Rightarrow} $** 자연스럽게 빨간 삼각형 빗변의 길이는 y가 된다 <br> 
여기서 sin cos 계산하면 $x’$, $y’$의 위치 좌표 값을 계산할 수 있다 <br>
아래는 <span style="color:red">**결과 사진**</span>과 <span style="color:blue">**시뮬레이션.gif**</span>다. <br>

![Desktop View](/assets/img/math/Trigonometric_Functions/euler's_formula_1/4.png)
![Desktop View](https://github.com/joonk2/math/raw/main/complex-number/euler-formula/part3/part3.gif)
<br><br><br>

$x’$, $y’$를 계산해보면 아래와 같이 나온다 <br>
$$x’ = xcos \theta - y sin \theta$$ <br>
$$y’ = x sin \theta + y cos \theta$$
**$ \color{red}{\Rightarrow} $**
$$
\begin{pmatrix} x' \\ y' \end{pmatrix} \rightarrow \begin{pmatrix} cos \theta & -sin \theta \\ sin \theta & cos \theta \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix}
$$
<br><br>
이는 선형대수학의 회전행렬과 복소수의 오일러공식에 연계되는데 추후 관련 글을 올릴 것이다

# 참고
1. [파깨비TV &nbsp;&nbsp; **[이공계 수학 초보자] 회전변환 [공식 유도와 암기] - 이렇게 이해하고 외워라.**](https://www.youtube.com/watch?v=OVPyMijFiEQ&t=179s)
2. [공돌이의 수학정리노트 &nbsp;&nbsp; **복소 고윳값과 고유벡터의 의미**](https://www.youtube.com/watch?v=QWZXf3ChoxI)