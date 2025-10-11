---
title:  "back_tracking"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [back_tracking]
toc: true
toc_sticky: true
date: 2025-10-11
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


## 1. 백트랙킹(Backtracking) 개념

백트랙킹은 "모든 경우의 수"를 탐색하는 완전탐색의 일종으로, 불필요한 경로(더 이상 해답이 될 수 없는 상태)는 미리 탐색하지 않고 가지치기(pruning)해서 효율을 올리는 알고리즘입니다.

- 트리의 각 가지(상태공간)를 재귀적으로 탐색, 필요한 경우 이전 상태로 되돌아가 다른 선택을 시도
- 깊이 우선 탐색(DFS)과 동작 방식이 유사하며, 특히 조합/순열/최적화 문제에 자주 쓰입니다

## 2. 문제 설명
### [눈덩이 굴리기 --> boj 21735](https://www.acmicpc.net/problem/21735)
(제한시간 -> 1초)

눈송이들이 많은 동네인 숙명여대 앞마당에서 눈사람 만들기 대회를 연다. 앞마당의 길이는 
$N$이고 위치 
$1$부터 위치 
$N$ 까지만 눈이 쌓여있다. 위치 
$i$에 눈이 
$a_i$만큼 쌓여있다. 대회 규칙은 해당 앞마당에서 
$M$초 동안 눈덩이를 굴려 눈사람을 만드는 것이다. 눈덩이의 시작 크기는 
$1$이다. 눈덩이의 시작 위치는 
$0$이다.

가장 큰 눈사람을 만들고 싶던 수수는 눈덩이를 굴리는 법을 연구했다. 눈덩이를 굴리는 방법에는 두 가지가 있다. 눈덩이를 굴리거나 던질 때 1초가 소모된다.

눈덩이를 현재 위치 +1칸으로 굴린다. 현재 칸의 위치를 
$i$라고 하면 눈덩이의 크기는 
$a_{i+1}$ 만큼 늘어난다.
눈덩이를 현재 위치 +2칸으로 던진다. 눈덩이가 착지하며 충격을 받아 눈덩이의 크기는 원래의 크기의 반으로 줄어들고  현재 칸의 위치를 
$i$라고 하면 눈덩이의 크기는 
$a_{i+2}$ 만큼 늘어난다. 이 때 소수점은 절사한다. 눈덩이를 던져 크기가 
$0$이 되어도 눈덩이는 사라지지 않는다.
눈덩이가 앞마당의 끝에 도달한 경우 남은 시간과 관계없이 눈덩이 굴리기는 끝이 난다. 대회 시간 내에 가장 크게 만들 수 있는 눈덩이의 크기를 구하는 프로그램을 작성해보자.

<br>

#### *입력*
첫째 줄에 공백을 기준으로 앞마당의 길이 N ($1 \leq N \leq 100$), 대회의 시간 M ($1 \leq M \leq 10$)이 주어진다.


둘째 줄에 길이가 
$N$인 수열 
$a$가 주어진다. (
$1 \leq a_i \leq 1\,000\,000$)
<br><br><br>

#### *접근법*
해당문제는 1초로 java 1억 연산 이내에 이루어져야한다. <br>
문제를 보면 조건이 2개라는 것을 알 수 있다. <br>
<u>+1칸, +2칸으로 던지는 것이다</u> <br>
이것을 통해 1차원 배열을 활용한 back_tracking이 가능할지 최악의 실행시간을 계산해보자 <br>
조건이 2개고 완전탐색이니 아래와 같겠다 <br>
$O(2^{M-1})$ <br>

$\therefore$ $2^{9}$ 일때 512로 1억 연산 이내에 충분히 계산 가능 --> back tracking ㅇ


<br><br><br>

## 3. 코드
```java
package boj;

import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;


public class Main {
	static int N, M;
	static int max_size = Integer.MIN_VALUE;
	static int[] a;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String[] NM = br.readLine().split(" ");
		N = Integer.parseInt(NM[0]);
		M = Integer.parseInt(NM[1]);
		String[] s_arr = br.readLine().split(" ");
		a = new int[N];
		for (int i = 0; i < N; i++) {
			a[i] = Integer.parseInt(s_arr[i]);
		}
		back_tracking(-1,0,1);
		System.out.println(max_size);
	}
	
	
	
	
	static void back_tracking(int idx, int t, int cur_size) {
		
		// renewal
		max_size = Math.max(cur_size, max_size);
		
		// pruning
		if (idx >= N-1) {
			return;
		}
		
		// pruning
		if (t == M) {
			return;
		}
		
		if (idx + 1 < N) {
			back_tracking(idx+1, t+1, cur_size + a[idx+1]);
		}
		
		if (idx + 2 < N) {
			back_tracking(idx+2, t+1, (cur_size/2) + a[idx+2]);
		}
	}
	
	
}
```