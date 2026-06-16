---
title:  "삼각함수의 덧셈정리"
layout: post
categories: [math, calculus]
tags: [math, calculus, limit, 극한, 미적분, 큐스터디, 3d1brown]
toc: true
toc_sticky: true
date: 2024-04-21 sun
updated: 
---

#### 🙅‍♂️휴대폰으로 볼 때 혹시 글자나 숫자가 화면에 다 안나오면<span style="color:red">**,**</span> 휴대폰 가로로 돌리시면 됩니다

```markdown
<목차>
1. 삼각함수의 덧셈정리 공식
 1-1 (1)의 증명
 1-2 (2)의 증명
 1-3 (3)의 증명
 1-4 각 3개일 때
2. 예제
```

### preRequisites
1. [원점에서의 sin, cos 좌표의 의미](https://joonk2.github.io/posts/complexnumber-part1/#:~:text=%EC%9B%90%EC%A0%90%EC%97%90%EC%84%9C,%EB%9D%BC%EA%B3%A0%20%ED%96%88%EC%9D%84%20%EB%95%8C%2C) <br>
2. 짤막한 팁 $\Rightarrow$ $tan \theta = \frac{sin \theta}{cos \theta}$ <br> 
3. 삼각함수의 역수⬇️ <br>
$$\begin{cases} csc \theta = \frac{1}{sin \theta} \\ sec\theta = \frac{1}{cos\theta} \\ cot\theta = \frac{1}{tan\theta} \end{cases}$$ <br><br>
![선형대수·수학 개념 설명: preRequisites](/assets/img/math/calculus/trigonometric-plus-minus/1.png)
<br><br>

# 1. 삼각함수의 덧셈정리 공식
(1) $$sin(\alpha + \beta) = sin \alpha \cdot cos \beta + cos \alpha \cdot sin \beta$$ <br>
$$\quad sin(\alpha - \beta) = sin \alpha \cdot cos \beta - cos \alpha \cdot sin \beta$$ <br>
(2) $$cos(\alpha + \beta) = cos \alpha cos \beta - sin \alpha sin\beta$$ <br>
$$\quad cos(\alpha - \beta) = cos \alpha cos \beta + sin \alpha sin\beta$$ <br>
(3) $$tan(\alpha + \beta) = \frac{tan \alpha + tan \beta}{1-tan \alpha \cdot tan \beta}$$ <br>
(4) $$tan(\alpha - \beta) = \frac{tan \alpha - tan \beta}{1+tan \alpha \cdot tan \beta}$$ <br>
![선형대수·수학 개념 설명: 1. 삼각함수의 덧셈정리 공식](/assets/img/math/calculus/trigonometric-plus-minus/2.png)<br>
$$\Delta$$ ABC 넓이 <span style="color:red">**=**</span> $$\Delta$$ ABH 넓이 + $$\Delta$$ ACH 넓이 <br>
$$\Rightarrow$$ $$\frac{1}{2}ab sin (\alpha + \beta) = \frac{1}{2}ah sin \alpha +  \frac{1}{2}bh sin \beta$$ <br>
$$\Rightarrow$$ $$sin (\alpha + \beta) = \frac{h}{b}sin \alpha + \frac{h}{a} sin \beta$$ <br>

아 삼각형을 보니 아래처럼 식을 고칠 수도 있겠네 <br>
$$\Rightarrow$$ $$sin (\alpha + \beta) = cos \beta \sin \alpha + cos \alpha sin \beta$$ <br>
$$\therefore$$  $$sin \alpha \cdot cos \beta + cos \alpha \cdot sin \beta = sin(\alpha + \beta)$$ <br>

★<span style="color:red">**어 잠깐!**</span>
$$sin(-\theta) = -sin\theta$$ <br>
$$cos(-\theta) = cos\theta$$ <br>
$$tan(-\theta) = -tan \theta$$ <br>

이걸 보니 (1)증명으로부터<br>
$$\quad sin(\alpha - \beta) = sin \alpha \cdot cos \beta - cos \alpha \cdot sin \beta$$ 이 식도 자연스럽게 유도되지 않는가?
<br><br>

![수학 개념 설명 다이어그램](/assets/img/math/calculus/trigonometric-plus-minus/3.png)<br>
이것을 보니 `제 2코사인 정리`를 이용하면 되겠네  아래 삼각형을 참고하자 <br>

![수학 개념 설명 다이어그램](/assets/img/math/calculus/trigonometric-plus-minus/4.png)
<br>
제 2코사인 정리: &nbsp;&nbsp;  $x^2 = b^2 + c^2 -2bc \cdot cos\theta$ <br>

이제 다시 원으로 돌아가서 증명해보자 <br>
우선 보니 사잇각이 $$\alpha - \beta$$, 그리고 보라색 선에서 각각  P, Q까지의 거리가 1이네? <br>
$$\overline{PQ}^2 = 1^2 + 1^2 -2 cos(\alpha-\beta)$$  &nbsp;&nbsp; 이 식을 ㄱ이라 하겠다<br>

위의 코사인 제2 법칙 외에, 이번에는 두 점사이의 거리 공식을 이용하면 되겠다 <br>
$$\overline{PQ}^2 = cos(\alpha-\beta)^2 + sin(\alpha-\beta)^2$$ <br>
여기서 $sin^2 \theta + cos^2 \theta = 1$ 인 것은 알고 있겠지? <br>
$$\overline{PQ}^2 = 1+1-2(cos\alpha \cdot cos\beta - sin \alpha \cdot sin\beta)$$ &nbsp;&nbsp; 이 식은 ㄴ이라 하겠다 <br>

<u>아 ㄱ=ㄴ 이네?</u> &nbsp; 약분하고 고치면 $$\overline{PQ}^2 = cos \alpha cos \beta + sin \alpha sin\beta$$ 됨 <br>
여기서 만약에 $$\beta$$ 대신에 $$-\beta$$를 넣으면 $$cos \alpha cos \beta - sin \alpha sin\beta$$가 되므로 <br>
$cos(\alpha + \beta)$가 된다 <br><br>

#### (3)의 증명
$$tan \theta = \frac{sin \theta}{cos \theta}$$ 를 이용해보자 <br>
그러면 $$tan (\alpha + \beta) = \frac{sin (\alpha + \beta)}{cos (\alpha + \beta)}$$ 라고 고칠 수 있겠네 <br>
위의 식을 삼각함수 덧셈법칙을 이용하여 전개해보자 <br>
$$tan (\alpha + \beta) = \frac{sin (\alpha + \beta)}{cos (\alpha + \beta)}$$ <br>
$$\quad\quad\quad\quad\quad = \frac{sin \alpha \cdot cos \beta + cos \alpha \cdot sin \beta}{cos \alpha cos \beta - sin \alpha sin\beta}$$ <br>

여기서 분자, 분모를 $$\div cos \alpha cos \beta$$ 하면 <br>
$$
\begin{align*}
&=\frac{\frac{\sin \alpha}{\cos \alpha} + \frac{\sin \beta}{\cos \beta}}{1 - \frac{\sin \alpha}{\cos \alpha} \cdot \frac{\sin \beta}{\cos \beta}} \\
&= \frac{\tan \alpha + \tan \beta}{1 - \tan \alpha \cdot \tan \beta} \\
&\Rightarrow \tan(\alpha + \beta)
\end{align*}
$$
<br><br>

#### 😎만약에 tan 각도 3개짜리면 어떻게 하지?
$$tan (\alpha + \beta+ \gamma) \Rightarrow tan (\theta+ \gamma)$$ <br>
위처럼 $$\alpha + \beta$$를 $$\theta$$로 치환하여 진행하면 된다 <br><br><br>

# 2. 예제 2개
## 2-1 예제1
좌표평면에서 $\alpha + \beta = \gamma$ 일 때, 점 $P$의 $y$좌표는? <br>
![선형대수·수학 개념 설명: 2-1 예제1](/assets/img/math/calculus/trigonometric-plus-minus/5.png)
<br>

<span style="color:red">**sol:**</span> <br>
문제에서 제시한 $$\alpha + \beta = \gamma$$을 우선 생각하고 시작하자<br>

$$\Delta POC$$에서  $$y$$를 보니 $$tan(\gamma) = \frac{1}{y}$$ 이네, &nbsp; 그럼 $$\Rightarrow y= \frac{1}{tan(\gamma)}$$ <br>
<span style="color:purple">**어??**</span> 가만 보니 $$tan(\alpha+\beta)$$를 통해 구할 수 있겠다 <br>
$$tan(\alpha) = \frac{1}{4}$$, &nbsp;&nbsp; $$tan(\beta) = \frac{1}{2}$$ <br>

자 그럼 $$tan(\alpha+\beta) = \frac{tan\alpha + tan\beta}{1-tan\alpha \cdot tan\beta} = \frac{\frac{1}{4} + \frac{1}{2}}{1- \frac{1}{4} \cdot \frac{1}{2}} = \frac{6}{7}$$ <br>
즉 P좌표는 $$(0, \frac{6}{7})$$이 되어 y는 $$\frac{6}{7}$$ 이다 <br><br>

## 2-2. 예제2
$$\begin{cases} sin \alpha + sin \beta + sin \gamma = 0 \\ cos \alpha + cos \beta + cos \gamma = 0 \end{cases}$$ &nbsp; 일 때, $$cos(\alpha - \beta)$$의 값을 구하시오. <br>

<span style="color:red">**sol:**</span> <br>
$$\begin{cases} (sin \alpha + sin \beta)^2  = (-sin \gamma)^2 \\ (cos \alpha + cos \beta)^2 = (-cos \gamma)^2 \end{cases}$$ &nbsp; 이렇게 변형시켜<br>
위의 식과 아래식을 더하면 대충 A+B=1 꼴로 나오는데 여기서 $$cos(\alpha - \beta)$$랑 같다고 표시하면 풀 수 있다 <br>
$$\therefore$$ 답은 $$-\frac{1}{2}$$가 나온다 <br><br>

## 2-3. 예제3
$$A+B+C=90^\circ$$ 일 때, <br>
$$tan(A)tan(B)+ tan(B)tan(C)+tan(C)tan(A)$$를 구하여라 <br>

<span style="color:red">**sol:**</span> <br>
$$A+B=90^\circ-C$$ $$\color{red}{\Rightarrow}$$ $$tan(A+B) = tan(90^\circ-C) = cot(C)$$ <br>
참고로 $$cot(C) = \frac{1}{tan(C)}$$ <br>
$$\Rightarrow$$ $$\frac{tan(A) + tan(B)}{1-tan(A) \cdot tan(B)} = \frac{1}{tan(C)}$$ <br>
여기서 계산하면 `ㅁ=1` 이런 꼴로 나온다 <br>
만약 각각 A,B,C가 $$30^\circ$$라 하면 $$\frac{1}{\sqrt3} \frac{1}{\sqrt3} + \frac{1}{\sqrt3} \frac{1}{\sqrt3} + \frac{1}{\sqrt3} \frac{1}{\sqrt3} =1$$ 마찬가지로 성립하는게 보인다 <br><br>

# 참고
1. [**큐스터디 전공수학** &nbsp;-&nbsp; 대학수학의 기초/ 미적분 강의 (3시간)](https://www.youtube.com/watch?v=NMvfKKz-fH8) <br>
2. **[제9장: 넓이와 기울기 사이 숨겨진 연결고리 미적분학의 본질](https://www.youtube.com/watch?v=SZiT7ubuPXg)** <br>
3. [**eo** &nbsp;&nbsp; 미적분 기초부터](https://m.blog.naver.com/aza425?categoryNo=92&tab=1)
