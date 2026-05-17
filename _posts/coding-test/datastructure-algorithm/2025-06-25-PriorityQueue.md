---
title:  "PriorityQueue"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, PriorityQueue]
toc: true
toc_sticky: true
date: 2025-06-25
---

# ✅ 우선순위 큐 (PriorityQueue)
`PriorityQueue`는 **힙(Heap)** 기반의 자료구조로, **우선순위가 높은 요소**를 우선적으로 처리하는 큐입니다.  
Java에서는 기본적으로 **Min Heap** 방식으로 구현됩니다.  
`poll()` 시 가장 우선순위가 높은 값이 꺼내지며, 숫자가 작을수록 우선순위가 높습니다.

---

### 🔍 개요
- **내부구조**: 힙(Heap) 기반
- **기본 방식**: Min Heap (가장 작은 값 우선)
- **우선순위 처리**: `poll()` 시 가장 우선순위가 높은 값이 나옴

---

### ⏳ 시간 복잡도 요약

| 연산             | 시간 복잡도 | 설명                          |
|------------------|-------------|-------------------------------|
| `add(e)` / `offer(e)` | O(log N)    | 힙에 원소 삽입                   |
| `poll()`         | O(log N)    | 가장 우선순위 높은 원소 제거       |
| `peek()`         | O(1)        | 가장 우선순위 높은 원소 조회       |
| `contains(e)`    | O(N)        | 특정 원소 포함 여부 확인          |
| `remove(e)`      | O(N)        | 특정 원소 제거                   |

---

### 📍 언제 써야 하는지 (O(log N))
- **항상 가장 작은/큰 값을 빠르게 꺼내야 할 때**

### 📍 언제 쓰지 말아야 하는지 (O(N))
- **전체 순회를 자주 하거나, 중간 삽입/삭제가 빈번할 때**
- **정렬된 순서로 계속 유지되어야 하는 경우** (이 경우 `TreeSet`/`TreeMap`이 더 적합)

---

### 🕒 예제 코드

```java
import java.util.PriorityQueue;

public class PriorityQueueExample {
    public static void main(String[] args) {
        // 우선순위 큐 생성 (기본적으로 Min Heap)
        PriorityQueue<Integer> pq = new PriorityQueue<>();

        // 원소 삽입
        pq.offer(5);
        pq.offer(1);
        pq.offer(10);

        // 가장 우선순위 높은 값 조회 (1이 가장 우선순위)
        System.out.println(pq.peek());  // 1

        // 가장 우선순위 높은 값 제거 (1이 제거됨)
        System.out.println(pq.poll());  // 1

        // 큐 상태 출력
        System.out.println(pq);         // [5, 10]
    }
}
```