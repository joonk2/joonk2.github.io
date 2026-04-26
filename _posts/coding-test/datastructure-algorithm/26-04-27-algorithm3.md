---
title:  "두뇌를 자극하는 문제 1"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [implementation]
toc: true
toc_sticky: true
math: true
date: 2026-04-27
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

### 조건
- 문자열 arr의 길이 N (1 ≤ N ≤ 1,000)
- target의 길이 M (1 ≤ M ≤ 100)
- 거리 d (1 ≤ d ≤ N)



### test case
```java
#1. input
o t t o o f o f o o o o t
t f t
5

#1 output
1



#2. output 
j j j j k k k k l l l l 
j k l
2

#2. output
0
```
<br><br>

## 🤔접근법
----------------- test case 1번 기준 -----------------

1. 배열 생성 (arr, target)
2. target[0]의 idx를 cur[] 배열에 저장 {<span style="color:red">1</span>, <span style="color:skyblue">2</span>, 12}, &nbsp;&nbsp; cur_size = 3
3. 2번째 target부터 보자. next[], next_size 활용
    - 3-1. 중복 인덱스 생성 방지를 위해 vistied[] 쓰자
    - 3-1.  cur[] 에 저장된 각 원소를 idx+1 ~ idx+d 까지
    - 3-2. 만약 범위 초과시 break if (k >= arr길이) break
    - 3-3. next{<span style="color:red">5</span>, <span style="color:skyblue">7</span>} 이며 12는 범위 초과라 skip 했고 cur[] = next[] 로 갱신
4. next_size == 0 이면 다음 idx로 도달을 못한거니 flag = false 하고 break
5. cur[<span style="color:purple">7</span>] -> next[<span style="color:purple">12</span>] 로 도달 가능



<br><br>

## 코드

```java
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;


public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String[] input_arr = br.readLine().split(" ");
		String[] input_target = br.readLine().split(" ");
		int d = Integer.parseInt(br.readLine());
		
		int N = input_arr.length;
		int M = input_target.length;
		char[] arr = new char[N];
		char[] target = new char[M];
		
		for (int r = 0; r < N; r++) {
			arr[r] = input_arr[r].charAt(0);
		}
		for (int r = 0; r < M; r++) {
			target[r] = input_target[r].charAt(0);
		}
		
		// 1. target[0]의 idx를 cur[]에 저장
		int cur[] = new int[N];
		int cur_size = 0;
		for (int i = 0; i < N; i++) {
			if (target[0] == arr[i]) {
				cur[cur_size] = i;
				cur_size++;
			}
		}
		
		// 2. 2번째 target부터 탐색 시작
		boolean success = true;
		
		for (int i = 1; i < M; i++) {
			char cur_ch = target[i];
			int[] next = new int[N];
			int next_size = 0;
			
			// 3. (핵심) 인덱스 중복 방지
			boolean[] visited = new boolean[N];
			
			for (int j = 0; j < cur_size; j++) {
				int cur_val = cur[j];
				for (int k = cur_val+1; k < cur_val + d + 1; k++) {
					
					// 4. 가지치기 (범위초과 방지)
					if (k >= N) break;
					
					if (!visited[k] && arr[k] == cur_ch) {
						next[next_size] = k;
						next_size++;
						visited[k] = true;
					}
				}
			}
			
			// 5. next_size == 0 이면 도달 못했다는 뜻
			if (next_size == 0) {
				success = false;
				break;
			}
			
			// 6. 그게 아니라면
			cur = next;
			cur_size = next_size;
		}
		
		// 6. 검사
		if (success) System.out.println(1);
		else System.out.println(0);
		
	}
}
```