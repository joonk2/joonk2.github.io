---
title:  "연속된 부분 수열의 합 lv2"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [two-pointer, sequence, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2024-02-25
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/178870) 

![Desktop View](/assets/img/programmers-py/2024-02-25-partial-sequence/0.png)

![Desktop View](/assets/img/programmers-py/2024-02-25-partial-sequence/1.png)

이 문제는 투포인터 개념을 알면 푸는데 도움이 많이 된다. <br>
투포인터 개념을 잘 모르겠다면 아래 링크를 클릭하자

## [ʕっ•ᴥ•ʔっ <br> 이거 클릭](https://joonk2.github.io/posts/TwoPointer/)

```python
-----------------------------------
sequence = [
    [1, 2, 3, 4, 5],
     [1, 1, 1, 2, 3, 4, 5],
      [2, 2, 2, 2, 2]
    ]
    
k = [7, 5, 6] # 합

return --> [2, 3], [6, 6], [0, 2]
-----------------------------------

def solution(sequence, k):
    answer = []
    end = 0
    interval_sum = 0
		
		# 수열의 길이는 백만 이하라 초기값으로 1000만 설정
    first_setting = 10000000

    for start in range(len(sequence)):
        while interval_sum < k and end < len(sequence):
            interval_sum += sequence[end]
            end += 1

        if interval_sum == k and end - start < first_setting:
            answer = [start,end-1]
            first_setting = end - start
        interval_sum -= sequence[start]

    return answer
```

한 번에 모든 행에 대해 동시에 실행되는 것이 아니라 각 행에 대해 반복문이 순차적으로 실행된다

1. 첫 번째 행 **`[1, 2, 3, 4, 5]`**에 대해 **`k`** 값인 7을 찾는다.
2. 두 번째 행 **`[1, 1, 1, 2, 3, 4, 5]`**에 대해 **`k`** 값인 5를 찾는다.
3. 세 번째 행 **`[2, 2, 2, 2, 2]`**에 대해 **`k`** 값인 6을 찾는다