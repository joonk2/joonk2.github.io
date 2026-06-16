---
title:  "특별한 배열"
layout: post
categories: [coding-test, datastructure-algorithm, implementation] 
tags: [implementation]
toc: true
toc_sticky: true
math: true
date: 2026-05-11
---

## 문제
n, jump가 주어질때 배열을 생성해보자

### n = 5, jump = 3
![n = 5, jump = 3 알고리즘 문제 풀이 참고 이미지](/assets/img/data-alg/implementation/special_arr/1.png)
<br>

### n = 4, jump = 2
![n = 4, jump = 2 알고리즘 문제 풀이 참고 이미지](/assets/img/data-alg/implementation/special_arr/2.png)


### n = 4, jump = 3
![n = 4, jump = 3 알고리즘 문제 풀이 참고 이미지](/assets/img/data-alg/implementation/special_arr/3.png)

<br><br>

### 조건 
2 <= n <= 100

1 <= jump <= n



<br><br>

## 🙋‍♂️ 들어가며
문제를 읽어보니 규칙이 있더라, 먼저 외부테두리를 돌고 내부테두리를 도는 것이다.

그리고 테두리의 크기는 특정한 규칙을 통해 갱신되는 것을 알 수 있었다

![🙋‍♂️ 들어가며 알고리즘 문제 풀이 참고 이미지](/assets/img/data-alg/implementation/special_arr/explain_1.jpg)
<br><br>

![🙋‍♂️ 들어가며 알고리즘 문제 풀이 참고 이미지](/assets/img/data-alg/implementation/special_arr/explain_2.jpg)
<br><br>

### input-1
```java
5
3
```

### output-1
```java
[1, 24, 15, 2, 10]
[6, 17, 13, 7, 21]
[23, 18, 9, 20, 3]
[12, 14, 8, 22, 19]
[5, 25, 16, 4, 11]
```

<br>

### input-2
```java
4
2
```

### output-2
```java
[1, 9, 2, 13]
[14, 7, 12, 3]
[6, 16, 8, 10]
[11, 5, 15, 4]
```

<br>

### input-3
```java
4
3
```

### output-3
```java
[1, 12, 10, 2]
[13, 5, 9, 7]
[11, 6, 15, 16]
[4, 8, 14, 3]
```

<br><br><br>



<br>

## ✅ 코드
```java
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.util.Arrays;


public class Solution {
	static int[] dr = {0,1,0,-1};
	static int[] dc = {1,0,-1,0};
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int jump = Integer.parseInt(br.readLine());

		// 0-1. 초기값
		int[][] arr = new int[n][n];
		int num = 1;
		arr[0][0] = num;
		num++;
		
		// 0-2. 초기 세팅 (첫 시작점은 맨 왼쪽위 테두리에서 1개 전)
		int cr = 0;
		int cc = -1;
		int start_boundary = 0;
		int end_boundary = n;
		int size = n-2;
		int temp_jump_cnt = 0;
		
		// 1-1. 배열 생성
		while (true) {
			int d = 0;
			
			// 1-2. 테두리 전체 길이 처리
			int temp_boundary_total = 0;
			if (size < 0) {
				temp_boundary_total = 1;
			}
			else if (size >= 0) {
				temp_boundary_total = (size*4) + 4;
			}
			
			// 1-3. 테두리 갯수 구하기
			int boundary_cnt = 0;
			
			// 2-1. 테두리 검사
			while (boundary_cnt < temp_boundary_total) {
				int nr = cr + dr[d];
				int nc = cc + dc[d];
				
				// 2-2. 범위 처리
				if (nr < start_boundary || nr >= end_boundary || nc < start_boundary || nc >= end_boundary) {
					d = (d+1) % 4;
					continue;
				}
				
				// 2-3. 범위 내라면?
				
				// 2-4. 빈칸이라면? 
				if (arr[nr][nc] == 0)  {
					temp_jump_cnt++;
					// 2-4-a. 횟수가 jump 도달시
					if (temp_jump_cnt == jump) {
						arr[nr][nc] = num;
						num++;
						temp_jump_cnt = 0;
						
						// 2-4-b. 만약 배열 다채웠으면
						if (num > n*n) break;
					}
				}
				// 2-5. 빈칸이 아니라면? -> (좌표 갱신, 테두리 순회 횟수++)
				cr = nr;
				cc = nc;
				boundary_cnt++;
			}
			
			// 3. 만약 배열 다채웠다면
			if (num > n*n) break;
			
			// 4-1. 현 테두리 탐색 종료 후, 안쪽 테두리로 진입
			start_boundary++;
			end_boundary--;
			size -= 2;
			
			// 4-2-a. 만약 줄일 수 있다면
			if (start_boundary < end_boundary) {
				cr = start_boundary;
				cc = start_boundary - 1;
			}
			// 4-2-b. 만약 못 줄인다면 -> 다시 초기상태로 reset
			else if (start_boundary >= end_boundary) {
				cr = 0;
				cc = -1;
				start_boundary = 0;
				end_boundary = n;
				size = n-2;
			}
			
			
			
		}
		

		
		// 5. 출력
		for (int i = 0; i < n; i++) {
			System.out.println(Arrays.toString(arr[i]));
		}
		
		
	}
}
```
