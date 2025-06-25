---
title:  "ArrayDeque"
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