---
title:  "큰 수 만들기 lv2"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [greedy, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2024-01-03 
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42883) 

![Desktop View](/assets/img/programmers-py/2024-01-03-making-a-big-number/0.png)

![Desktop View](/assets/img/programmers-py/2024-01-03-making-a-big-number/1.png)

## `입출력 예`를 보니 number에서 숫자를 k번 만큼 차감하여 제일 큰 수로 반환하네, 물론 `자리 배치는 고정`

```python
def solution(number, k):
    storage = [] # Stack
    
    for num in number:
        while k > 0 and storage and storage[-1] < num:
            storage.pop()
            k -= 1
        storage.append(num)
        
    return ''.join(storage[:len(storage) - k])
						# 괄호 안에 든 것을 문자열로 결합
```

## 헷갈리지 말자!!

```python
len(storage) == 6

:len(storage) == [1, 2, 3, 4, 5, 6]
```

![Desktop View](/assets/img/programmers-py/2024-01-03-making-a-big-number/2.png)

![Desktop View](/assets/img/programmers-py/2024-01-03-making-a-big-number/3.png)

![Desktop View](/assets/img/programmers-py/2024-01-03-making-a-big-number/4.png)

`def solution(number, k):` <br>
`storage = []`

solution 함수 내에 스택으로 사용할 빈 리스트 초기화

    `for num in number:`
        `while k > 0 and storage and storage[-1] < num:`

- num이 주어진 number 안에서 순회한다, 이 3가지 조건이 맞을 동안만

**k>0** <br>
--> 아직 제거할 횟수(k)가 남았는지 확인

and storage <br>
 --> 그리고 storage라는 스택이 비어 있지 않고

**and storage[-1] < num** <br>
--> 현재 순회중인 num이 스택의 마지막 숫자보다 클 때

            `storage.pop()
            k -= 1
        storage.append(num)`

- 위의 while의 3가지 조건에 동시에 부합한다면 storage라는 스택의 마지막 숫자 제거
- 그리고 제거할 횟수(k)를 1개 차감하고 그 숫자를 스택에 추가한다.

`return ''.join(list[:len(list) - k])`

```
2개로 나누어보자
--->     list[:len(list) - k]

- 리스트 길이의 처음부터 계산해 k를 뺀것
‘’.join(?)

- 선택된 리스트 요소들을 문자열로 결합
```

# 다른 코드

```python
def solution(number, k):
    stack = []
    for n in number:
        while len(stack)>0 and k>0 and stack[-1]<n:
            stack.pop()
            k -= 1
        stack.append(n)
    if k:
        return number[:-k]    # ex) number[:-4]  뒤에서 4개까지 빼고 숫자 싹다 갖고 오기
    else:
        return "".join(stack)
```

# 또 다른 코드

```python
def solution(number, k):
    storage = []  
    for i, num in enumerate(number):

        while storage and storage[-1] < num and k > 0:
            storage.pop()  
            k -= 1
            
        if k == 0:
            storage += list(number[i:])
            break
            
        storage.append(num)
    storage = storage[:-k] if k > 0 else storage

    return ''.join(storage)
```

- `storage = storage[:-k] if k > 0 else storage`
    
    k가 참이면 storage 스택의 마지막에서 k번까지 제외하고 가져오고
    
    그 외는 스택을 그대로 유지한다.
    
<br><br><br>

# 참고

[https://velog.io/@soo5717/프로그래머스-큰-수-만들기-파이썬](https://velog.io/@soo5717/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%ED%81%B0-%EC%88%98-%EB%A7%8C%EB%93%A4%EA%B8%B0-%ED%8C%8C%EC%9D%B4%EC%8D%AC)

[https://scarletbreeze.github.io/articles/2019-07/pythonKit문제풀이(4)탐욕법큰수](https://scarletbreeze.github.io/articles/2019-07/pythonKit%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4(4)%ED%83%90%EC%9A%95%EB%B2%95%ED%81%B0%EC%88%98)