---
title:  "PriorityQueue"
layout: post
categories: [coding-test, datastructure-algorithm, PriorityQueue] 
tags: [PriorityQueue]
toc: true
toc_sticky: true
math: true
date: 2026-04-28
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
이번 시간에는 PriorityQueue를 배워보자

Q는 FIFO인데, 그와 달리 PQ는 정렬을 통해 오름차순, 내림차순으로도 가능하다

heap 기반으로 시간복잡도는 다음과 같다
```java
삽입 (offer) -> O(log N)
삭제 (poll) -> O(log N)
조회 (peek) -> O(1)
```

<br><br>

## ✅ 코드

```java
public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		
		

		PriorityQueue<int[]> pq = new PriorityQueue<> (
				(a,b) -> a[0] - b[0]
		);
		
		pq.offer(new int[] {3, 100});
		pq.offer(new int[] {1, 200});
		pq.offer(new int[] {2, 50});
		
		while (!pq.isEmpty()) {
			int[] cur = pq.poll();
			System.out.println(Arrays.toString(cur));
		}
		
	}
}
```

### 출력값
```java
[1, 200]
[2, 50]
[3, 100]
```

<br>

위처럼 a[0] - b[0] 가 아닌 약간의 변화를 주자
```java
a[1] - b[1]
```

### 출력값
```java
[2, 50]
[3, 100]
[1, 200]
```

<br>

그렇다면 이번에는 내림차순을 볼까?

앞자리만 바꿔보자

```java
b[0] - a[0]
```

### 출력값
```java
[3, 100]
[2, 50]
[1, 200]
```

<br>

이번에는 뒷자리를 바꿔보자

```java
b[1] - a[1]
```

### 출력값
```java
[1, 200]
[3, 100]
[2, 50]
```