---
title:  "Dijikstra"
layout: post
categories: [coding-test, datastructure-algorithm, dijikstra] 
tags: [dijikstra]
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
이번 시간에는 dijikstra를 배워보자

우선 이를 이해하기 위해서는 Priority Queue의 선행학습이 되어있어야할 것이다.

모른다면 이전의 Pritority Queue 관련 글을 보고 오자

dijikstra는 최소비용을 구할 때 많이 쓰인다.

![Desktop View](/assets/img/data-alg/dijikstra/basic/1.jpg)

위 그림을 토대로 아래에 구현해보자

<br><br>

## ✅ 코드

```java
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.util.Arrays;

// dijikstra
import java.util.PriorityQueue;
import java.util.ArrayList;
import java.util.List;

public class Main {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		int N = 5;
		
		// 1. 그래프 생성
		List<int[]>[] graph = new ArrayList[N+1];
		for (int i = 1; i < N+1; i++) {
			graph[i] = new ArrayList<>();
		}
		
		// 2. 간선 추가 (to, cost)
		graph[1].add(new int[] {2, 2});
		graph[1].add(new int[] {3, 5});
		graph[2].add(new int[] {3, 1});
		graph[2].add(new int[] {4, 2});
		graph[3].add(new int[] {5, 3});
		
		// 3. 거리값 초기화
		int[] dist = new int[N+1];
		for (int i = 1; i < N+1; i++) {
			dist[i] = Integer.MAX_VALUE;
		}
		
		// 4. PQ (거리기준 정렬)
		PriorityQueue<int[]> pq = new PriorityQueue<> (
				(a,b) -> a[1] - b[1] 
		);
		
		// 5. 시작점은 0
		dist[1] = 0;

		// 6. 초기값 삽입 (노드, 거리)
		pq.offer(new int[] {1, 0});
		
		// 7. 탐색
		while (!pq.isEmpty()) {
			int[] cur = pq.poll();
			int node = cur[0];
			int cost = cur[1];
			
			if (cost > dist[node]) continue;
			
			for (int[] next : graph[node]) {
				int next_node = next[0];
				int next_cost = cost + next[1];
				
				if (next_cost < dist[next_node]) {
					dist[next_node] = next_cost;
					pq.offer(new int[] {next_node, next_cost});
				}
				
			}
			
		}
		
		// 8. 결과 출력
		for (int i = 1; i < N+1; i++) {
			System.out.println(i + " " + dist[i]);
		}
		
		
	}
}
```