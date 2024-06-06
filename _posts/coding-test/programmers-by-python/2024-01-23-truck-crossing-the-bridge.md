---
title:  "다리를 지나는 트럭 lv2"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [stack, queue, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2024-01-23 
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42583)


![Desktop View](/assets/img/programmers-py/2024-01-23-truck-crossing-the-bridge/0.png)

![Desktop View](/assets/img/programmers-py/2024-01-23-truck-crossing-the-bridge/1.png)

![Desktop View](/assets/img/programmers-py/2024-01-23-truck-crossing-the-bridge/2.png)

![Desktop View](/assets/img/programmers-py/2024-01-23-truck-crossing-the-bridge/3.png)

![Desktop View](/assets/img/programmers-py/2024-01-23-truck-crossing-the-bridge/4.png)

![Desktop View](/assets/img/programmers-py/2024-01-23-truck-crossing-the-bridge/5.png)

```python
from collections import deque
def solution(bridge_length, weight, truck_weights):
    i, t = 0, 1
    q, weightsum = deque(), 0
    
    while i < len(truck_weights):
        while i < len(truck_weights) and weightsum + truck_weights[i] <= weight:
            # 트럭무게, 도로를 빠져나온 시간
            q.append( (truck_weights[i], t + bridge_length) )
            weightsum += truck_weights[i]
            
            i += 1
            t += 1
            # 시간이 t가 되어서 트럭이 탈출해야 하는 상황을 처리합니다.
            if q[0][1] == t:
                w, t = q.popleft()
                weightsum -= w
        
        #  트럭이 탈출하는 시점으로 이동합니다.
        if len(q) > 0:
            w, t = q.popleft() # w만 추출하고 t는 안 건드리고 그대로
            weightsum -= w
        
    # 큐의 트럭들을 모두 탈출시킵니다.
    while len(q) > 0:
        w, t = q.popleft()
    
    return t
```

<br><br><br>

# 참고

[https://www.ai-bio.info/programmers/42583](https://www.ai-bio.info/programmers/42583)