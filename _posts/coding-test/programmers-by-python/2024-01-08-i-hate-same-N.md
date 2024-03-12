---
title:  "같은 숫자는 싫어 lv1"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [stack, queue, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2024-01-08 
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/12906) 

![Desktop View](/assets/img/programmers-py/2024-01-08-i-hate-same-N/0.png)

![Desktop View](/assets/img/programmers-py/2024-01-08-i-hate-same-N/1.png)

# 풀이

```python
def solution(arr):
    answer = []
    for i in arr:
        if answer[-1:] == [i]: continue
        answer.append(i)
    return answer
```

![Desktop View](/assets/img/programmers-py/2024-01-08-i-hate-same-N/2.png)

- 만약 answer의 마지막 원소가 현재 순회중인 원소랑 같다면 건너뛰고
    
    혹은 같지 않다면 바로 answer 스택에 추가 —> 즉 중복원소는 추가하지 않겠다.
    
    # 다른 풀이
    
    ```python
    arr = [1,1,3,3,0,1,1] # 편의를 위해 작성
    def solution(arr):
        answer = []
        for i in range(len(arr)):
            if [arr[i]] != arr[i + 1: i + 2]:
                answer.append(arr[i])
        return answer
    
    # 같은 뜻 arr[5:6] == arr[5]
    ```
    
- 현재 순회중인 i가 바로 다음 번의 i랑 같지 않다면 answer스택에 추가
    
    (ex `i==1`, `i+1==3`이면 i를 추가하고 `i+1==3`, `i+2==3` 이라면 i+1을 추가 안함
    
    `i+2 ==3`, `i+3==0`이라면 i+2 추가 —> 이런식으로 i+6 까지 진행
    

2개 코드 비교 `[arr[i]] 이랑 arr[i] 차이`

```python
arr = [1,1,3,3,0,1,1]

    for i in range(len(arr)):
        if [arr[i]] != arr[i + 1: i + 2]:
            answer.append(arr[i])
# answer은 [1,3,0,1]

# ----------------------------------------------------------------------------

    for i in range(len(arr)):
        if arr[i] != arr[i + 1: i + 2]:
            answer.append(arr[i])
# answer은 [1,1,3,3,0,1,1]
		

```

![Desktop View](/assets/img/programmers-py/2024-01-08-i-hate-same-N/3.png)

<br><br><br>

# 참고

[https://deblisher.tistory.com/entry/파이썬-같은-숫자는-싫어lv1](https://deblisher.tistory.com/entry/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EA%B0%99%EC%9D%80-%EC%88%AB%EC%9E%90%EB%8A%94-%EC%8B%AB%EC%96%B4lv1)