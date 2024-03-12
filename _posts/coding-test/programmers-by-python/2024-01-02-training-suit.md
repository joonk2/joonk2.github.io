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
    
    set_reserve = set(reserve)-set(lost)  # 여벌이 있으면서 도난 안 당한 학생들
    set_lost = set(lost)-set(reserve)   # 여벌도 없는데 체육복 털려서 체육복이 필요한 학생
    
    for i in set_reserve: # 여분 체육복으로 반복문
      # 체육복이 필요한데 체육복이 있다면, 진짜 체육복이 필요한 학생은 i-1, i+1

        if i-1 in set_lost: 
            set_lost.remove(i-1) 
				# 현재 학생의 번호보다 하나 적은 번호를 가진 학생이 '도난당한 학생 목록'에 있다면 그 학생에게 체육복 빌려줌 
				# 체육복을 빌려주니까 이제 set_lost에 있을 필요가 없어서 remove함
            
        elif i+1 in set_lost: 
            set_lost.remove(i+1) 
				# 현재 학생의 번호보다 하나 많은 번호를 가진 학생이 그 리스트에 있다면 그 학생에게 체육복 빌려줌
				# 위랑 마찬가지

    return n - len(set_lost)
		# 전체 - 체육복 잃어버린 학생들 == 체육 수업 들을 수 있는 학생들
```

- `set(lost)` 랑 `set(reserve)` 왜 사용했냐?
    
    —> 각 학생의 체육복 도난 여부, 여벌 체육복 여부를 중복없이 나타내기 위해,
    
- 왜 `set()` 을 사용했는지?
    
    → 어떤 타입이든 상관 안해서 list형인 reserve와 lost를 처리해주기 때문
    

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