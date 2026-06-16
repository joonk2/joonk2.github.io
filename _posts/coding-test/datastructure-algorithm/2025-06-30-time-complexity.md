---
title:  "time complexity"
description: "시간 복잡도(Time Complexity)의 개념과 각종 알고리즘의 시간 복잡도를 설명합니다. O(1)부터 O(N!)까지의 복잡도를 이해하고, 각 복잡도별 가능한 입력 크기를 학습합니다."
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, timeComplexity]
toc: true
toc_sticky: true
date: 2025-06-30
---

# 📊 time Complexity

---

## 1️⃣ 완전 이중 반복문 (Full Nested Loop)



아래 Java 코드는 datastructure 관점에서 접근한 핵심 풀이입니다. 입력 조건과 시간·공간 복잡도를 함께 고려하여 불필요한 연산을 줄이는 방향으로 설계했습니다.

```java
for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
        // 실행 코드
    }
}
```

위 구현은 time complexity의 제약 조건을 만족하도록 자료구조 선택과 반복 범위를 최적화한 결과입니다.


## 📌 완전 이중 반복문의 시간 복잡도

- 각 반복문의 범위: `1 ~ N`

- 전체 반복 횟수:  
$$
N \times N = N^2
$$

- **시간 복잡도**: `O(N²)`

<br><br><br>


## 2️⃣ 감소하는 반복 횟수 (Triangular Loop)

- `i`가 증가함에 따라 `j`의 반복 횟수는 점점 **감소**합니다.

예를 들어:

```java
for (int i = 1; i < N; i++) {
    for (int j = i + 1; j < N+1; j++) {
        // 실행 코드
    }
}
```

각 i에 대해 내부 j 반복문의 횟수는 다음과 같습니다:

i = 1일 때 → j = 2 ~ N → 총 N - 1회

i = 2일 때 → j = 3 ~ N → 총 N - 2회

i = 3일 때 → j = 4 ~ N → 총 N - 3회

...

i = N - 1일 때 → j = N → 총 1회

 
반복 횟수의 총합은 다음과 같습니다:
$$
(N - 1) + (N - 2) + \dots + 1 = \frac{N(N - 1)}{2}
$$




## 📈 시간 복잡도 비교: 완전 반복 vs 감소 반복

- **시간 복잡도**: `O(N²)`  
  *(계수는 줄지만, 최고차항은 `N²`이므로 동일)*

---

## ✅ 차이 요약

| 반복문 구조            | 반복 횟수             | 시간 복잡도 |
|------------------------|------------------------|--------------|
| 완전 이중 반복문       | `N × N = N²`           | `O(N²)`      |
| 감소형 이중 반복문     | `N(N-1) / 2`         | `O(N²)`      |

> ⚠️ 두 구조 모두 **시간 복잡도는 `O(N²`)**이지만,  
> 실제 연산 횟수는 약 **절반 수준**으로 줄어듭니다.

---

<br><br><br>

# 그 외 시간복잡도

### 🟢 O(1): 상수 시간
```java
int a = 10;
int b = a + 5;
```
- 입력 크기와 관계없이 항상 동일한 시간에 실행됨

---
### 🔵 O(log N): 로그 시간
```java
while (n > 1) {
    n = n / 2;
}
```
- 문제 크기를 절반씩 줄여가며 해결하는 방식
- 대표 예시: 이진 탐색

---
### 🔷 O(N): 선형 시간
```java
for (int i = 0; i < N; i++) {
    // 실행
}
```
- 입력 크기만큼 한 번씩 순회

---
### 🕘 O(N log N): 준선형 시간
```java
Arrays.sort(array);
```
- 대부분의 효율적인 정렬 알고리즘이 사용하는 시간 복잡도
- ex) Merge Sort, Heap Sort 등

---

<br><br>

---
### 🔵 O(2^N): 지수 시간
```java
void recur(int n) {
    if (n == 0) return;
    recur(n - 1);
    recur(n - 1);
}
```
- 문제를 모든 조합/경우의 수로 나눠 해결
- ex) 부분 집합 탐색, DFS로 모든 경로 탐색

---
### 🔴 O(N!): 팩토리얼 시간
```java
void permute(int[] arr, int depth) {
    if (depth == arr.length) return;
    for (int i = depth; i < arr.length; i++) {
        swap(arr, i, depth);
        permute(arr, depth + 1);
        swap(arr, i, depth);
    }
}
```
- 모든 순열/경로 탐색에 해당
- N이 조금만 커져도 실행 시간이 폭발적으로 증가

---



## 🧠 정리: 시간 복잡도별 가능 N 최대 크기

| 시간 복잡도     | 대략 가능한 입력 크기 (N) |
|------------------|----------------------------|
| `O(1)`           | 제한 없음                  |
| `O(log N)`       | 수억 이상도 가능           |
| `O(N)`           | 약 10^7 이하               |
| `O(N log N)`     | 약 10^6 이하               |
| `O(N^2)`         | 약 10^4 이하               |
| `O(2^N)`         | N ≤ 20                     |
| `O(N!)`          | N ≤ 10                     |

---