---
title:  "체육복 lv1"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [greedy, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2024-01-02 
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42862) 

![Desktop View](/assets/img/programmers-py/2024-01-02-training-suit/0.png)

![Desktop View](/assets/img/programmers-py/2024-01-02-training-suit/1.png)

![Desktop View](/assets/img/programmers-py/2024-01-02-training-suit/2.png)

이걸 토대로 문제를 풀려면, 우리가 구해야 할 값인 `체육수업에 최대 참여가능 학생 수`에 대해 

참고해야 할 부분은 case1, case3입니다.

## 파란 선, 보라색 선이 키 포인트!

# 풀이 1

```python
def solution(n, lost, reserve):
    _lost = set(lost)-set(reserve)
    _reserve = set(reserve)-set(lost)
    
    for i in _reserve:
        if i-1 in _lost:
            _lost.remove(i-1)
        elif i+1 in _lost:
            _lost.remove(i+1)
            
    answer = n-len(_lost)
    return answer
```
<br><br><br>

# 풀이 2

```python
def solution(n, lost, reserve):
    # 정렬
    lost.sort()
    reserve.sort()
	
    # lost, reserve에 공통으로 있는 요소 제거
    for i in reserve[:]:
        if i in lost:
            reserve.remove(i)
            lost.remove(i)
	
    # 체육복 빌려주기(나의 앞 번호부터 확인)
    for i in reserve:
        if i-1 in lost:
            lost.remove(i-1)
        elif i+1 in lost:
            lost.remove(i+1)
    
    return n-len(lost)
```

- `for i in reserve[:]:`
    
    reserve 복사본을 생성
    

# *알게된 것

`set()`

- 중복된 것 제거

```python
set_a = set(a) - set(b)  
```

<br><br><br>

# 참고

[https://codingkwon.tistory.com/189](https://codingkwon.tistory.com/189)

[https://dduniverse.tistory.com/entry/프로그래머스-체육복-파이썬-python](https://dduniverse.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%B2%B4%EC%9C%A1%EB%B3%B5-%ED%8C%8C%EC%9D%B4%EC%8D%AC-python)