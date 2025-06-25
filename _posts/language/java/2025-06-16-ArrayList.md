---
title:  "[java] ArrayList"
layout: post
categories: [coding-test, datastructure-algorithm]
tags: [java, ArrayList]
toc: true
toc_sticky: true
date: 2025-06-16
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


<br><br>


# ✅ 동적 배열 (ArrayList)

`ArrayList`는 **배열 기반**의 동적 리스트로, **자동으로 크기 확장**되며 **빠른 인덱스 접근**이 가능합니다.

### 🔍 개요
- **내부구조**: 배열 기반
- **자동 크기 확장**: 요소가 추가될 때 크기가 자동으로 늘어남

---

### ⏳ 시간 복잡도 요약
| 연산                     | 시간 복잡도 | 설명                           |
|--------------------------|-------------|--------------------------------|
| `add(value)`              | O(1)        | 맨 뒤에 추가                   |
| `add(index, value)`       | O(N)        | 중간 삽입, 요소들 이동 발생     |
| `get(index)`              | O(1)        | 인덱스 조회                    |
| `remove(index)`           | O(N)        | 중간 삭제, 요소들 이동 발생    |
| `set(index, value)`       | O(1)        | 값 수정                        |

---


### 📍 언제 써야 하는지 (O(1))
- **맨 뒤에서 추가** (`add`)
- **인덱스로 조회** (`get`)
- **값 수정** (`set`)

### 📍 언제 쓰지 말아야 하는지 (O(N))
- **중간 삽입/삭제**가 자주 일어날 때
- **앞쪽에서 반복적인 삽입/삭제**가 자주 일어날 때

---
<br><br>

### 🕒 위치별 연산 시간 복잡도

| 위치    | 추가 (add) | 삭제 (remove) | 조회 (get) |
|---------|------------|---------------|------------|
| 앞      | O(N)       | O(N)          | O(1)       |
| 중간    | O(N)       | O(N)          | O(1)       |
| 뒤      | O(1)       | O(1)          | O(1)       |

---

### 💡 예제 코드

#### 기본 추가 & 출력
```java
ArrayList<Integer> arr = new ArrayList<>();
arr.add(1);
arr.add(5);

for (int i = 0; i < arr.size(); i++) {
    System.out.print(arr.get(i)); // 출력: 15
}
```

<br><br>

### 중간에 값 삽입 (index 추가)
```java
ArrayList<Integer> arr = new ArrayList<>();
arr.add(1);
arr.add(2);
arr.add(3);

arr.add(1, 100); // 1번 인덱스에 100 삽입

for (Integer num : arr) {
    System.out.print(num + " "); // 출력: 1 100 2 3
}
```


<br><br>

### 값 교환 (set 메서드 사용)
```java
ArrayList<Integer> arr = new ArrayList<>();
arr.add(1);
arr.add(5);

int temp = arr.get(0);
arr.set(0, arr.get(1));
arr.set(1, temp);

System.out.println(arr.get(0)); // 5
System.out.println(arr.get(1)); // 1
```

<br><br>

### 뒤에서부터 하나씩 제거 (역순 삭제)
```java
ArrayList<Integer> arr = new ArrayList<>();
arr.add(1);
arr.add(2);
arr.add(3);
arr.add(4);
arr.add(5);

while (!arr.isEmpty()) {
    int lastIndex = arr.size() - 1;
    System.out.print(arr.get(lastIndex));  // 뒤에서 출력
    arr.remove(lastIndex);                // 뒤에서 삭제
}
// 출력: 54321
System.out.println(arr.size()); // 출력: 0
```

<br><br>

### 📍 예제 코드: ArrayList 사용 예시 (Java)
```java
package swea;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static void main(String[] args) throws IOException {
        ArrayList<Integer> lst = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        
        // 2번 인덱스 앞에 7 삽입
        lst.add(2, 7);
        
        // 4번 인덱스 삭제
        lst.remove(4);
        
        // 3번 idx를 111로 변경
        lst.set(3, 111);
        
        System.out.println(lst.get(2)); // 출력: 7
        System.out.println(lst.indexOf(7)); // 출력: 2
        
        System.out.println(lst); // 출력: [1, 2, 7, 111]
    }    
}```