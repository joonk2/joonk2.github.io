---
title:  "[문제 2] 올영세일 장바구니 최적화 - (dp) (Java)"
description: "CJ올리브영 코딩테스트 기출 문제인 `올영세일 장바구니 최적화`를 Java를 사용해 dp로 풀었습니다."
layout: post
categories: [coding-test, datastructure-algorithm, dp] 
tags: [dp]
toc: true
toc_sticky: true
math: true
date: 2026-08-17
---

# [[문제 2] 올영세일 장바구니 최적화](https://codingtest.zighang.com/simulations/710c3c71-280f-4a6e-a14b-0c9f64f6f09d)

## 🙋‍♂️ 들어가며
카테고리별 각 아이템을 선택한 상황에서 최대 비용까지 지불하면 가치를 얼마나 얻을 수 있을까?

최악의 연산횟수 : 200 * 50 * 100,000 -> 1억 

```java
# testcase
4 3 10

1 3 4
1 5 7
2 4 5
3 1 9
```

이때 최대 가치는 7 + 5 + 9 = 21

```java
DP[1][3] = 4
DP[1][4] = 4
DP[1][5] = 4
DP[1][6] = 4
DP[1][7] = 4
DP[1][8] = 4
DP[1][9] = 4
DP[1][10] = 4


DP[1][5] = 7
DP[1][6] = 7
DP[1][7] = 7
DP[1][8] = 7
DP[1][9] = 7
DP[1][10] = 7


DP[2][4] = 5
DP[2][5] = 5
DP[2][6] = 5
DP[2][7] = 9
DP[2][8] = 9
DP[2][9] = 12
DP[2][10] = 12


DP[3][1] = 9
DP[3][2] = 9
DP[3][3] = 9
DP[3][4] = 9
DP[3][5] = 9
DP[3][6] = 14
DP[3][7] = 14
DP[3][8] = 18
DP[3][9] = 18
DP[3][10] = 21
```



## ✅ 정답 코드 (backtracing)
```java
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;

import java.util.List;
import java.util.ArrayList;


public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] NCB = br.readLine().split(" ");
        int N = Integer.parseInt(NCB[0]);
        int C = Integer.parseInt(NCB[1]);
        int B = Integer.parseInt(NCB[2]);

        // 1. 카테고리별 각 아이템을 선택한 상황에서 최대 비용까지 지불하면 가치를 얼마나 얻을 수 있는지?
        ArrayList<int[]>[] lst = new ArrayList[C+1];
        for (int c = 1; c < C+1; c++) {
            lst[c] = new ArrayList<>();
        }

        // 2. 리스트값 할당
        for (int i = 0; i < N; i++) {
            String[] ci_pi_vi = br.readLine().split(" ");
            int ci = Integer.parseInt(ci_pi_vi[0]);
            int pi = Integer.parseInt(ci_pi_vi[1]);
            int vi = Integer.parseInt(ci_pi_vi[2]);
            lst[ci].add(new int[] {pi, vi});
        }

        // 3. 카테고리별 각 아이템을 선택한 상황에서, 최대비용까지 지불하면 가치를 얼마나 얻을 수 있을까?
        int[][] DP = new int[C+1][B+1];
        for (int c = 1; c < C+1; c++) {
            for (int[] item : lst[c]) {
                int price = item[0];
                int value = item[1];
                for (int budget = price; budget < B+1; budget++) {
                    DP[c][budget] = Math.max(DP[c][budget], DP[c-1][budget - price] + value);
                }
            }
        }

        // 4. 결과값
        System.out.println(DP[C][B]);
    }
}
```