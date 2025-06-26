---
title:  "binary search"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, binarySearch]
toc: true
toc_sticky: true
date: 2025-06-25
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