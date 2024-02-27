---
title:  "달리기 경주 lv1"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [hash, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2023-12-13
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/178871)

![Desktop View](/assets/img/programmers-py/2023-12-13-running-race/0.png)

![Desktop View](/assets/img/programmers-py/2023-12-13-running-race/1.png)

```python
def solution(players, callings):

    hashmap = dict()
    for i,v in enumerate(players):
        hashmap[v] = i
    for name in callings:
        front, back = hashmap[name]-1, hashmap[name]
        hashmap[players[front]], hashmap[players[back]] = back, front
        players[front], players[back] = players[back], players[front]

    return players
```

### <해설>

```python
문제를 잘 보자
등수를 바꿔야 한다!
이름이 등수 순서대로 담긴 players 리스트
해설진이 부른 이름 배열인 callings
```

![Desktop View](/assets/img/programmers-py/2023-12-13-running-race/2.png)

<br><br><Br><br>

# ★참고

enumerate는 튜플형태로 반환

튜플?? → 여러 요소들을 하나의 묶음으로 만든 자료구조(변경 불가)

![Desktop View](/assets/img/programmers-py/2023-12-13-running-race/3.png)

```python
players[front], players[back] = players[back], players[front]
```

**`players[front]`**와 **`players[back]`**의 값을 서로 교환

```python
players[front], players[back] = back, front
```

**`back`**과 **`front`**의 값을 각각 **`players[front]`**와 **`players[back]`**에 대입