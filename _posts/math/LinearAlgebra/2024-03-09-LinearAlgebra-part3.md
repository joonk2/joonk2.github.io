---
title: "[선형대수학] 3강. 수학적 벡터 (벡터공간)"
layout: post
categories: [math, LinearAlgebra]
tags: [math, LinearAlgebra]
toc: true
toc_sticky: true
date: 2024-03-09 sat 21:20
---

```python
*참고

1. 대수구조
 1-1) 대수구조
 1-2) 여러 대수구조
2. 벡터공간
 2-1) 벡터공간
 2-2) 선형생성 (span)
 2-3) 선형독립
3. 여러 벡터공간
 3-1) Norm공간
 3-2) 내적공간
 3-3) 유클리드공간
4. 기저 & 차원(5개)
5. 예제(5개)
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
우선 대수학부터 알아야 할 것입니다

대수학 —> 대수구조를 연구하는 학문

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
![Desktop View](/assets/img/math/LinearAlgebra/part3/3.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/4.png)

## 2-2) 선형생성 (span)
### (1) 부분벡터 공간
벡터공간 V상에서 정의된 덧셈과 스칼라배에 대해 그 자체로서 벡터공간이 되는 V의 부분집합 W를 V의 부분벡터공간 또는 부분공간이라 한다
<br>

### (2) 선형생성
![Desktop View](/assets/img/math/LinearAlgebra/part3/5.png)
<br>

임의의 실수k, m은 F라는 실수집합에 속합니다. <br>
S라는 공간은 `R**2`[2차원 실수벡터 공간(aka 2차원 유클리드 공간)]을 생성합니다 <br>
여기서의 핵심은 S인 임의의 벡터집합 (1,0), (0,1)로 실수집합 안의 임의의 실수인 k,m 을 이용해 모든 선형결합 가능하다는 것입니다
<br><br>

## 2-3) 선형독립
이 개념은 특히 응용분야에서 중요합니다 <br>
why? --> 이런 정보들은 계산에 복잡함의 정도를 미리 예견해줌
![Desktop View](/assets/img/math/LinearAlgebra/part3/6.png)
![Desktop View](/assets/img/math/LinearAlgebra/part3/j1.jpeg)
![Desktop View](/assets/img/math/LinearAlgebra/part3/7.png)
<br><br><br>

# 3. 여러 벡터 공간
## 3-1) Norm 공간
![Desktop View](/assets/img/math/LinearAlgebra/part3/8.png)
<br><br>

## 3-2) 내적공간
![Desktop View](/assets/img/math/LinearAlgebra/part3/9.png)
![Desktop View](/assets/img/math/LinearAlgebra/part3/10.png)
<br><br>

## 3-3) 유클리드 공간
![Desktop View](/assets/img/math/LinearAlgebra/part3/11.png)
<br><br>

# 4. 기저 & 차원 (5개)
![Desktop View](/assets/img/math/LinearAlgebra/part3/12.png)

```python
# 부가설명
①기저
②차원
```

![Desktop View](/assets/img/math/LinearAlgebra/part3/13.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/14.png)
<br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/15.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/16.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/17.png)
![Desktop View](/assets/img/math/LinearAlgebra/part3/18.png)
<br><br><br><br>

# 5. 예제 (5개)
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
<br><br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/26.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/27.png)

<br><br><br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/28.png)
<br>

![Desktop View](/assets/img/math/LinearAlgebra/part3/29.png)
<br><br><br><br><br>


# 참고
**[[선형대수학] 3강. 수학적 벡터 (벡터공간)](https://www.youtube.com/watch?v=Q8NkThsTp_g&list=PL127T2Zu76FuVMq1UQnZv9SG-GFIdZfLg&index=23)**