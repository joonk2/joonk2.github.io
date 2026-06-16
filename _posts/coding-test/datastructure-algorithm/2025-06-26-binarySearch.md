---
title:  "binary search"
description: "이진 탐색(Binary Search) 알고리즘의 개념과 구현 방법을 설명합니다. 정렬된 배열에서의 효율적인 탐색 방법을 이해하고, Java에서의 구현 방법과 시간 복잡도를 학습합니다."
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, binarySearch]
toc: true
toc_sticky: true
date: 2025-06-26
---

# 🔍 Binary Search (이진 탐색)
이진 탐색(Binary Search)은 **정렬된 배열**에서 특정 값을 빠르게 찾는 알고리즘입니다.  
탐색 범위를 절반씩 줄여가며 원하는 값을 찾기 때문에 **시간 복잡도는 O(log N)** 입니다.

---

<br><br>

## ✅ 동작 조건

- **배열이 반드시 오름차순으로 정렬되어 있어야 한다.**
- 정렬되지 않은 배열에서 이진 탐색을 수행하면 **정확한 결과를 보장할 수 없다.**

---

<br><br>

### ⏱️ 시간 복잡도 정리
| 경우 | 시간 복잡도 | 비교 횟수 (최대) | 설명 |
|------|--------------|------------------|------|
| 최선 | O(1)         | 1                | mid가 처음부터 target일 때 |
| 평균 | O(log N)     | log₂N            | 탐색 범위를 반복적으로 반씩 줄임 |
| 최악 | O(log N)     | log₂N            | 가장 끝에 있거나 없는 경우까지 탐색 |


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


<br><br><br>

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