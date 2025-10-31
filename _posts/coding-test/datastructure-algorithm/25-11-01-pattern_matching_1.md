---
title:  "pattern matching (implementation)"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [implementation]
toc: true
toc_sticky: true
date: 2025-11-01
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


## 1. 구현
- 문제 설계부터 검증이 많이 필요한 영역이다.


## 2. 문제 설명
### [부당한 퍼즐 --> boj 15501](https://www.acmicpc.net/problem/15501)
(제한시간 -> 2초)


<br>

#### *입력*
첫째 줄에 n이 주어진다(1 ≤ n ≤ 1,000,000).

둘째 줄에 1에서 n까지의 수가 한 번만 나타나는 수열이 순서대로 주어진다.

셋째 줄에 주어진 두 연산을 수행해서 구성할 수 있는지 확인할 1에서 n까지 수가 한 번만 나타나는 수열이 순서대로 주어진다.

#### *출력*
주어진 두 가지 연산만을 가지고 처음 수열을 결과 수열로 만들 수 있다면 good puzzle, 아니면 bad puzzle을 출력한다.


#### tc-1
```
5
1 2 3 4 5
4 3 2 1 5
```

### output-1
```
good puzzle
```

#### tc-2
```
5
1 2 3 4 5
1 2 4 3 5
```

### output-2
```
bad puzzle
```


<br><br>

## 접근
java 2초 -> 2억 연산 이내

최악의 실행시간
2 * 200만 * 100만

그렇지만 나는 이 코드로 도전해보고 싶었기에 시간초과를 하든말든 작성을 해보았다

먼저 original 배열, target 배열을 생성했다 

그 이후 각 자리별 문자열 매칭을 생각했기에 원형배열처럼 사용하기 위하여 2배 크기의 배열을 만들어주었다

tc 1번 기준으로 

```java
original_extended = [1,2,3,4,5, 1,2,3,4,5]
reverse_extended = [5,4,3,2,1, 5,4,3,2,1]
```


그리하여 아래와 같이 작성하였다

```java
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;


public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());
		String[] s1 = br.readLine().split(" ");
		String[] s2 = br.readLine().split(" ");
		int[] original = new int[N];
		int[] target = new int[N];
		for (int i = 0; i < N; i++) {
			original[i] = Integer.parseInt(s1[i]);
			target[i] = Integer.parseInt(s2[i]);
		}
		
		int[] reverse = new int[N];
		for (int i = 0; i < N; i++) {
			reverse[i] = original[N-1-i];
		}
		
		// double size
		int[] original_extended = new int[N*2];
		int[] reverse_extended = new int[N*2];
		for (int i = 0; i < N*2; i++) {
			original_extended[i] = original[i%N];
			reverse_extended[i] = reverse[i%N];
		}
		
		
		int n = 2*N;
		int m = N;
		boolean is_good_puzzle = false;
		int i1 = 0;
		int i2 = 0;
		int j = 0;
		int k = 0;
		while (i1 < n && i2 < n) {
			if (original_extended[i1] == target[j]) {
				i1++;
				j++;
				if (j == m) {
					is_good_puzzle = true;
					break;
				}
			}
			else if (original_extended[i1] != target[j]) {
				i1 = (i1 - j + 1);
				j = 0;
			}
			
			
			if (reverse_extended[i2] == target[k]) {
				i2++;
				k++;
				if (k == m) {
					is_good_puzzle = true;
					break;
				}
			}
			else if (reverse_extended[i2] != target[k]) {
				i2 = (i2 - k + 1);
				k = 0;
			}
		}
		
		// res
		if (is_good_puzzle) {
			System.out.println("good puzzle");
		}
		else {
			System.out.println("bad puzzle");
		}
		
	}
}
```

![Desktop View](/assets/img/boj/boj_11501_1.jpg)

<br>

## 👀오잉 왜 맞는 거지????
### 이유를 찾아보니 다음과 같더라
- 각 조각은 모두 서로 다른 정수
- 서로 같은 조각들이 중복으로 존재하지 않음

그래서 실제 연산 수행량은 이렇다더라
```
O(2N)
```
그런데 만약 서로 중복되면 아래와 같을 수 있다

```java
arr = [1, 1, 1, 1, 1]
```

이럴 경우에는 무조건 $O(N*M)$ 라서 시간초과라 이걸 방지하고자 O(N)으로 접근할 수 있는

### KMP (패턴 매칭 알고리즘을 적용해볼까?)