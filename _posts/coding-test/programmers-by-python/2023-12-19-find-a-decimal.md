---
title:  "소수 찾기 lv2"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [연산, 에라토스테네스의 체, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2023-12-19
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/12921)

![Desktop View](/assets/img/programmers-py/2023-12-19-find-a-decimal/0.png)

```python
잠깐!
소수란?
1과 자기 자신으로 나누어지는 수 ex) 2, 5, 19
(1은 1밖에 없어서 안됨)
```

# ——————-풀이 2개 ————————

### 1. 에라토스테네스의 체

```python
def solution(n):
    answer=0
    array=[True for i in range(n+1)]
    
    for i in range(2,int(n**(1/2))+1):
        if array[i]==True: 
            j = 2
            while i * j <= n:
                array[i*j] = False
                j += 1

    for i in range(2,n+1):
        if array[i]:
            answer+=1

    return answer
```

```python
<혹은 global을 써서 하는 방법>

answer = 0
def solution(n):
    global answer
    array=[True for i in range(n+1)]
    
    for i in range(2,int(n**(1/2))+1):
        if array[i]==True: 
            j = 2
            while i * j <= n:
                array[i*j] = False
                j += 1

    for i in range(2,n+1):
        if array[i]:
            answer+=1

    return answer
```

### <풀이 1>

`def solution(n):`

`answer=0
array=[True for i in range(n+1)]`

- answer 0으로 초기화
- array라는 리스트를 생성하여 리스트의 길이는 n+1, 각 요소는 True로 설정
- ---> 지정된 범위 내에서 각 i 값에 대해 True 생성

`for i in range(2,int(n**(1/2))+1):`

`if array[i]==True:`

`j = 2`

`while i * j <= n:`

★ 이미 위에 array 배열의 요소를 모두 True로 받기로 설정함

- range(2, ~) —> 소수이기도하고 위의 문제 제한 조건에서 n은 2 ~ 1000000 이하 자연수
- i의 범위 --> 2 ~ n의 제곱근
- 만약 i가 소수가 True면
- j는 2에서 시작하고, while문을 반복한다 —> 왜 j=2 냐면 j가 1이면  `i*j`가 소수가 될 경우가..

- i와 j를 곱해서 n이하까지 반복

`array[i*j] = False
j += 1`

- 소수가 아니라서 False로 설정
- j를 1씩 증가시킴으로써, i의 배수에 대해 계속해서 array 값은 False

`for i in range(2,n+1):`

`if array[i]:
answer += 1`

- 참고 —> `if array[i]:` == `if array[i] == True`
- 남아있는 숫자들(True값인 것들만) 개수를 세준다.

`return answer`

def solution(n) 함수 내의 결과값 반환

## 2. 시간 잡아먹는 코드

```python
-----------------------------------------------------
# 시간 잡아먹는 코드
-----------------------------------------------------
import math
def isPrime(n):
    for i in range(2, int(math.sqrt(n))+1):
        if n % i == 0:
            return False
    return True

def solution(n):
    answer = 0
    for i in range(2, n+1):
        if isPrime(i) == True:
            answer += 1
    return answer
```

### <풀이>

`import math`

math를 import해서 n ** (1/2) 안써도 된다.

`for i in range(2, int(math.sqrt(n))+1):`

- i의 범위: 2 ~ n의 제곱근
- 잠깐!   ex) range(i, n) --> *`i`*에서 *`n-1`*까지
- 그래서 +1을 해준 것이다.

        `if n % i == 0:
        return False`

- 만약 n을 i로 나눴을 때, 나머지가 0이냐?
- 그럼 소수가 아니니, 당연이 False 반환

`return True`

for 문에 대해 True반환 

`def solution(n):`

`answer = 0
for i in range(2, n+1):`

- answer을 0으로 초기화
- i의 범위 —> *2 ~ n*

`if isPrime(i) == True:
answer += 1
return answer`

- 각 수 i에 대해 isprime 함수를 호출하여 확인(소수가 True인가?)
- 소수가 맞다면 answer에 1씩 누적 적립
- for문 i의 범위 2~n에 대해 answer 반환

## 배운 것

![Desktop View](/assets/img/programmers-py/2023-12-19-find-a-decimal/1.png)