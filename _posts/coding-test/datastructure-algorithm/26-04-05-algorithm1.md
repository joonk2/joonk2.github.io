---
title:  "두뇌를 자극하는 문제 1"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [stack]
toc: true
toc_sticky: true
math: true
date: 2026-04-05
---


<!-- MathJax Script for this post only -->
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ['\\(','\\)'] ],
      displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
      processEscapes: true
    }
  });
</script>



## 🙋‍♂️ 들어가며
이번문제를 통해 내 능지를 파악해보자

문자열 = "o t o o f o f o o o o t"

target = {'t', 'f', 't'}

d = 5;

라고 가정하자

이때 target의 순서대로 d이내 거리만큼 문자열이 연결되면 1을 반환

그렇지 못하면 0을 반환하자

test case를 2개 제시하겠다

```java
#1. test case
o t t o o f o f o o o o t
t f t
5

#1 output
1



#2. test case 
j j j j k k k k l l l l 
j k l
2

#2. output
0
```
<br><br>

## 🤔접근법
우선 testcase 1, 2를 보자

#### testcase 1
```java
cur[1, 11]
next[4, 6]
next[11]
```

#### testcase 2
```java
cur[0,1,2,3]
next[4,5]
불가능
```

<br>

이게 무슨말이냐??

다음 사고의 흐름을 통해 형성되었다

```java
// 1-1. target[0]의 idx 위치를 cur 배열에 저장
// 1-2. cur 배열의 크기가 0 이라면 볼필요 없으니 조기 종료

// 2-1. target[0]의 idx 위치가 cur 배열에 저장되어 있다고 가정하고 target[1]의 위치부터 보자

// 2-2. 예를들어 target[0]과 매칭되는 cur = [1, 11] 일때
	cur[1] = 11,
	d = 5
	start = 11 + 1
	end = 11 + 5
	
	잠깐만 !! 이때 end가 N-1보다 크면 안되니 범위 조정

	아무튼 12 ~ 16 까지 해당되는 target[1]의 원소가 있을때 next배열에 추가하고 next_size 키우기

// 2-3. next_size가 0이라면 못 이어진거니까 종료

// 2-4. 이어져있다면 cur = next, cur_size = next_size 갱신
```
<br><br>


## ✅ 코드

```java
package boj;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;


public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String[] str_arr = br.readLine().split(" ");
		String[] str_target = br.readLine().split(" ");
		int d = Integer.parseInt(br.readLine());
		
		int N = str_arr.length;
		int M = str_target.length;
		
		char[] arr = new char[N];
		char[] target = new char[M];
		
		// 1. 배열 생성
		for (int i = 0; i < N; i++) arr[i] = str_arr[i].charAt(0);
		for (int i = 0; i < M; i++) target[i] = str_target[i].charAt(0);
		
		// 1-2. target[0]의 idx 위치들을 cur 배열에 저장
		int[] cur = new int[N];
		int cur_size = 0;
		for (int i = 0; i < N; i++) {
			if (arr[i] == target[0]) {
				cur[cur_size] = i;
				cur_size++;
			}
		}
		
		// 1-3.  cur배열의 크기가 0이라면 볼필요 없으니 조기종료
		if (cur_size == 0) {
			System.out.println(0);
			return;
		}
		
		// 2-1. target[0]의 idx 위치가 cur 배열에 저장되어있다고 가정
		// target[1]의 위치부터 보자
		boolean success = true;
		for (int t = 1; t < M; t++) {
			int next_size = 0;
			int[] next = new int[N];
			for (int i = 0; i < cur_size; i++) {
				int cur_idx = cur[i];
				int s = cur_idx + 1;
				int e = cur_idx + d;
				
				// 2-2. 가지치기
				if (e >= N) e = N-1;
				
				for (int j = s; j <= e; j++) {
					if (arr[j] == target[t]) {
						next[next_size] = j;
						next_size++;
					}
				}
			}
			// 2-3. next_size가 0이라면 못 이어진거니까 종료
			if (next_size == 0) {
				success = false;
				break;
			}
			
			// 2-4. 이어졌다면 갱신
			cur = next;
			cur_size = next_size;
		}
		
		
		// 3. 판별
		if (success) System.out.println(1);
		else System.out.println(0);
	}
	
	
	
	
}
```