---
title:  "특별한 다이얼 자물쇠"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [implementation, greedy]
toc: true
toc_sticky: true
date: 2025-09-23
---



# 특별한 다이얼 자물쇠
![Desktop View](/assets/img/data-alg/greedy/dials_lock.png)

일반적인 다이얼 자물쇠는 **위로 돌리면 숫자가 증가**, **아래로 돌리면
숫자가 감소**합니다.\
하지만 이 다이얼얼 자물쇠는 조금 특별합니다.

특징은 다음과 같습니다:

-   특정 다이얼에서 **up(+) 또는 down(-)** 회전을 하면, **그 다이얼부터
    마지막 다이얼까지 모두 함께 회전**한다.
-   예를 들어, 다이얼이 12자리라고 할 때:
    -   `3번째 다이얼에서 1칸 up` → **3번째부터 12번째까지 모든 다이얼
        숫자가 1 증가**
    -   `7번째 다이얼에서 3칸 down` → **7번째부터 12번째까지 모든 다이얼
        숫자가 3 감소**

------------------------------------------------------------------------

## 문제 정의

현재 다이얼 상태 `dials`가 주어졌을 때, 이를 목표 상태 `target`으로
만들고자 한다.\
이때 필요한 **최소 회전 횟수**를 구해볼까?

------------------------------------------------------------------------

## 조건

-   다이얼의 개수:\
    `1 <= dials.length <= 100000`
-   다이얼의 숫자는 `0 ~ 9` 범위를 갖는다.\
    (숫자는 회전하면서 순환한다. 예: 9에서 +1 → 0)

------------------------------------------------------------------------

## 예시

### 예제 1

    dials   = {0,0,0,0,0,0}
    target  = {1,2,3,4,5,6}
    result  = 6

설명: 각 단계마다 하나씩 올려가면 된다.

------------------------------------------------------------------------

### 예제 2

    dials   = {9,8,7}
    target  = {0,7,7}
    result  = 4

------------------------------------------------------------------------

### 예제 3

    dials   = {0,6,1,4,5}
    target  = {8,3,1,9,6}
    result  = 15

------------------------------------------------------------------------

## 요약

-   **핵심 아이디어**:\
    앞에서부터 차례로 맞추면서, 필요한 회전만큼 뒤까지 모두 조정하는
    방식으로 최소 횟수를 찾는다.
-   다이얼이 하나씩 맞춰질 때, 그 뒤의 다이얼 상태도 자연스럽게 바뀌기
    때문에 이를 고려해야 한다.


<br><br><br><br>


```java
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
	static int N;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String[] dials = br.readLine().split(" ");
		String[] target = br.readLine().split(" ");
		N = dials.length;
		int[] d = new int[N];
		int[] t = new int[N];
		
		for (int i = 0; i < N; i++) {
			d[i] = Integer.parseInt(dials[i]);
			t[i] = Integer.parseInt(target[i]);
		}
		
		min_rotate(d, t);
	}
	
	
	
	
	static void min_rotate(int[] d, int[] t) {
		int cnt = 0;
		int c_sum = 0;
		
		for (int i = 0; i < N; i++) {
			int down = ((((c_sum + d[i] + 10) % 10) + 10) - t[i]) % 10;
			int up = ((t[i] + 10) - ((c_sum + d[i] + 10) % 10)) % 10;
			
			if (down <= up) {
				c_sum -= down;
				cnt += down;
			}
			else if (up < down) {
				c_sum += up;
				cnt += up;
			}
		} 
		System.out.println(cnt);
		
	}
	
	
}
```