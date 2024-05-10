---
title:  "정수삼각형 lv3"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [dp, 연산, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2023-12-26 
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/43105) 

![Desktop View](/assets/img/programmers-py/2023-12-26-integer-triangle/0.png)

![Desktop View](/assets/img/programmers-py/2023-12-26-integer-triangle/1.png)

## ★사전에 알아야 할 것
 --> `피보나치 수열 & dp`
### [ʕっ•ᴥ•ʔっ    <br>    dp를 잘 모르겠다면 이것 클릭 ㄱㄱ](https://joonk2.github.io/posts/dp/)   

## 풀이

![Desktop View](/assets/img/programmers-py/2023-12-26-integer-triangle/2.png)

```python
def solution(triangle):

    for i in range(1, len(triangle)): # i = 몇번째 줄인지
        for j in range(i+1): # j = 줄 안에서 인덱스

            if j == 0: # 가장 왼쪽인 경우
                triangle[i][j] += triangle[i-1][j]

            elif j == i: # 가장 오른쪽인 경우
                triangle[i][j] += triangle[i-1][-1]

            else: # 가운데인 경우, (가장 왼쪽의 우측 것과 가장 우측의 좌측 것 비교)
                triangle[i][j] += max(triangle[i-1][j-1], triangle[i-1][j])
                
    return max(triangle[-1])
```

# 풀이

- **삼각형의 각 위치 (i, j)** —> i번째 행, j번째 열

`for i in range(1, len(triangle)):`

첫번째 행(0)은 그대로 두고, 두번째 행부터 시작해 각 위치 최대값 합 계산

i의 범위 —>    1 ≤ i ≤ len(triangle)-1

`for j in range(i+1):`

j(인덱스)는 열 구하는데 사용 —> 범위: i 까지

### 왼쪽 대각선 위에서 내려오는 경우

            `if j == 0: 
                triangle[i][j] += triangle[i-1][j]`

 ★ 쉽게 이해 —> 열(j)가 없으면 더 이상 왼쪽 아래로 못 내려가게 됩니다

당연히 없으니까 초기값 0 으로 설정

### 오른쪽 대각선 위에서 내려오는 경우

            `elif j == i: 
                triangle[i][j] += triangle[i-1][-1]`

### 가운데에서 내려갈 때

            `else: 
                triangle[i][j] += max(triangle[i-1][j-1], triangle[i-1][j])`

<br><br><br><br><br>

# 참고

[https://soohyun6879.tistory.com/157](https://soohyun6879.tistory.com/157)

[https://velog.io/@seulki971227/프로그래머스-Lv.3-정수-삼각형-Python](https://velog.io/@seulki971227/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-Lv.3-%EC%A0%95%EC%88%98-%EC%82%BC%EA%B0%81%ED%98%95-Python)