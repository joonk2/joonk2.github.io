---
title:  "ArrayDeque"
description: "ArrayDeque 자료구조의 특징과 활용 방법을 설명합니다. 양방향 큐로서의 장점을 이해하고, Java에서의 구현 방법과 실전 활용 사례를 학습합니다."
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, ArrayDeque]
toc: true
toc_sticky: true
date: 2025-06-25
---


# ✅ ArrayDeque

`ArrayDeque`는 **원형 배열 기반**의 **양쪽 끝에서 삽입/삭제**가 가능한 자료구조입니다.  
`Stack`, `Queue`, `Deque` 인터페이스를 모두 지원합니다.

---

### 🔍 개요
- **내부구조**: 원형 배열 기반
- **지원 인터페이스**: `Stack`, `Queue`, `Deque`
- **양쪽 끝에서 삽입/삭제 가능**

---

### ⏳ 시간 복잡도 요약

| 연산                          | 시간 복잡도 | 설명                           |
|-------------------------------|-------------|--------------------------------|
| `addLast(e)`, `addFirst(e)`    | O(1)        | 양 끝에 삽입                    |
| `removeFirst()`, `removeLast()` | O(1)        | 양 끝에서 삭제                 |
| `getFirst()`, `getLast()`      | O(1)        | 양 끝에서 조회                 |
| `contains(e)`                  | O(N)        | 포함 여부 확인 (순차 탐색)     |
| `remove(e)`                    | O(N)        | 중간값 제거 (순차 탐색)        |
| `Iterator / 반복 접근`         | O(N)        | 모든 원소 접근                 |

---

### 📍 언제 써야 하는지 (O(1))
- **양 끝에서 삽입/삭제**가 필요한 경우 (큐, 스택)
- **양 끝 조회**가 빠르게 필요한 경우

### 📍 언제 쓰지 말아야 하는지 (O(N))
- **중간 삽입/삭제/탐색**이 자주 일어날 경우

---

### 🕒 위치별 연산 시간 복잡도

| 위치    | 추가 (`addFirst`, `addLast`) | 삭제 (`removeFirst`, `removeLast`) | 조회 (`getFirst`, `getLast`) |
|---------|-----------------------------|----------------------------------|----------------------------|
| 앞      | O(1)                        | O(1)                             | O(1)                       |
| 중간    | O(N)                        | O(N)                             | O(N)                       |
| 뒤      | O(1)                        | O(1)                             | O(1)                       |

---

### 💡 예제 코드

#### 양쪽 삽입/삭제 예제


아래 Java 코드는 datastructure 관점에서 접근한 핵심 풀이입니다. 입력 조건과 시간·공간 복잡도를 함께 고려하여 불필요한 연산을 줄이는 방향으로 설계했습니다.

```java
Deque<Integer> dq = new ArrayDeque<>();

dq.addFirst(10); // 앞에 삽입
dq.addLast(20);  // 뒤에 삽입
dq.addFirst(5);  // 앞에 또 삽입

System.out.println(dq); // [5, 10, 20]

dq.removeLast();  // 뒤에서 삭제
dq.removeFirst(); // 앞에서 삭제

System.out.println(dq); // [10]
```

위 구현은 ArrayDeque의 제약 조건을 만족하도록 자료구조 선택과 반복 범위를 최적화한 결과입니다.
