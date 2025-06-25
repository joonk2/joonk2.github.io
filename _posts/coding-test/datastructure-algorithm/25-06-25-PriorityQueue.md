---
title:  "PriorityQueue"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, PriorityQueue]
toc: true
toc_sticky: true
date: 2025-06-25
---

## ✅ PriorityQueue (우선순위 큐)

`PriorityQueue`는 **자동 정렬되는 큐**로, 기본적으로 **오름차순(최소값 우선)**으로 요소가 처리됩니다.  
내부적으로는 **힙(Heap)** 자료구조로 구현되어 있습니다.

---

### 📌 주요 메서드

| 메서드                  | 설명                                      |
|-------------------------|-------------------------------------------|
| `add(e)` / `offer(e)`   | 요소 추가                                 |
| `poll()`                | 우선순위 가장 높은 요소 꺼내고 제거        |
| `peek()`                | 우선순위 가장 높은 요소 확인 (제거 안 함) |
| `isEmpty()`             | 큐가 비었는지 여부 확인                   |

---

### 💡 예시 코드

```java
import java.util.PriorityQueue;

public class PriorityQueueExample {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        pq.add(3);
        pq.add(1);
        pq.add(5);

        System.out.println("가장 작은 값 제거: " + pq.poll()); // 1
        System.out.println("현재 가장 작은 값: " + pq.peek()); // 3
        System.out.println("큐가 비었나? " + pq.isEmpty());   // false
    }
}
```