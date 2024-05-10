---
title: "lagrangian multiplier"
layout: post
categories: [math, calculus]
tags: [math, calculus, Lagrangian multiplier, 라그랑주 승수법]
toc: true
toc_sticky: true
date: 2024-05-01 wed
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
1. 들어가며
2. 에니메이션 설명
3. 참고
```

# 1. 들어가며
(대부분의 영상과 사진은 [상우쌤의 수학노트](https://www.youtube.com/watch?v=lmD9p6J_-TA) 에서 퍼왔습니다. 선생님 덕분에 쉽게 이해할 수 있었습니다 유용한 자료 공유해주셔서 정말 감사합니다) <br>

### 요약:
![Desktop View](https://github.com/joonk2/math/raw/main/calculus/lagrangian-multiplier/lm-0.gif) <br>
![Desktop View](/assets/img/math/calculus/lagrangian-multiplier/1.png) <br>

최적화문제는 <u>반드시 조건이 있어야하고</u>, 그 예로 g(x,y)=k을 통해 <br>
f(x,y), g(x,y)가 접할 때 f(x,y)의 극댓값 or 극솟값이 형성되는데 <br>
그때 min value나 max value를 찾을 수 있게 된다.  <br>

# 2. 에니메이션 설명
이변수함수 $$f$$로 이루어진 `산`이 있다고 가정하자 <br>
$$f(x,y)=4-x^2-2y^2$$ <br>

![Desktop View](https://github.com/joonk2/math/raw/main/calculus/lagrangian-multiplier/lm-1.gif) <br>

산에 등산로를 내기위해 지도를 펼치니 아래 그림처럼 같아졌고 **<font color='lightgreen'>예상경로</font>** $$g(x,y)$$를 그렸다 <br>
$$g(x,y)=2(x-1)^2-10y+3=0$$ <br>

![Desktop View](/assets/img/math/calculus/lagrangian-multiplier/2.png) <br>

## ⁉️<u>질문</u>
이 **<font color='lightgreen'>예상경로</font>**를 따라 올라갔을 때 최고 높이가 얼마일까? <br>
자 그러면 다시 저 눕힌 모형을 세워보면 실제 등산로는 xy평면에 수직인 곡면과 만나는 선이 된다 <br> 아래 그림은 예상경로에 대한 `실제 등반 가능한 경로를 평면으로 나타낸 것`이다 <br>

![Desktop View](https://github.com/joonk2/math/raw/main/calculus/lagrangian-multiplier/lm-2.gif) <br>

아래 영상은 `예상경로로 올라가서 최고점(최대값)으로 가는 것`을 나타낸 것이다 <br>

![Desktop View](https://github.com/joonk2/math/raw/main/calculus/lagrangian-multiplier/lm-3.gif) <br>

😎ㅇㅎ 사람이 제일 꼭대기에 올라갔을 때가 최고높이니 그걸 등고선에서 찾으면 되겠네 <br>
그리고 그 최고높이는 f(x,y)와 g(x,y) 두 곡선이 접할때겠군 <br>

![Desktop View](/assets/img/math/calculus/lagrangian-multiplier/3.png) <br>

여기서 접점 a, b를 각각 함수 f랑 g에 대입하면 높이가 나오고 <br>
그 접점을 찾는 과정이 바로 `라그랑주 승수법` 이다  <br>

## 여기서 높이를 같게 하려면 어떻게 구할 수 있을까?
![Desktop View](/assets/img/math/calculus/lagrangian-multiplier/4.png)

이 그림은 각각의 두 곡선의 공통접선에 수직인벡터를 표시한 것인데, <br>
같은 높이로 만드려면 기울기벡터(gradient vector)의 방향이 같게 하자 <br> 
아래 그림을 참고하자 <br>

![Desktop View](https://github.com/joonk2/math/raw/main/calculus/lagrangian-multiplier/lm-4.gif) <br>

이 그림을 보면 2개의 gradient vector가 높이는 다르지만 같은 방향일 때가 있다 <br>
그때 만족하는 두 식은 아래와 같다 <br>
**<font color='red'>*참고</font>** $$\bigtriangledown$$는 gradient vector 즉 기울기를 나타낸다 <br>
$$g(a,b)=0 \\ \bigtriangledown f(a,b)=\gamma \bigtriangledown g(a,b)$$ <br>

이때 두 식을 연립방정식으로 찾으면 된다는 것이다 <br>
근데 두 기울기벡터(gradient vector)의 방향은 같아도 크기는 다를 수도 있으니까 차이를 맞추기 위해 $$\gamma$$를 곱해주는데 이게 `라그랑주 승수`다<br>

# 3. 참고
1. [상우쌤의 수학노트 &nbsp;&nbsp;&nbsp; **Lagrange Multiplier Method**](https://www.youtube.com/watch?v=lmD9p6J_-TA)
2. **[Understanding Lagrange Multipliers Visually](https://www.youtube.com/watch?v=5A39Ht9Wcu0)**