---
title: "(problem solving) integration by parts and by substitution"
layout: post
categories: [math, calculus]
tags: [math, calculus, 미적분, 큐스터디, 부분적분, 치환적분, integration by parts, integration by substitution]
toc: true
toc_sticky: true
date: 2024-04-27 sat 07:49am
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

1. integration by parts (부분적분)
2. 특수공식 & integration by substitution (치환적분)
3. 예제
 3-1. 부정적분(4개)
 3-2. 특수공식 적분 (5개)
 3-3. 치환 적분 (3개)
```

# 1. integration by parts (부분적분)
**<font color='lightgreen'>-------------------------------------------</font>** <br>
**<font color='red'>(1)</font>** $$\int f(x)g'(x)dx = f(x)g(x)- \int f'(x)g(x)dx$$ <br>
**<font color='red'>(2)</font>** 적분 우선순위도 &nbsp; (지수가 제일 크니까 1순위): <br>
**<u><font color='skyblue'>매우 중요!!!</font></u>** 지수 > 삼각 > 다항함수 > 로그 <br>
**<font color='lightgreen'>-------------------------------------------</font>** <br>

(1)번 증명 <br>
$$\{f(x)g(x)\}' = f'(x)g(x) + f(x)g'(x)$$ <br>
이것은 함성함수의 미분공식이다. 식의 위치를 아래처럼 바꿔보자<br>

$$f(x)g'(x) = \{f(x)g(x)\}'-f'(x)g(x)$$ <br>
이제 여기서 양변 적분하자 <br>
$$\color{red}{\therefore}$$ $$\int f(x)g'(x)dx=f(x)g(x)-\int f'(x)g(x)dx$$ <br>

🤫참! 부분적분 공식에서 f(x)랑 g’(x) 2개에서 위의 적분 우선순위를 참고해서 정하자 <br><br><br>

#### **<font color='red'>ex)</font>** 로그함수의 적분
$$\int lnx dx=x lnx-x+C$$ <br>
위의 식은 이식과 같다 $$\int 1 \cdot lnx dx$$ <br>
자 그럼 위의 우선순위를 참고하여 1을 다항함수로 보고 lnx를 로그함수로 인식하자 <br>
$$\int 1 \cdot lnx dx = x \cdot lnx - \int x \frac{1}{x} dx \\ \quad\quad\quad\quad\quad = xlnx-x+C$$ <br><br>

중요! $$\color{red}{\Rightarrow}$$ 다항함수가 제곱이면 부분적분을 2회, 세제곱이면 3회 하라는 뜻 <br>
ex-1) $$\int x \left(lnx\right)^2dx$$ &nbsp;&nbsp; ex-2) $$\int x \left(lnx\right)^3dx$$ <br><br><br>

# 2. 특수공식 & integration by substitution (치환적분)
### **<font color='skyblue'>😎특수공식</font>**
**<font color='red'>case 1)</font>** 다항함수 x 지수함수 <br>
**<font color='red'>case 2)</font>** 다항함수 x 삼각함수 **<u>(역삼각함수 안됨)</u>** <br>

부분적분공식을 적용하지말고 이순서로 하면 된다. <br>
(왜냐하면 부분적분 2번 넘어가면 오래걸리니까) <br>

**<font color='pink'>-------------------특수공식------------------</font>** <br>
$$\int (\clubsuit \cdot \Delta)dx = 그\cdot적-미\cdot적+미\cdot적-미\cdot적 \cdots\cdots$$ <br>
**<font color='pink'>--------------------------------------------------</font>** <br>

즉 위의 적분 우선순위도를 참고하여 미분 가능할 떄까지 하면 된다 <br>

#### $$\color{red}{ex)}$$ $$\int x^3 sinx dx$$
특수 공식을 적용하여 적분 우선순위는 삼각함수인 것을 알 수 있네 <br>
$$= x^3(-cosx)-3x^2(-sinx)+6x(cosx)-6(sinx)+C$$ <br>
$$\color{red}{\Rightarrow}$$ $$-x^3cosx+3x^2sinx+6xcosx-6sinx+C$$ <br><br>

### **<font color='purple'>🧑‍🔧치환적분</font>**
$$\int x(lnx)^2 dx$$ &nbsp;&nbsp; 이 식은 **<font color='skyblue'>특수공식</font>**에 해당이 안된다. <br>
그런데 특수공식을 적용시킬 방법이 있다 <br>
바로 치환이다 <br>

$$lnx = u$$ <br>
$$x = e^u$$ &nbsp; (밑이 e니까) <br>
자 그리고 $$lnx=u$$ 에서 양변에 미분을 하면?  <br>
$$\color{red}{\Rightarrow}$$ $$\frac{1}{x}dx=du \rightarrow dx=xdu \\ \therefore dx= e^udu$$  <br>

또 **<font color='lightgreen'>적분 우선순위</font>**에 기반하여 이 **<font color='pink'>특수공식</font>**을 적용하자 <br>
$$\int (\clubsuit \cdot \Delta)dx = 그\cdot적-미\cdot적+미\cdot적-미\cdot적$$ <br>

$$\int u^2e^{2u}du$ $\color{red}{=}$$ $$u^2\cdot \left( \frac{1}{2}e^{2u} \right) - 2u\cdot \left( \frac{1}{4}e^{2u} \right) + 2\cdot \left( \frac{1}{8}e^{2u} \right) +C$$ <br>
아까 치환했던 것 다시 대입하자 <br>
$$\color{red}{\therefore}$$ $$\frac{1}{2}x^2\left(lnx\right)^2-\frac{1}{2}x^2\left(lnx\right) + \frac{1}{4}x^2+C$$ <br><br><br>

# 3. 예제
### 3-1. 부정적분(4개)
#### (1) $$\int x lnx dx$$ 

**<font color='red'>sol-(1):</font>** <br>
$$=\frac{1}{2}x^2 lnx-\int\frac{1}{2}x^{2}\frac{1}{x}dx$$ <br>
$$\color{blue}{약분 \rightarrow}$$ $$=\frac{1}{2}x^2 lnx-\int\frac{1}{2}x\cdot dx$$ <br>
$$\color{red}{\therefore}$$  $$\frac{1}{2}x^2 lnx-\frac{1}{4}x^2+C$$ <br><br>

#### (2) $$\int x^3 lnx dx$$

**<font color='red'>sol-(2):</font>** <br>
$$=\frac{1}{4}x^4 lnx-\int\frac{1}{4}x^{4}\frac{1}{x}dx$$ <br>
$$\color{blue}{약분 \rightarrow}$$ $$=\frac{1}{4}x^4 lnx-\int\frac{1}{4}x^{3}dx$$ <br>
$$\color{red}{\therefore}$$  $$\frac{1}{4}x^4 lnx-\frac{1}{16}x^4+C$$ <br><br>

#### (3) $$\int ln(x+x^2)dx$$

**<font color='red'>sol-(3):</font>** <br>
이거랑 사실 같은 말이다 &nbsp; $$\int 1\cdot ln(x+x^2)dx$$ <br>

이어서 전개하면 아래와 같다 <br>
$$= x \cdot ln(x+x^2)-\int x \cdot\frac{1+2x}{x+x^2}dx$$   <br>

$$\color{blue}{약분 \rightarrow}$$ $$= x \cdot ln(x+x^2)-\int \left( \frac{-1}{1+x}+2\right) dx \\ \color{red}{\therefore} xln(x+x^2)+ln \vert 1+x\vert-2x+C$$ <br><br><br>

🎲**<u>(추가 문제) 자 그럼 이식을 다시 미분하려면 어떻게 해야하냐?</u>** <br>
우선 $$xln(x+x^2)$$ 이 부분에 함성함수 미분공식을 적용하고 나머지는 그냥 미분한다 <br>
$$=ln(x+x^2) + x\cdot\frac{1+2x}{x+x^2}+\frac{1}{1+x}-2$$ <br>
$$\color{blue}{약분 \rightarrow}$$ $$=ln(x+x^2) + \frac{2+2x}{1+x}-2$$ <br>
$$\color{red}{\therefore}$$ $$ln(x+x^2)$$ <br><br>

#### (4) $$\int x \left(lnx\right)^2dx$$ &nbsp;&nbsp; (부분적분을 연속 2회 사용해야하는 경우)

**<font color='red'>sol-(4):</font>** <br>

이건 다항함수 x 로그함수네 (위에 **<font color='lightgreen'>적분 우선순위</font>** 참고)<br>
$$=\frac{1}{2}x^2\cdot\left(lnx\right)^2-\int \frac{1}{2}x^{2} 2\left(lnx\right)\frac{1}{x}dx$$ <br>
$$\color{blue}{약분 \rightarrow}$$ $$=\frac{1}{2}x^2\cdot\left(lnx\right)^2-\int x\cdot lnxdx$$ <br>
$$=\frac{1}{2}x^2\cdot\left(lnx\right)^2- \{ \frac{1}{2}x^2 \cdot lnx-\int\frac{1}{2}x^2\cdot\frac{1}{x}dx\}$$ <br>
$$\color{red}{\therefore}$$ $$\frac{1}{2}x^2\cdot\left(lnx\right)^2-\frac{1}{2}x^2lnx+\frac{1}{4}x^2+C$$ <br><br><br>

### 3-2. **<font color='skyblue'>특수공식 적분</font>** (5개)
#### (5) $$\int x^2 cosx dx$$

**<font color='red'>sol-(5):</font>** <br>
$$=x^2sinx-2x(-cosx)+2(-sinx)+C$$ <br>
$$\color{red}{\therefore}$$ $$x^2sinx+2x\cdot cosx-2sinx+C$$ <br><br>

#### (6) $$\int x\cdot sec^2x\cdot dx$$

**<font color='red'>sol-(6):</font>** <br>
$$=x\cdot tanx-\int tanx\cdot dx$$ <br>
$$🍭sec^2x$$를 적분할 때, 왜 $$tanx$$ 이게 되는지 모르겠으면 클릭 $$\color{red}{\Rightarrow}$$ [반갑곰 ʕ ·ᴥ·ʔ](https://joonk2.github.io/posts/derivative/#:~:text=%F0%9D%91%A5-,1%2D3.%20(3)%EC%9D%98%20%EC%A6%9D%EB%AA%85,-f(x)) <br>
잠깐!! $$\int tanx\cdot dx = \int\frac{sin}{cos}dx = -ln\vert cosx\vert+C$$ <br>

위를 참고하여 작성하겠다 <br>
$$=x\cdot tanx-1\left(-ln\vert cosx\vert\right)+C$$ <br>
$$\color{red}{\therefore}$$ $$xtanx+\ln\vert cosx\vert+C$$ <br><br>

#### (7) $$\int4x\cdot sec^2 2x\cdot dx$$

**<font color='red'>sol-(7):</font>** <br>
잠깐 참고하자 $$\int tan2x\cdot dx= \int\frac{tan2x}{cos2x}=-\frac{1}{2}\vert cos2x\vert+C$$ <br>

$$=4x\left(\frac{1}{2}tan2x\right)-4\left(-\frac{1}{4}ln\vert cos2x\vert\right)+C$$ <br>
$$\color{red}{\therefore}$$ $$2x\cdot tan2x+ln\vert cos2x\vert+C$$ <br><br>

#### (8) $$\int x^4e^{-x}\cdot dx$$

**<font color='red'>sol-(8):</font>** <br>
$$=x^4\left(-e^{-x}\right)-4x^3\left(e^{-x}\right)+12x^2\left(-e^{-x}\right)-24x\left(e^{-x}\right)+24\left(-e^{-x}\right)+C$$
$$\color{red}{\therefore}$$ $$e^{-x}\left(-x^4-4x^3-12x^2-24x-24\right)$$

#### (9) $$\int \theta^2sin2\theta \cdot d\theta$$

**<font color='red'>sol-(9):</font>** <br>
<u>key1:</u> &nbsp; 지수 > 삼각 > 다항함수 > 로그 <br>
<u>key2:</u> &nbsp; 특수공식 <br>
$$\color{red}{\therefore}$$ $$-\frac{1}{2}\theta^2cos2\theta+\frac{1}{2}\theta\cdot sin2\theta+\frac{1}{4}cos2\theta+C$$ <br><br>

## 3-3. 치환 적분 (3개)
#### (10) $$\int x\cdot sec^{-1}x\cdot dx$$  &nbsp; (단, x>0)

**<font color='red'>sol-(10):</font>** <br>
<u>참고1:</u> &nbsp; $$\left(sec^{-1}x\right)' = \frac{1}{\vert x\vert \sqrt{x^2-1}}$$ <br>
<u>참고2:</u> &nbsp; $$\int\frac{1}{\sqrt{x}}dx = 2\sqrt{x}+C$$ <br>

$$\int x\cdot sec^{-1}x\cdot dx$$  $$\color{red}{=}$ $\frac{1}{2}x^2sec^{-1}x-\int\frac{1}{2}x^2\cdot \frac{1}{x \sqrt{x^2-1}}dx$$ &nbsp;&nbsp; 여기서 약분 가능<br>
$$\color{red}{=}$$ $$\frac{1}{2}x^2sec^{-1}x-\int\frac{1}{2}x\frac{1}{ \sqrt{x^2-1}}dx$$ <br>
자 여기서 치환하자 <br>
$$x^2-1=u$$ <br>
$$\color{red}{\Rightarrow}$$ $$2xdx=du$$ <br>
$$\color{red}{\therefore}$$ $$xdx=\frac{1}{2}du$$ <br>

치환한 요소로 이어서 다시 전개하자 <br><br>
$$\color{red}{=}$$ $$\frac{1}{2}x^2sec^{-1}x-\frac{1}{4} \int\frac{1}{\sqrt{u}}du$$ <br>
$$\color{red}{=}$ $\frac{1}{2}x^2sec^{-1}x-\frac{1}{4} {2\sqrt{u}}+C$$ <br>
$$\color{red}{\therefore}$$ $$\frac{1}{2}x^2sec^{-1}x-\frac{1}{2} {\sqrt{x^2-1}}+C$$ <br><br>

#### (11) $$\int^1_0 x^3e^{x^2}dx$$ 의 값은? 

**<font color='red'>sol-(11):</font>** <br>
**<font color='orange'>-----------치환하자----------</font>** <br>
$$x^2=u$$ <br>
$$2x\cdot dx=du$$ <br>
$$x\cdot dx=\frac{1}{2}du$$ <br>
**<font color='orange'>------------------------------</font>** <br>

치환 전에 식을 이렇게도 바꿀 수 있지 않을까?<br>
$$\int^1_0 x^2 e^{x^2}x\cdot dx$$ <br>
그리고 x에 1,0을 넣으면 u의 범위가 각각 1,0 이 나오네 <br>
이어서 전개 (특수공식 활용)<br>
$$\color{red}{=}$ $\int^1_0 u e^{u}\cdot \frac{1}{2}du$$ $$\color{red}{\Rightarrow}$$ $$\frac{1}{2}\left[ue^u-1\cdot e^u\right]^1_0$$ <br>
$$\color{red}{=}$$ $$\frac{1}{2}\left[(e-e)-(0-1)\right]$$ <br>
$$\color{red}{\therefore}$$ $$\frac{1}{2}$$  <br><br>

#### (12) $$\int^4_0 cos\sqrt{x}\cdot dx$$의 값은? 

**<font color='red'>sol-(12):</font>** <br>
**<font color='orange'>-----------치환하자----------</font>** <br>
$$\sqrt{x}=u$$ <br>
$$x=u^2$$ <br>
$$dx=2u\cdot du$$ <br>
**<font color='orange'>------------------------------</font>** <br>

x에 4, 0 각각 대입하면 u의 범위는 2,0이 나온다 <br>
$$\color{red}{=}$$ $$\int^2_0 2u\cdot cosu\cdot du = \left[2u\cdot sinu-2(-cosu)\right]^2_0$$ <br>
$$\color{red}{\therefore}$$ $$4sin2+2cos2-2$$ <br><br><br><br><br>

# 참고
1. [권태원 큐스터디 &nbsp;&nbsp;&nbsp; **적분기법 부분적분**](https://www.youtube.com/watch?v=ckJtiE4aLGI&t=9s)
2. **[권태원큐스터디_mathlatte &nbsp;&nbsp;&nbsp; 부분적분의 모든 것, 표를 이용한 적분 (유용한 부분적분/ 대학미적분 / 대학기초수학 )](https://www.youtube.com/watch?v=jiJ5EPEA5uM&list=PLN73OEtodFvQZpffU9mwIav4M0c7mP0HN&index=15)**