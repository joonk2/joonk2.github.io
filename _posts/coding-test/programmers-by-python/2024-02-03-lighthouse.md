---
title:  "등대 lv3"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [BFS, DFS, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2024-02-03
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/133500)

![Desktop View](/assets/img/programmers-py/2024-02-03-lighthouse/0.png)

![Desktop View](/assets/img/programmers-py/2024-02-03-lighthouse/1.png)

![Desktop View](/assets/img/programmers-py/2024-02-03-lighthouse/2.png)

![Desktop View](/assets/img/programmers-py/2024-02-03-lighthouse/3.png)

![Desktop View](/assets/img/programmers-py/2024-02-03-lighthouse/4.png)

```python
import sys
from collections import defaultdict
sys.setrecursionlimit(100000)

A = defaultdict(list)
vis = [False] * 100000

def dfs(node):
    vis[node] = True
    if not A[node]:
        return 1, 0

    on, off = 1, 0
    for v in [v for v in A[node] if not vis[v]]:
        leaf_on, leaf_off = dfs(v)
        on += min(leaf_on, leaf_off)
        off += leaf_on
    return leaf_on, leaf_off

def solution(n, lighthouse):
    for node, v in lighthouse:
        A[node].append(v) 
        A[v].append(node) 

    on, off = dfs(1) 
    return min(on, off)
```

# 해설

```python
sys.setrecursionlimit(100000)
# 재귀함수는 1000~3000번 반복인데 넉넉잡아 10만번으로 늘려줌
```

```python
def dfs(node): # 시작노드인 node를 받아 해당노드에서 출발해 DFS 수행
    vis[node] = True

    if not A[node]: # node가 자식노드라면 node가 켜진 상태로 최소 점등 등대 1개, 꺼졌을 때 0개 반환
      return 1, 0
```

```python
# 내가 부모노드라면
    on, off = 1, 0
    for v in [v for v in A[node] if not vis[v]]:

        leaf_on, leaf_off = dfs(v)
        on += min(leaf_on, leaf_off)
        off += leaf_on
    return on, off
```

```python
#---------------- 공통점 및 차이 -----------------

공통점:  A[u]에서 vis[v]가 False인 노드들에 대해서만 반복

차이
for v in [v for v in A[node] if not vis[v]]:
# 새로운 리스트로 만들어 순회

v for v in A[node] if not vis[v]:
# (리스트 안만듦) v씩 커지며 각 v마다 순회한다 방문하지 않은 곳을
```

```python
A[node].append(v) # 부모노드에 방문할 리프노드 추가
A[v].append(node) # 방문할 리프노드에 부모노드 연결

on, off = dfs(1) # 1부터 탐색 시작
```

<br><br><br>

# 참고

[https://www.ai-bio.info/programmers/133500](https://www.ai-bio.info/programmers/133500)