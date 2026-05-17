---
title:  "bitmasking"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, bitmasking]
toc: true
toc_sticky: true
date: 2025-06-20
---

## 💡 비트마스크로 부분집합 다루기

부분집합을 구할 때 재귀나 백트래킹을 많이 쓰지만,  
비트마스크를 활용하면 **훨씬 간단하고 빠르게** 구현할 수 있습니다.  
이번 포스트에서는 `{1, 2, 3, 4, 5}` 집합을 대상으로  
**합이 5인 부분집합의 개수를 구하는 방법**을 소개합니다.

---

## ✅ 기본 개념: 비트마스크란?

`N`개의 원소가 있을 때, 부분집합의 총 개수는 `2^N`입니다.  
0부터 `2^N - 1`까지의 숫자를 **이진수로 표현**하면,  
각 비트가 **집합에 포함되었는지 여부**를 나타낼 수 있습니다.



```java

// 1 << 3 = 1000 (8),   H[3]이 여기에 해당
// 1 << 4 = 10000 (16),  H[4]가 여기에 해당
int i = 24; // 2진수로 11000
int[] H = {1, 2, 3, 4, 5};
if ((i & (1 << j)) != 0) {
    sum += H[j];  // j == 3 또는 j == 4일 때만 실행됨 → H[3], H[4]가 포함됨
}
```

위 코드를 간략하게 요약하면 <br>
예를 들어, `i = 24 (11000)`일 때때  
- 이진수 `11000`은 j = 4, 3 위치가 1이라는 뜻이고  
- 이는 `H[4]`와 `H[3]`이 부분집합에 포함되었다는 의미입니다.
<br><br><br><br>

## 🧩 실습 -> 합이 5인 부분집합의 개수 구하기

```java
public class SubsetSumCount {
    public static void main(String[] args) {
        int[] H = {1, 2, 3, 4, 5};
        int N = H.length;
        int target = 5;
        int count = 0;

        int subset_cnt = 1 << N;  // 부분집합 개수 = 2^N

        for (int i = 0; i < subset_cnt; i++) {
            int sum = 0;

            for (int j = 0; j < N; j++) {
                // i의 j번째 비트가 1이라면 → H[j] 포함
                if ((i & (1 << j)) != 0) {
                    sum += H[j];
                }
            }

            // 합이 target(5)인 경우만 count 증가
            if (sum == target) {
                count++;
            }
        }

        System.out.println("합이 " + target + "인 부분집합 개수: " + count);
    }
}
```

🔍 출력 결과
```
합이 5인 부분집합 개수: 3
```