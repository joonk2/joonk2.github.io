---
title:  "implementation"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [implementation]
toc: true
toc_sticky: true
date: 2025-10-28
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
### [횃불이의 모험 --> boj 34557](https://www.acmicpc.net/problem/34557)
(제한시간 -> 1초)


<br>

#### *입력*
첫째 줄에 맵의 크기를 나타내는 정수 
$N$와 프레임의 길이 
$M$가 주어집니다. (
$1 \leq N \leq 100; 1 \leq M \leq 10^{6}$)

둘째 줄부터 
$N$개 줄에 걸쳐 맵을 나타내는 크기 
$N \times N$ 행렬이 주어집니다. 
$0$은 빈 칸, 
$1$은 장애물이 있는 칸, 
$2$는 횃불이의 시작 위치입니다.

다음 네 줄에 걸쳐 W, A, S, D 각 키에 할당된 키보드 이벤트가 순서대로 한 줄씩 주어집니다.

다음 줄에 프레임마다 누른 키가 공백없이 한 줄로 주어집니다.

출력
횃불이의 최종 위치 
$(r,c)$를 공백으로 구분하여 
$r c$ 형태로 출력해 주세요.



```
5 6
0 0 2 0 0
0 1 0 0 1
1 1 0 0 0
0 0 1 0 0
0 0 0 0 0
Down
Stay
Up
Stay
SSWWAA
```

### 출력
```
2 3
```

예제 1에서 횃불이는 
$(1, 3)$에서 시작해 매 프레임 다음과 같이 움직입니다.

- 프레임 1 (S): S키의 Down 이벤트가 발생합니다. 하지만 S키에는 Up 이벤트가 할당되어 있어 움직이지 않습니다.
- 프레임 2 (S): S키의 Stay 이벤트가 발생합니다. 하지만 S키에는 Up 이벤트가 할당되어 있어 움직이지 않습니다.
- 프레임 3 (W): W키의 Down 이벤트가 발생합니다. W키에 할당된 이벤트와 동일하므로 횃불이가 위쪽으로 움직이려 합니다. 하지만 이동하려는 칸이 맵 바깥이므로 움직이지 않습니다. 곧바로 S키의 Up 이벤트가 발생합니다. S키에 할당된 이벤트와 동일하므로 횃불이가 아래쪽으로 움직여 횃불이의 좌표는 
$(2, 3)$이 됩니다.
- 프레임 4 (W): W키의 Stay 이벤트가 발생합니다. 하지만 W키에는 Down 이벤트가 할당되어 있어 움직이지 않습니다.
- 프레임 5 (A): W키의 Up 이벤트가 발생합니다. 하지만 W키에는 Down 이벤트가 할당되어 있어 움직이지 않습니다. 곧바로 A의 Down 이벤트가 발생합니다. 하지만 A키에는 Stay 이벤트가 할당되어 있어 움직이지 않습니다.
- 프레임 6 (A): A키의 Stay 이벤트가 발생합니다. A키에 할당된 이벤트와 동일하므로 횃불이가 왼쪽으로 움직이려 합니다. 하지만 이동하려는 칸에 장애물이 있어 움직이지 않습니다.
최종적인 횃불이의 위치는 
$(2, 3)$입니다.
<br><br><br>

#### *접근법*
해당 문제는 N <= 100 M <= 100만이라 최악의 실행연산이 100*100 + 100만 즉 101만으로 충분히 java 1초 내에 연산 가능
<br>

#### 중요한 것
- M회의 프레임동안 W, A, S, D 순서대로 처리
- 키에 할당된 이벤트가 발생할때만 이동
- W, A, S, D 에 순서대로 이벤트 할당
- 이동 X (장애물 or 맵밖)

<br><br>

정리하면 아래와 같다

### 🎮 키 이벤트 발생 조건
W, A, S, D 에 대하여

| Event | prev | now |
|:--------------:|:----------------:|:----------------:|
| **Down** | X | O |
| **Stay** | O | O |
| **Up** | O | X |

<br>

#### 🔥 예제 1번 기준 프레임별 키 상태 변화

| 1(S) | 2(S) | 3(W) | 4(W) | 5(A) | 6(A) |
|:----:|:----:|:----:|:----:|:----:|:----:|
| X |   |   |   |   |   |
|   | X |   |   |   |   |
|   |   | W(X) <br> S(O) |   |   |   |
|   |   |   | X |   |   |
|   |   |   |   | X |   |
|   |   |   |   |   | A(X) |


<br><br><br>

## 3. 코드
```java
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;


public class Main {
	static int N, M;
	static int[] dr = {-1,0,1,0};
	static int[] dc = {0,-1,0,1};
	static boolean[] prev_pressed;
	static int[][] matrix;
	static String[] assigned_event;
	static int pos_r, pos_c;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String[] NM = br.readLine().split(" ");
		N = Integer.parseInt(NM[0]);
		M = Integer.parseInt(NM[1]);
		matrix = new int[N][N];
		pos_r = 0;
		pos_c = 0;
		for (int r = 0; r < N; r++) {
			String[] cols = br.readLine().split(" ");
			for (int c = 0; c < N; c++) {
				matrix[r][c] = Integer.parseInt(cols[c]);
				if (matrix[r][c] == 2) {
					pos_r = r;
					pos_c = c;
				}
			}
		}
		
		assigned_event = new String[4];
		for (int i = 0; i < 4; i++) {
			String event = br.readLine();
			assigned_event[i] = event;
		}
		
		String frames = br.readLine();
		prev_pressed = new boolean[4];
		simulate(frames);
		++pos_r;
		++pos_c;
		System.out.println(pos_r + " " + pos_c);
	}
	
	
	
	static void simulate(String frames) {
		for (int f = 0; f < M; f++) {
			char key = frames.charAt(f);
			int now_idx = get_idx(key);
			boolean[] now_pressed = new boolean[4];
			now_pressed[now_idx] = true;
			for (int button = 0; button < 4; button++) {
				String ev = get_event(prev_pressed[button], now_pressed[button]);
				if (ev != null && ev.equals(assigned_event[button])) {
					move(button);
				}
			}
			
			// 버튼 클릭 갱신
			prev_pressed = now_pressed;
		}
	}
	
	
	
	static int get_idx(char key) {
		if (key == 'W') return 0;
		if (key == 'A') return 1;
		if (key == 'S') return 2;
		return 3;
	}
	
	
	static String get_event(boolean prev, boolean now) {
		if (!prev && now) return "Down";
		if (prev && now) return "Stay";
		if (prev && !now) return "Up";
		return null;
	}
	
	
	static void move(int d) {
		int nr = pos_r + dr[d];
		int nc = pos_c + dc[d];
		
		// 맵밖이면 끝
		if (nr < 0 || nr > N-1 || nc < 0 || nc > N-1) return;
		
		// 장애물 조우시 끝
		if (matrix[nr][nc] == 1) return;
		
		pos_r = nr;
		pos_c = nc;
	}
	
}
```