---
title:  "침묵의 취조실"
layout: post
categories: [coding-test, datastructure-algorithm, back-tracking] 
tags: [back-tracking]
toc: true
toc_sticky: true
math: true
date: 2026-04-22
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


# 🕵️ 침묵의 취조실

## 문제 배경

국가 보안급 대형 사건에 연루된 용의자 $N$명이 취조실에 모여 있습니다.  
이들 중에는 수사망을 교묘하게 빠져나가려는 범인 $K$명이 숨어 있으며, 나머지 인원은 무고한 시민입니다.  
당신은 각 용의자가 서로를 지목한 **취조 기록(`arr`**) 을 가지고 범인들의 정체를 밝혀내야 합니다.

예를들어 5명의 용의자가 있으며 범인은 2명이라고 가정하자.

1번 용의자는 2,3,4번 용의자가 알리바이가 있다고 증언한다

2번 용의자는 3,4번 용의자에게 알리바이가 있다고 증언한다

3번 용의자는 2,4번 용의자에게 알리바이가 있다고 증언한다

4번 용의자는 2,3번 용의자에게 알리바이가 있다고 증언한다.

5번 용의자는 1,3,4번 용의자에게 알리바이가 있다고 증언한다.

범인은 1번, 5번이다

---

## 제한 사항

| 항목 | 범위 |
|------|------|
| 용의자 규모 $N$ | $1 \le N \le 100$ |
| 범인 규모 $K$ | $1 \le K \le 10$ |
| 시간 제한 | 1초 |

<br><br>

---
## ⚠️ 조건
- 무고한 사람은 자신을 제외한 **모든 타인에 대해 반드시 진실만**을 말한다.
- 범인은 자기 자신을 포함하여 그 누구에 대해서도 **참과 거짓을 자유롭게** 말할 수 있다.
---

<br><br>

## 입출력 예시
순서대로 

N K

취조기록(arr)

로 주어진다
### Input1

```java
5 2
0 1 1 1 0
0 0 1 1 0
0 1 0 1 0
0 1 1 0 0
1 0 1 1 0
```

### Output1

```java
1 5
```
---

<br>

### Input2

```java
7 3
0 1 1 0 0 1 1
0 0 1 0 0 1 1 
0 1 0 0 0 1 1
1 1 0 0 0 0 0
0 0 0 0 1 0 0
0 1 1 0 0 0 1
0 1 1 0 0 1 0 
```

### Output2

```java
1 4 5
```
---



<br><br><br>

## 🤔 접근법
조건을 보니

`무고한 사람은 자신을 제외한 모든 타인에 대해 반드시 진실만 말한다`

그리고 최악의 테스트케이스로 용의자 100명중 10명의 범인 고르기는 다음과 같다

$ \binom{100}{10} $

그럼 약 17조 3103억


그러면 조합으로 풀면 무조건 `시간초과`고, 가지치기를 통한 백트랙킹이면 괜찮지 않을까?

테스트케이스를 기준으로 내가 제시한 추리가 알리바이가 있는 사람들의 증언이랑 1개라도 일치하지 않는다면 false

전부 다 일치하면 내 추리가 맞아서 범인 색출을 할 수 있지 않을까?

테스트케이스를 활용하면 아래처럼 나타낼 수 있겠다

아래는 1,5번이 범인이라고 가정했을때다
<br>

## 안되는 풀이
세로를 더해서 K보다 적으면 범인인데 이건 반례가 있다

![Desktop View](/assets/img/data-alg/back-tracking/algorithm2/2.jpg)


예를 들어

실제 범인이 1,2 다

```java
4 2
0 1 0 1
1 0 0 1
0 0 0 1
0 0 1 0
```


여기서 1,2번이 짜고쳐서 1번은 2번이 범인이 아니라고, 2번은 1번이 범인이 아니라고 말한다.

4번은 3번에게 범인이 아니라고 했지만, 만약 범인이라고 할 경우에 3번이 0표가 되어 자동 범인 지목이 된다
<br><br>

