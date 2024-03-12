---
title:  "문자열 내 마음대로 정렬하기 lv0"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [lambda, sort, 연산, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2023-12-23 
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/12915) 

![Desktop View](/assets/img/programmers-py/2023-12-23-sort-str-by-my-own/0.png)

![Desktop View](/assets/img/programmers-py/2023-12-23-sort-str-by-my-own/1.png)

## 잠깐! `sorted(a, b)`는 오름차순 순서로 정렬합니다

## <풀이 1>

```python
def solution(strings, n):
    return sorted(strings, key = lambda x: x[n]+x)

== 같은 코드

def solution(strings, n):
    return sorted(strings, key = lambda strings: strings[n] + strings)
```

`sorted(strings, key = lambda x: x[n]+x)`

- strings를 key 방식으로 정렬
- lambda(익명함수) —> 간단한 함수를 인라인으로 정의할 때 사용
    
    (def는 복잡한 함수 정의할 때)
    
- `x == 매개변수`: 임의적으로 추가한 값 ex) 방정식 풀 때 x 사용
    
    (x 를 쓰든, a를 적든 bag를 적든 아무거나 상관 없다.)
    

## <풀이 2>

```python
def solution(strings, n):
    answer = []

    def sorted_key(x):
        return x[n] + x

    sorted_strings = sorted(strings, key=sorted_key)
    for x in sorted_strings:
        answer.append(x)

    return answer
```

    

### <설명>

`for x in sorted_strings:
        answer.append(x)`

- x가 sorted_strings에서 나올 수 있는 모든 문자열들 —>💡n(인덱스)가 0, 1, 2 경우, 잘 생각!
    
    n=0일때: [”bed”, “car”, “sun”]
    
    n=1일때: [”car”, “bed”, “sun”]
    
    n=2일때: [”bed”, “car”, “sun”]
    
    ◆ 이러한 문자열 각각 전부다 x에 대입한다는 것이다.
    

- 그리고 그걸 answer[] 리스트에 추가 후, solution 함수의 return answer로 답 반환

![Desktop View](/assets/img/programmers-py/2023-12-23-sort-str-by-my-own/2.png)

- solution 함수 내부에 sorted_key 함수를 생성해 작업하였다.

## 알게된 것

- return 문이 없으면 def문의 결과를 반환하지 않는다.