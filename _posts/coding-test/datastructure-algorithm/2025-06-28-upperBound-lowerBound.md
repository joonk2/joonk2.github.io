---
title:  "upperBound && lowerBound --> binary search"
description: "이진 탐색에서의 lowerBound와 upperBound 개념을 설명합니다. 정렬된 배열에서 특정 값의 개수를 효율적으로 구하는 방법과 백준 10816번 문제 해결 방법을 학습합니다."
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, binarySearch, upperBound, lowerBound]
toc: true
toc_sticky: true
date: 2025-06-26
---



# 📌 이진 탐색에서의 `lowerBound`와 `upperBound`


| 함수 | 의미 | 조건 | 반환값 |
|------|------|------|---------|
| `lowerBound(arr, x)` | `x` 이상(≥)의 첫 위치 | `arr[i] >= x` | `x`가 처음 나타나는 위치 또는 들어갈 위치 |
| `upperBound(arr, x)` | `x` 초과(>)의 첫 위치 | `arr[i] > x` | `x`보다 큰 값이 처음 나타나는 위치 |

이 두 함수는 **정렬된 배열**에서 `x`의 개수, 삽입 위치 등을 빠르게 찾을 수 있도록 해주는 이분 탐색 기반 도구입니다.
---


<br><br><br>

다음 사진은 ```int[] my_cards``` 이다
<br><br>

![알고리즘 문제 풀이 참고 다이어그램](/assets/img/data-alg/upperBound-lowerBound/upperBound-lowerBound.png)
<br>

내가 갖고 있는 given_numbers를 아래와 같다고 가정하자
```java
int[] given_numbers = {17, 1, 2, 3, 4, -5};
```
여기서 given_numbers에 해당되는 숫자의 갯수만큼 순서대로 출력하면 이는 아래와 같이 나올 것이다 

```java
{0, 1, 3, 2, 1, 0}
```

이 그림을 보면 target_number == 2일 때,

lowerBound는 첫 번째 2가 나오는 인덱스에 위치하고,

upperBound는 2를 초과하는 숫자인 3의 첫 번째 인덱스에 위치하는 것을 볼 수 있습니다.

<br>
이처럼 각 숫자의 개수를 구하고자 할 때는
upperBound - lowerBound 연산을 통해 쉽게 계산할 수 있습니다.

예를 들어 target_number == 17이라면,
lowerBound와 upperBound 모두 값이 존재하지 않기 때문에 7이라는 동일한 위치를 반환합니다.
즉,

java
코드 복사
upperBound - lowerBound = 7 - 7 = 0
이 되어 해당 숫자가 배열에 존재하지 않음을 알 수 있습니다.
이는 그림에서도 17이 포함되어 있지 않기 때문에 자연스럽게 이해할 수 있습니다.

<br><br>

# 백준 10816 숫자카드2
실전 연습으로 백준 문제를 풀어봅시다
https://www.acmicpc.net/problem/10816

![백준 10816 숫자카드2 알고리즘 문제 풀이 참고 이미지](/assets/img/data-alg/upperBound-lowerBound/boj-10816-upperbound-lowerbound.jpg)

<br><br>

### 💡아이디어 
값이 존재하지 않을 경우, 두 경계 모두 arr.length가 되어
```java
upperBound - lowerBound = 0
```
이 자동으로 성립되게 만든다.

이를 위해 각 함수에서 res = arr.length로 초기화합시다.
<br><br>

#### 🧾 테스트 예시
```
# 예제입력 2
10
6 3 2 10 10 10 -10 -10 7 3
8
10 17 -5 2 3 4 5 -10


# 출력결과 2
3 0 0 1 2 0 0 2
```

## 💻내가 작성한 코드
```java
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;

import java.util.Arrays;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());
		String[] N_arr = br.readLine().split(" ");
		int[] my_cards = str_to_int(N_arr);
		Arrays.sort(my_cards);
		
		
		int M = Integer.parseInt(br.readLine());
		String[] M_arr = br.readLine().split(" ");
		int[] given_cards = str_to_int(M_arr);
		
		
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < M ; i++) {
			int target_num = given_cards[i];
			int upper = upperBound(my_cards, target_num);
			int lower = lowerBound(my_cards, target_num);
			if (i < M-1) {
				sb.append(upper - lower + " ");
			}
			else {
				sb.append(upper - lower);
			}
		}
		System.out.println(sb.toString().trim());
		
	}
	
	public static int upperBound(int[] my_cards, int target_num) {
		int left = 0;
		int right = my_cards.length - 1;
		int res = my_cards.length;
		
		while (left <= right) {
			int mid = (left + right) / 2;
			if (my_cards[mid] <= target_num) {
				left = mid + 1;
			}
			else if (my_cards[mid] > target_num) {
				res = mid;
				right = mid - 1;
			}
		}
		return res;
	}
	
	
	
	public static int lowerBound(int[] my_cards, int target_num) {
		int left = 0;
		int right = my_cards.length - 1;
		int res = my_cards.length;
		
		while (left <= right) {
			int mid = (left + right) / 2;
			if (my_cards[mid] < target_num) {
				left = mid + 1;
			}
			else if (my_cards[mid] >= target_num) {
				res = mid;
				right = mid - 1;
			}
		}
		return res;
	}
	
	
	
	
	
	public static int[] str_to_int(String[] arr) {
		int[] res = new int[arr.length];
		for (int i = 0; i < res.length; i++) {
			res[i] = Integer.parseInt(arr[i]);
		}
		return res;
	}
	
}
```