## 가능한 풀이

![Desktop View](/assets/img/data-alg/back-tracking/algorithm2/1.jpg)

<br>
삽화를 보았을 때,

알리바이가 각각 있는 2,3,4번 사람의 증언을 보면 전부 내가 제시한 추리와 일치한다.


그러면 사고의 흐름을 작성해보자

```java
// 1. main 함수
    // 1-1. 초기 상태 배열 -> N명 전부 알리바이 O
    // 1-2. back_tracking()

// 2. back_tracking()
    // 2-1. 범인을 색출했으면 이제 추리 종료
    // 2-2. K명의 용의자를 확보 후에 심문 시작
        // 2-2-a. 내 추리와 알리바이가 있는 사람들의 각 증언이 일치하는가?
    
    // 2-3. 가지치기 -> 인덱스 초과 or (남은 사람들을 범인으로 몰아도 K명보다 작으면)

    // 2-4.  용의자 선택
    // 2-5. 용의자 미선택 

// 3. 유효성 검사
    // 3-1. 알리바이가 있는 사람의 증언이 하나라도 다르면 바로 false
      // 3-1-a. 본인은 볼 필요가 없으니 pass
      // 3-1-b. 현재 보는 무고한 사람의 증언이 하나라도 다르면 false
    // 3-2. 아무 탈 없이 알리바이가 있는 자들이 나의 추리와 전부 일치하면 true
```

<br>

## ✅ 코드

```java
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;

import java.util.Arrays;

public class Main {
	static int N, K;
	static int[][] arr;
	static boolean found = false;
	
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String[] NK = br.readLine().split(" ");
		N = Integer.parseInt(NK[0]);
		K = Integer.parseInt(NK[1]);
		arr = new int[N][N];
		for (int r = 0; r < N; r++) {
			String[] cols = br.readLine().split(" ");
			for (int c = 0; c < N; c++) {
				arr[r][c] = Integer.parseInt(cols[c]);
			}
		}
		
		// 1-1. 모든 용의자는 알리바이가 있다고 가정 -> 상태 배열
		int[] status = new int[N];
		for (int i = 0; i < N; i++) status[i] = 1;
		
		// 1-2. back_tracking
		back_tracking(0, 0, status);
	}
	
	
	
	
	
	static void back_tracking(int idx, int cnt, int[] status) {
		// 2-1. 범인들을 찾았다면 추리 중단
		if (found) return;
		
		// 2-2. K명의 용의자를 확보후 심문 시작
		if (K == cnt) {
			if (is_valid(status)) {
				int[] result = new int[K];
				int index = 0;
				for (int i = 0; i < N; i++) {
					if (status[i] == 0) {
						result[index] = i+1;
						index++;
					}
				}
				found = true;
				System.out.println(Arrays.toString(result));
			}
			return;
		}
		
		// 2-3. 가지치기 -> (idx 초과 or 남은 용의자들을 범인으로 몰아도 K보다 작을때)
		if (idx >= N || cnt + (N-idx) < K) return;
		
		// 2-4. 범인으로 가정
		status[idx] = 0;
		back_tracking(idx+1, cnt+1, status);
		
		// 2-5. 무고한 사람으로 가정
		status[idx] = 1;
		back_tracking(idx+1, cnt, status);
	}
	
	
	
	static boolean is_valid(int[] status) {
		// 3-1. 알리바이가 있는 사람의 증언이 하나라도 다르면 바로 false
		for (int i = 0; i < N; i++) {
			if (status[i] == 1) {
				for (int j = 0; j < N; j++) {
					// 3-1-a. 본인은 볼 필요가 없으니 pass
					if (i == j) continue;
					
					// 3-1-b. 현재 보는 무고한 사람의 증언이 하나라도 다르면 땡
					if (status[j] != arr[i][j]) return false;
				}
			}
		}
		
		
		// 3-2. 아무 탈 없이 알리바이 있는 자들이 나의 추리와 전부 일치하면 true
		return true;
	}
	
	
}
```