---
title:  "부족한 금액 계산 lv0"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [연산, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2023-12-19
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/82612)

![Desktop View](/assets/img/programmers-py/2023-12-19-paying-shortage/0.png)

![Desktop View](/assets/img/programmers-py/2023-12-19-paying-shortage/1.png)

<br><br><br>
*checklist*
- 금액이 부족하지 않으면 0을 return 해라
- count 1부터 시작
- 얼마나 모자라는지 return

```python
def solution(price, money, count):
    pay = 0
    for i in range(1, count+1):
        pay += (price * i)
    
    if money < pay:
        return (pay-money)
    else:
        return 0
```

pay(지출)라는  임의값 설정

반복문을 1~count 번 만큼 반복, 가격 곱한 것을 다 더해주고

만약 그 지출합이 가진 돈보다 커지면 0을 return한다. 

### 2줄 코드

```python
def solution(price, money, count):
    return max(0,price*(count+1)*count//2-money)
```

![Desktop View](/assets/img/programmers-py/2023-12-19-paying-shortage/2.png)