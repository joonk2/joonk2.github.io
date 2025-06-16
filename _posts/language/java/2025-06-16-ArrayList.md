---
title:  "[java] ArrayList"
layout: post
categories: [language, java]
tags: [md]
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
ArrayList는 Java에서 가장 많이 사용하는 **가변 길이의 리스트**입니다. 내부적으로 배열을 사용하지만, 크기가 자동으로 조절되므로 데이터를 삽입하거나 삭제할 때 유연하게 사용할 수 있습니다.

기본 특징:
- **순서가 유지**됩니다. (입력한 순서대로 저장)
- **인덱스를 통한 접근**이 빠릅니다.
- 요소를 삽입하거나 삭제하면 그 이후 요소들이 이동되므로, 중간 삽입/삭제는 약간의 성능 비용이 있습니다.
- `add()`, `remove()`, `get()`, `set()` 등의 메서드를 통해 쉽게 조작할 수 있습니다.

아래는 `ArrayList`의 주요 메서드 사용 예시입니다:

```java
package swea;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

//import java.util.Arrays;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
	public static void main(String[] args) throws IOException {
//		ArrayList<Integer> lst = new ArrayList<>();
//		lst.add(1);
//		lst.add(2);
//		lst.add(3);
//		lst.add(4);
//		lst.add(5);
		ArrayList<Integer> lst = new ArrayList<>(Arrays.asList(1,2,3,4,5));
		
		// 2번 인덱스 앞에 7 삽입
		lst.add(2, 7);
		
		// 4번 인덱스 삭제
		lst.remove(4);
		
		// 3번 idx를 111로 변경
		lst.set(3, 111);
		
		System.out.println(lst.get(2));
		System.out.println(lst.indexOf(7));
		
		System.out.println(lst);
	}	
}
```