---
title:  "parametric search"
description: "파라메트릭 서치(Parametric Search) 알고리즘의 개념과 활용 방법을 설명합니다. 이진 탐색을 활용하여 최적의 조건을 만족하는 값을 찾는 방법을 이해하고, 실전 문제 적용 사례를 학습합니다."
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
총 5명의 사람이 50, 30, 40cm의 츄러스를 정확히 똑같은 사이즈로 잘라 한 덩어리씩 배분하려고 한다. <br>
최대 몇 cm으로 나누어먹을 수 있을까?
```
정답 --> 20cm
```

#### 생각해볼 것
- 5인분으로 정확하게 나눌 수 있을때 최대길이인가?

진행과정은 아래와 같겠다

```java
✅ 매개변수 탐색 진행 과정 정리
[초기]
left = 1, right = 50

[1회차]
mid = (1 + 50) / 2 = 25
canCut(25) → 4개 ❌
right = 24

[2회차]
mid = (1 + 24) / 2 = 12
canCut(12) → 2 + 3 + 4 = 9개 ✅
ans = 12, left = 13

[3회차]
mid = (13 + 24) / 2 = 18
canCut(18) → 1 + 2 + 2 = 5 ✅
ans = 18, left = 19

[4회차]
mid = (19 + 24) / 2 = 21
canCut(21) → 1 + 1 + 2 = 4 ❌
right = 20

[5회차]
mid = (19 + 20) / 2 = 19
canCut(19) → 1 + 2 + 2 = 5 ✅
ans = 19, left = 20

[6회차]
mid = (20 + 20) / 2 = 20
canCut(20) → 1 + 2 + 2 = 5 ✅
ans = 20, left = 21

[종료]
left = 21 > right = 20 → break
최종 ans = 20
```
 <br><br>

## 정답 코드

```java
/*
총 5명의 사람이 츄러스를 정확히 똑같은 사이즈로 잘라 한 덩어리씩 배분하려고 한다.
최대 몇 cm으로 나누어먹을 수 있을까?
int[] churos = {50, 30, 40}
정답은 20cm 
*/


import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.util.Arrays;

public class Solution{
	static int[] churos = {50, 30, 40};
	static int people = 5;
	static {
		Arrays.sort(churos);
	}
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int res = parametric_search(churos, people);
		System.out.println(res);
	}
	
	public static int parametric_search(int[] churos, int people) {
		int left = 1;
		int right = upperBound(churos);
		int ans = -1;
		
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
	
	public static boolean canCut(int[] churos, int mid, int people) {
		int cnt = 0;
		for (int i : churos) {
			cnt += (i / mid);
		}
		return cnt >= people;	
	}
	
	public static int upperBound(int[] arr) {
		int max = 0;
		for (int i : arr) {
			if (i > max) {
				max = i;
			}
		}
		return max;
	}
	
	
}
```
