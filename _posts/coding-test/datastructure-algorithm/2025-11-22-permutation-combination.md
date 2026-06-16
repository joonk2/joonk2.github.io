---
title:  "permutation && combination"
description: "순열(Permutation)과 조합(Combination)의 개념과 구현 방법을 설명합니다. 백준 11050번 이항계수1 문제를 통해 DP 파스칼 방식을 활용한 효율적인 계산 방법을 학습합니다."
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [permutation, combination]
toc: true
toc_sticky: true
math: true
date: 2025-11-22
---


### 🙋‍♂️들어가며
이번에 학습할 내용은 `순열` 그리고 `조합`이다 <br>

순열은 중복이 가능하고, 조합은 중복이 불가능하다. <br>
- 순열 ex) -> 자리 배치
- 조합 ex) -> 요리재료 선택

순열의 경우 그냥 factorial을 통해 구현하면 되겠다 <br>

### ▲permutation

P = $\frac{n!}{(n-r)!}$

카드 5개 중 2개 고르기

$_{5}P_{2}$ -> 20

<br><br><br><br><br>

### 🍕combination
조합이다

$$
\binom{n}{k} = \frac{n!}{k!(n-k)!}
$$


피자를 만들기 위해 재료 a,b,c,d,e 중 3개만 고르겠다.

전체 경우의 수 = `(특정 x를 선택한 경우의 수)` + `(특정 x를 미선택한 경우의 수)`

이걸 나타내면 아래와 같겠다

$_{5}C_{3} = _{4}C_{2} + _{4}C_{3}$

그러면 전체 조합의 경우의 수인 10가지가 도출된다.

이걸 코드로 나타내면 아래와 같겠네


```java
C[5][3] = C[4][2] + C[4][3]
```
<br><br><br>


### 조합 - 일반점화식 코드

이걸 일반 점화식 코드로 나타내면 아래와 같겠네

```java
C[r][c] = C[r-1][c-1] + C[r-1][c-1]
```

<br><br><br><br>

### ⏱️**시간복잡도**
#### permutation
- O(n!)

#### combination
- 조합 점화식 DP -> O(nr)
- DP 파스칼 방식 -> O($N^2$)
- `재귀 팩토리얼 방식 O(N) 절대 금지!!! why?? -> overflow`

<br><br><br>

# 예제
# [boj_이항계수1_11050](https://www.acmicpc.net/problem/11050)

<br><br><br>

2가지 풀이를 보여주겠다
<br><br><br><br><br>

## 1번 풀이 `(강력 비추 ❌️)`
 O(N) 이지만 정말 이거 쓰면 안된다

문제 조건에서 N <= 10, K <= N 이지만, 만약
N = 13 이면 13! 으로 int 초과, 그리고 19! 라면 long 범위도 초과해서 결국 value overflow가 발생한다.

하지만 일단 해당 문제는 `N <= 10`, `K <= N`이었기에 아래 공식을 적용하여 풀 수 있었다

$
\binom{N}{K} = \frac{N!}{K!(N-K)!}
$


```java
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.BufferedReader;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String[] NK = br.readLine().split(" ");
		int N = Integer.parseInt(NK[0]);
		int K = Integer.parseInt(NK[1]);
		C(N, K);
	}
	
	
	
	static void C(int N, int K) {
		int denominator = 1;
		int numerator_1 = 1;
		int numerator_2 = 1;
		
		denominator = recursion(N);
		numerator_1 = recursion(K);
		numerator_2 = recursion(N-K);
		
		int res = denominator / (numerator_1 * numerator_2);
		System.out.println(res);
	}
	
	
	
	static int recursion(int x) {
		if (x <= 1) {
			return 1;
		}
		return x * recursion(x-1);
	}
	
	
	
	
}
```


<br><br><br><br>


## 2번 풀이 `(무조건 이거 써라 ✅️)`

DP 파스칼 방식으로 $O(N^2)$

N, K가 커질수록, 그냥 묻지말고

이거 닥사용이다. <br>
왜??? -> value overflow가 잘 안나기 때문이다

### 🪜구축 순서
1. 배열 크기 선언
- N=5일때 -> DP[5+1][5+1]

2. for문으로 초기 세팅
- i개중 1개 뽑기 -> i개
- i개중 0개 뽑기 -> 1개
- i개중 i개 뽑기 -> 1개

