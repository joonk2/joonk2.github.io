---
title:  "Two-Pointer"
description: "투 포인터(Two Pointer) 알고리즘의 개념과 활용 방법을 설명합니다. 연속 구간과 불연속 구간 문제에서의 투 포인터 활용 방법을 이해하고, 프로그래머스 구명보트 문제 해결 방법을 학습합니다."
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, TwoPointer]
toc: true
toc_sticky: true
date: 2025-09-21
---

# Two Pointer (투포인터)

투포인터 알고리즘은 배열을 순회할 때 **두 개의 포인터(start, end)** 를 사용하여 효율적으로 답을 찾는 방법이다. <br>  
대표적으로 **연속된 구간(슬라이딩 윈도우)** 과 **불연속(정렬 후 양끝 포인터 탐색)** 상황에서 쓰인다. <br>
시간 복잡도 -> O(N) <br>

---

## 1. 연속 구간 (슬라이딩 윈도우)

연속된 배열 구간의 합이 특정 값과 같은 경우의 수를 구하는 문제.  
이 경우에는 배열이 **정렬일 필요 없음**.  
포인터를 한 칸씩 움직이면서 `s = 0, e = 0` 으로 시작해 `sum` 을 관리한다.

### 예제
배열 `{1,2,3,1,2,1}` 에서 **합이 6인 연속 구간의 개수** 구하기

```java
public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 1, 2, 1};
        int target = 6;

        int s = 0;
        int e = 0;
        int sum = 0;
        int cnt = 0;

        while (true) {
            if (sum >= target) {
                if (sum == target) cnt++;
                sum -= arr[s++];
            } else if (e == arr.length) {
                break;
            } else {
                sum += arr[e++];
            }
        }

        System.out.println("합이 6인 구간 개수 = " + cnt);
    }
}
```

**출력**
```
합이 6인 구간 개수 = 4
```

---

## 2. 불연속 구간 (정렬 후 양끝 투포인터)

배열에서 서로 떨어져 있는 원소들을 두 개 뽑아 조건을 만족시켜야 하는 경우.  
이 경우는 **정렬 필수**. (작은 값과 큰 값을 비교하며 좁혀나감) <br>
정렬 -> N log N <br>

### 예제: [프로그래머스 42885 - 구명보트](https://school.programmers.co.kr/learn/courses/30/lessons/42885)
### 문제 설명

<p>무인도에 갇힌 사람들을 구명보트를 이용하여 구출하려고 합니다. 구명보트는 작아서 한 번에 최대 <strong>2명</strong>씩 밖에 탈 수 없고, 무게 제한도 있습니다.</p>

<p>예를 들어, 사람들의 몸무게가 [70kg, 50kg, 80kg, 50kg]이고 구명보트의 무게 제한이 100kg이라면 2번째 사람과 4번째 사람은 같이 탈 수 있지만 1번째 사람과 3번째 사람의 무게의 합은 150kg이므로 구명보트의 무게 제한을 초과하여 같이 탈 수 없습니다.</p>

<p>구명보트를 최대한 적게 사용하여 모든 사람을 구출하려고 합니다.</p>

<p>사람들의 몸무게를 담은 배열 people과 구명보트의 무게 제한 limit가 매개변수로 주어질 때, 모든 사람을 구출하기 위해 필요한 구명보트 개수의 최솟값을 return 하도록 solution 함수를 작성해주세요.</p>

<h5>제한사항</h5>

<ul>
<li>무인도에 갇힌 사람은 1명 이상 50,000명 이하입니다.</li>
<li>각 사람의 몸무게는 40kg 이상 240kg 이하입니다.</li>
<li>구명보트의 무게 제한은 40kg 이상 240kg 이하입니다.</li>
<li>구명보트의 무게 제한은 항상 사람들의 몸무게 중 최댓값보다 크게 주어지므로 사람들을 구출할 수 없는 경우는 없습니다.</li>
</ul>

<h5>입출력 예</h5>
<table class="table">
        <thead><tr>
<th>people</th>
<th>limit</th>
<th>return</th>
</tr>
</thead>
        <tbody><tr>
<td>[70, 50, 80, 50]</td>
<td>100</td>
<td>3</td>
</tr>
<tr>
<td>[70, 80, 50]</td>
<td>100</td>
<td>3</td>
</tr>
</tbody>
</table>
> 한 번에 최대 2명만 태울 수 있고, 무게 제한이 있을 때 보트 최소 개수를 구하는 문제.

```java
/*
1. 정렬을 한다
2. 가벼운 사람(start)과 제일 무거운 사람(end)을 확인한다
3. 합이 limit 초과면 end만 태운다
4. 합이 limit 이하라면 start와 end를 같이 태운다
5. 반복
*/

import java.util.Arrays;

class Solution {
    public int solution(int[] people, int limit) {
        int answer = 0;
        Arrays.sort(people);
        
        int start = 0;
        int end = people.length - 1;
        
        while (start <= end) {
            if (people[start] + people[end] > limit) {
                end--;
                answer++;
            } else {
                start++;
                end--;
                answer++;
            }
        }
        
        return answer;
    }
}
```

---

## 정리

- **연속 투포인터 (슬라이딩 윈도우)**  
  - 정렬 필요 없음  
  - `s=0, e=0` 으로 시작 → 구간 합을 유지하면서 포인터 이동  
  - 누적합 문제에서 자주 사용됨  

- **불연속 투포인터 (정렬 후 양끝 탐색)**  
  - 정렬 필수  
  - 가장 작은 값과 큰 값을 비교하면서 조건 만족 여부 판단  
  - Greedy + 투포인터 문제에서 자주 사용됨  

---

👉 즉, **연속이면 비정렬, 불연속이면 정렬**이 핵심이다 🚀
