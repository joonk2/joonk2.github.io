---
title:  "binary search"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, binarySearch]
toc: true
toc_sticky: true
date: 2025-06-26
---

# 🔍 Parametric Search (파라메트릭 서치)

파라메트릭 서치란 **어떤 조건을 만족하는 '최적의 값(최소/최대)'을 이진 탐색을 통해 찾는 알고리즘**입니다.  
정확한 값을 찾는 일반 이진 탐색과 달리, 조건을 만족하는 **가장 작은 값 (또는 큰 값)** 을 찾는 데에 초점이 있습니다.

---

## ✅ 활용 예시

- **최대한도로 가능한 최소 비용, 최소한도로 가능한 최대 거리 등**
- **정답이 아니라 정답이 될 수 있는 ‘값의 범위’를 이분 탐색함**
- 대표 문제: 예산 분배, 공유기 설치, 랜선 자르기 등

---

## 🔧 동작 방식

- 일반적인 이진 탐색과 유사하지만,  
  `mid` 값이 조건을 만족하는지 판단 → 만족하면 **더 나은 값**이 있는지 범위 조정


<br><br>

### ⏱️ 시간 복잡도 정리

| 단계        | 시간 복잡도       | 설명 |
|-------------|-------------------|------|
| 이진 탐색 반복 | O(log N)           | 탐색 범위를 절반씩 줄이며 mid 값을 찾음 |
| 조건 판별     | 문제에 따라 다름<br>(보통 O(N) 또는 O(1)) | mid가 조건을 만족하는지 확인하는 연산 |

> 💡 따라서 **전체 시간 복잡도는 `O(log N × 조건 판별 비용)`**  
> 예를 들어, `조건 판별`이 O(N)이라면 총 시간은 `O(N log N)`이 됩니다.

---

<br><br>




## 💡 Java 코드 예시
```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

import java.util.Arrays;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int[] nums = {1, 3, 7, 13, 5, 9};
		int target_num = 7;

		// 정렬된 배열에서 이진 탐색 수행
		Arrays.sort(nums);  // ⭐ 반드시 정렬 필요
		int idx = binarySearch(nums, target_num);

		if (idx != -1) {
			System.out.println("찾은 idx : " + idx);
		} else {
			System.out.println("값을 못 찾겠다");
		}
	}

	public static int binarySearch(int[] arr, int target) {
		int left = 0;
		int right = arr.length - 1;

		while (left <= right) {
			int mid = (left + right) / 2;

			if (arr[mid] == target) {
				return mid; // 값 찾음
			} else if (arr[mid] < target) {
				left = mid + 1; // 오른쪽 탐색
			} else {
				right = mid - 1; // 왼쪽 탐색
			}
		}

		return -1; // 못 찾음
	}
}
```

```cpp
찾은 idx : 2
```

<br><br><br><br>

# 🎯 Lower Bound & Upper Bound

`lower_bound` 와 `upper_bound`는 **정렬된 배열에서 특정 값을 기준으로 경계 인덱스를 찾는 이진 탐색의 변형**입니다.

---

## ✅ 개념 정의

| 함수          | 의미                                                         |
|---------------|--------------------------------------------------------------|
| `lower_bound` | **target 이상**이 처음 나오는 위치를 반환                    |
| `upper_bound` | **target 초과**가 처음 나오는 위치를 반환                    |

> 📌 둘 다 **값이 존재하지 않더라도**, 그 값이 "들어갈 수 있는 자리"를 반환합니다.  
> 즉, 삽입 위치나 범위 구간 등에 활용됩니다.

---

## 🧠 예시 배열

```java
int[] arr = {1, 3, 3, 5, 7, 9};
```




```java
public class BoundsSearch {
    // 정렬된 배열에서 target 이상 첫 위치
    public static int lowerBound(int[] arr, int target) {
        int left = 0;
        int right = arr.length;

        while (left < right) {
            int mid = (left + right) / 2;
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    // 정렬된 배열에서 target 초과 첫 위치
    public static int upperBound(int[] arr, int target) {
        int left = 0;
        int right = arr.length;

        while (left < right) {
            int mid = (left + right) / 2;
            if (arr[mid] <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 3, 5, 7, 9};
        int target = 3;

        int lb = lowerBound(arr, target);
        int ub = upperBound(arr, target);

        System.out.println("lower_bound(3): " + lb); // 1
        System.out.println("upper_bound(3): " + ub); // 3
        System.out.println("3의 개수: " + (ub - lb)); // 2
    }
}
```