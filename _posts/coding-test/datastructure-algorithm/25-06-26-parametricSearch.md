---
title:  "parametric search"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, parametricSearch]
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

---

<br><br>

# 🍞 예제 
총 5명의 사람이 츄러스를 정확히 똑같은 사이즈로 잘라 한 덩어리씩 배분하려고 한다. <br>
최대 몇 cm으로 나누어먹을 수 있을까?
```
int[] churos = {50, 30, 40}
정답은 20cm
```

```java
/*
총 5명의 사람이 츄러스를 정확히 똑같은 사이즈로 잘라 한 덩어리씩 배분하려고 한다.
최대 몇 cm으로 나누어먹을 수 있을까?
int[] churos = {50, 30, 40}
정답은 20cm 
*/


package swea;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;

import java.util.Arrays;

public class Solution {
	static int[] churos = {50, 30, 40};
	static {
		Arrays.sort(churos);
	}
	static int people = 5;
			
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int res = parametric_search(churos,people);
		System.out.println(res);
	}
	
	public static int parametric_search(int[] churos, int people) {
		int left = 1;
		int right = upperBound(churos);
		int ans = 0;
		
		while (left <= right) {
			int mid = (left + right) / 2;
			if (canCut(churos, mid, people)) {
				ans = mid;
				left = mid + 1;
			}
			else {
				right = mid - 1;
			}
		}
		return ans;
	}
	
	
	public static boolean canCut(int[] churos, int len, int people) {
		int cnt = 0;
		for (int c : churos) {
			cnt += c / len;
		}
		return cnt >= people;
	}
	
	public static int upperBound(int[] arr) {
		int max = 0;
		for (int n : arr) {
			if (n > max) {
				max = n;
			}
		}
		return max;
	}
	
	
	
}
```
