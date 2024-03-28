---
title:  "Stack-Queue"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, Stack, Queue]
toc: true
toc_sticky: true
date: 2024-01-23
---

스택과 큐는 차이가 존재하는데, 그 2개를 각자 비교해봅시다!

![Desktop View](/assets/img/data-alg/stack-queue/0.png)

```python
<스택이 제공하는 method>

append()
# list의 가장 마지막에 원소를 추가하는 함수

pop()
# list의 가장 마지막에 원소를 꺼내온다

push()
# 스택에 값을 넣는 연산

top()
# 스택의 가장 위에 있는 자료를 반환하는 연산

empty()
# 스택이 비어있는지의 여부를 반환하는 연산
```

### 문제 : `누가 선물을 먼저 받을까?`

(이 문제를 python으로 구현해보았습니다)

```python
order = ['radish_coongya', 'egg_coongya', 'mushroom_coongya']

def who_is_going_to_get_a_gift(order):
    waiting_line = []
    lucky_dude = []
    for coongya in order:
        if coongya:
            waiting_line.append(coongya)
            if waiting_line[-1] == order[-1]:
                waiting_line.pop(-1)
                lucky_dude.append(coongya)
                break
    return lucky_dude

result = who_is_going_to_get_a_gift(order)
# 함수 호출한 것을 result에 대입

print(result)
# 결과     --->     ['mushroom_coongya']
```

![Desktop View](/assets/img/data-alg/stack-queue/1.png)

## ※스택 활용 방안

- 문자열 역순출력 (사실 reverse()가 더 효과적인듯..)
- 후위 계산법
- 개발 중 오류 해결을 위해, 일을 가장 최근에 한 것부터 싹 되돌아보기

![Desktop View](/assets/img/data-alg/stack-queue/2.png)

```python
<queue가 제공하는 method>

push()
# 큐에 값을 넣는 연산

popleft()
# 큐에서 맨 처음 넣은 자료를 빼는 연산

pop()
# 큐에서 맨 마지막의 자료를 뺌

front()
# 큐의 가장 앞에 있는 자료를 반환하는 연산

back()
# 큐의 가장 뒤에 있는 자료를 반환하는 연산

empty()
# 큐가 비어있는지의 여부를 반환하는 연산

qsize()
# 큐 길이 확인
```

### 문제 : `인형을 바구니에 그림과 같은 순서로 넣은 후, 어떤 순서로 나오게 될까?`

(이 문제를 python로 구현해보았습니다)

```python
import queue

order = ['mushmom_doll', 'pink_teny_doll', 'blue_snail_doll'] #인형 뽑는 순서
how_dolls_come_out_in_sequence = [] #인형 나오는 순서

def doll_picking(order):  
    bucket = queue.Queue()

    for doll in order[:3]:  
        bucket.put(doll)
        if bucket.qsize() == 3:
            break
    
    while not bucket.empty():
        how_dolls_come_out_in_sequence.append(bucket.get())
				# get()은 선입선출은 아닌데, queue에 적용이 되니 여기서는 선입선출

doll_picking(order) # 함수 적용
print(how_dolls_come_out_in_sequence)
```

![Desktop View](/assets/img/data-alg/stack-queue/3.png)

# ※큐 활용방안

- 작업 대기열 `ex)` 프린터의 출력
- 이벤트 처리
- 너비우선탐색(bfs)
- 최단 경로 알고리즘

# 참고

[https://velog.io/@ddhyun93/자료구조알고리즘스택Stack큐Queue](https://velog.io/@ddhyun93/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%EC%8A%A4%ED%83%9DStack%ED%81%90Queue)

[https://velog.io/@combi_jihoon/자료구조-스택-큐python-구현](https://velog.io/@combi_jihoon/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%8A%A4%ED%83%9D-%ED%81%90python-%EA%B5%AC%ED%98%84)

[https://myvelop.tistory.com/57](https://myvelop.tistory.com/57)