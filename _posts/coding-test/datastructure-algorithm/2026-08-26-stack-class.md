---
title:  "stack을 class로 구현"
description: "말 그대로 stack을 class로 구현하였다"
layout: post
categories: [coding-test, datastructure-algorithm, stack, implementation] 
tags: [stack, implementation]
toc: true
toc_sticky: true
math: true
date: 2026-08-26
---


## 🙋‍♂️ 들어가며
stack을 만들기 위해 class에 작성할 것들을 정리해보자
- 1. 데이터 상태 정의
- 2. 생성자
- 3. push
- 4. pop
- 5. peek
- 6. isEmpty
- 7. size

<br>

## ✅ 정답 코드 (stack)
```java
package joonhwan_k;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;

// test
import java.util.Arrays;


public class Solution {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int[] price = new int[] {1,3,2,3,6,4,5,2,1};
		int N = price.length;
		
		// 1. stack 생성
		my_stack stack = new my_stack(N);
		System.out.println(stack.top);
		stack.push(123);
		System.out.println(stack.top);
		System.out.println(stack.peek());
		stack.push(145);
		System.out.println(stack.top);
		System.out.println(stack.pop());
		System.out.println(stack.top);
		stack.push(999);
		System.out.println(stack.size());
		System.out.println(stack.isEmpty());
	}
	
	
	
	// 3. stack 클래스
	static class my_stack {
		
		// 3-1. 데이터 상태 정의
		private int top;
		private int[] stack;
		
		// 3-2. 생성자
		my_stack(int size) {
			top = -1;
			stack = new int[size];
		}
		
		// 3-3. push
		void push(int value) {
			top++;
			stack[top] = value;
		}
		
		// 3-4. pop
		int pop() {
			int value = stack[top];
			top--;
			return value;
		}
		
		// 3-5. peek
		int peek() {
			int value = stack[top];
			return value;
		}
		
		// 3-6. isEmpty
		boolean isEmpty() {
			if (top != -1) return false;
			return true;
		}
		
		// 3-7. size
		int size() {
			return top + 1;
		}
				
		
	}

}
```
<br><br><br>

## 출력 값
```java
-1
0
123
1
145
0
2
false
```