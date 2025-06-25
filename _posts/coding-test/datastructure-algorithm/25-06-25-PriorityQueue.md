---
title:  "PriorityQueue"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, PriorityQueue]
toc: true
toc_sticky: true
date: 2025-06-25
---

✅ PriorityQueue (우선순위 큐)
PriorityQueue는 자동 정렬되는 큐 (기본: 오름차순)
내부는 힙 구조로 구현되어 있음

📌 주요 메서드
메서드	설명
add(e) / offer(e)	요소 추가
poll()	우선순위 가장 높은 요소 꺼내고 제거
peek()	우선순위 가장 높은 요소 확인
isEmpty()	큐가 비었는지 확인


```java
PriorityQueue<Integer> pq = new PriorityQueue<>();

pq.add(3);
pq.add(1);
pq.add(5);

System.out.println(pq.poll()); // 1 (가장 작은 값부터 나옴)
System.out.println(pq.peek()); // 3
```

<br>

🔁 내림차순으로 바꾸고 싶다면:
```java
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
```