3. DP 파스칼 점화식 적용
DP[r][c] = DP[r-1][c-1] + DP[r-1][c]

<br><br>

2번과정까지 수행하고 출력으로 확인하면 아래와 같을 것이다

|   |   |   |   |   |   |
|---|---|---|---|---|---|
| 1 | 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 0 | 0 | 0 | 0 |
| 1 | 2 | 1 | 0 | 0 | 0 |
| 1 | 3 |   | 1 | 0 | 0 |
| 1 | 4 |   |   | 1 | 0 |
| 1 | 5 |   |   |   | 1 |

오 왼쪽위에서 오른쪽 아래로 내려가는 대각선은 1로 채워졌으니 저걸 건드리지 않고 

앞에만 숫자 갱신하는 법이 없을까?

### <span style="color:pink;">c가 r보단 무조건 작아야겠네</span>

그러면 이제 남은 곳을 DP 파스칼로 채워보자

|   |   |   |   |   |   |
|---|---|---|---|---|---|
| 1 | 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 0 | 0 | 0 | 0 |
| 1 | 2 | 1 | 0 | 0 | 0 |
| 1 | 3 | 3 | 1 | 0 | 0 |
| 1 | 4 | 6 | 4 | 1 | 0 |
| 1 | 5 | 10 | 10 | 5 | 1 |

일단 완성이 된 것 같다

이제 검증해보자


$_{0}C_{0}$ &nbsp; $_{0}C_{1}$ &nbsp; $_{0}C_{2}$ &nbsp; $_{0}C_{3}$ &nbsp; $_{0}C_{4}$ &nbsp; $_{0}C_{5}$  


$_{1}C_{0}$ &nbsp; $_{1}C_{1}$ &nbsp; $_{1}C_{2}$ &nbsp; $_{1}C_{3}$ &nbsp; $_{1}C_{4}$ &nbsp; $_{1}C_{5}$  


$_{2}C_{0}$ &nbsp; $_{2}C_{1}$ &nbsp; $_{2}C_{2}$ &nbsp; $_{2}C_{3}$ &nbsp; $_{2}C_{4}$ &nbsp; $_{2}C_{5}$  


$_{3}C_{0}$ &nbsp; $_{3}C_{1}$ &nbsp; $_{3}C_{2}$ &nbsp; $_{3}C_{3}$ &nbsp; $_{3}C_{4}$ &nbsp; $_{3}C_{5}$  


$_{4}C_{0}$ &nbsp; $_{4}C_{1}$ &nbsp; $_{4}C_{2}$ &nbsp; $_{4}C_{3}$ &nbsp; $_{4}C_{4}$ &nbsp; $_{4}C_{5}$  


$_{5}C_{0}$ &nbsp; $_{5}C_{1}$ &nbsp; $_{5}C_{2}$ &nbsp; $_{5}C_{3}$ &nbsp; $_{5}C_{4}$ &nbsp; $_{5}C_{5}$

만약 위의 문자가 깨져보인다면 아래 사진과 같은 내용이니 아래 사진을 보자

![알고리즘 문제 풀이 참고 다이어그램](/assets/img/data-alg/combination/basic-1.jpg)

<br><br>

맞네 

<br>

# 코드



```java
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.BufferedReader;


public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String[] NK = br.readLine().split(" ");
		int N = Integer.parseInt(NK[0]);
		int K = Integer.parseInt(NK[1]);
		lets_solve_this(N, K);
	}
	
	
	
	static void lets_solve_this(int N, int K) {
		// 배열 크기 선언
		int[][] DP = new int[N+1][N+1];
		
		// for문으로 배열 매 반복마타 입력
		for (int i = 0; i < N+1; i++) {
			// i개중 1개 뽑기
			DP[i][1] = i;
			
			// i개중 0개 뽑기
			DP[i][0] = 1;
			
			//i개중 i개 뽑기
			DP[i][i] = 1;
		}
		
		
		// 남은 칸 채우기
		// c는 r을 절대 넘으면 안돼~
		for (int r = 3; r < N+1; r++) {
			for (int c = 2; c < r; c++) {
				DP[r][c] = DP[r-1][c-1] + DP[r-1][c];
			}
		}
		
		
		// result
		System.out.println(DP[N][K]);
	}
	
	
	
	
}
```
