---
title:  "특별한 배열"
layout: post
categories: [coding-test, datastructure-algorithm, implementation] 
tags: [implementation]
toc: true
toc_sticky: true
math: true
date: 2026-09-20
---

## 문제
n, jump가 주어질때 배열을 생성해보자
### testcase-1 
```java
 n = 5
 jump = 3
```

![n = 5, jump = 3 알고리즘 문제 풀이 참고 이미지](/assets/img/data-alg/implementation/special_arr/1.png)
<br>


### testcase-2
```java
n = 4
jump = 2
```

![n = 4, jump = 2 알고리즘 문제 풀이 참고 이미지](/assets/img/data-alg/implementation/special_arr/2.png)


<br><br>

### 조건 
2 <= n <= 100

1 <= jump <= n



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

<br><br>

## 🙋‍♂️ 들어가며
문제를 읽어보니 규칙이 있더라, 먼저 `시작점 arr[0][-1]`을 기준으로 외부테두리를 돌고 내부테두리를 돌다가 더이상 돌 곳이 없으면 다시 처음 시작점으로 갱신되는 것이었다.

### testcase
![🙋‍♂️ 들어가며 알고리즘 문제 풀이 참고 이미지](/assets/img/data-alg/implementation/special_arr/test1.png)
<br><br>

![🙋‍♂️ 들어가며 알고리즘 문제 풀이 참고 이미지](/assets/img/data-alg/implementation/special_arr/test2.png)
<br><br>




<br>

## ✅ 코드
```java
package ps;

import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;


public class Solution {
	static int[] dr = {0, 1, 0, -1};
	static int[] dc = {1, 0, -1, 0};
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int jump = Integer.parseInt(br.readLine());
		
		// 1. 배열 생성하고 첫번째 값 대입
		int[][] arr = new int[n][n];
		int start = 1;
		arr[0][0] = start;
		start++;
		
		
		// 2. 각 테두리를 돌면서 시작점(시작점 바로 왼쪽) 갱신, visited를 통해 건넜던 곳은 이동 안하기
		int cnt_jump = 0;
		
		while (start <= n*n) {
			int sr = 0;
			int sc = -1;
			int total = (int) (Math.ceil((double) n/2));
			int bottom_edge = 0;
			boolean[][] visited = new boolean[n][n];
			
			// 2-1. 시작점 < total 까지만 진행
			while (bottom_edge < total) {
				int cr = sr;
				int cc = sc;
				int er = n-1-bottom_edge;
				int ec = n-1-bottom_edge;
				
				int d = 0;
				while (d < 4) {
					int nr = cr + dr[d];
					int nc = cc + dc[d];
					
					// 2-2. 만약 범위 밖이면 방향전환하고 스킵
					if (nr < bottom_edge || nr > er || nc < bottom_edge || nc > ec) {
						d++;
						continue;
					}
					
					// 2-3. 방문했다면? 방향 전환
					if (visited[nr][nc]) {
						d++;
						continue;
					}
					
					// 2-4. 범위안, 미방문시
					visited[nr][nc] = true;
					cr = nr;
					cc = nc;
					
					// 2-5. 현재 좌표가 숫자가 채워졌다면?
					if (arr[cr][cc] != 0) continue;
					
					// 2-6. 현재 좌표가 숫자가 안 채워졌다면?
					cnt_jump++;
					
					// 2-7. 숫자cnt가 특정횟수에 도달시
					if (cnt_jump == jump) {
						arr[cr][cc] = start;
						start++;
						cnt_jump = 0;
					}
				}
				// 3. 다음으로 전환
				sr++;
				sc++;
				bottom_edge++;
			}
		}
		
		
		// 4. 출력
		for (int r = 0; r < n; r++) {
			System.out.println(Arrays.toString(arr[r]));
		}
		
		
	}
}
```