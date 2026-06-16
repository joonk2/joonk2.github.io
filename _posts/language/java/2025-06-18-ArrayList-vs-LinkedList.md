------title:  "[java] ArrayList vs LinkedList"
layout: post
categories: [coding-test, datastructure-algorithm]
tags: [java, 자료구조, ArrayList, LinkedList]
toc: true
toc_sticky: true
date: 2025-06-18

<br><br>

## 🔍 ArrayList vs LinkedList

Java의 `List` 인터페이스를 구현한 대표적인 두 클래스인 `ArrayList`와 `LinkedList`는 내부 구조와 성능 특성이 다릅니다. 사용 목적에 따라 적절히 선택하는 것이 중요합니다.

---

## 📌 차이점 요약

| 항목              | `ArrayList`                             | `LinkedList`                              |
|-------------------|------------------------------------------|--------------------------------------------|
| **저장 구조**      | 배열 기반 (index로 직접 접근)           | 노드 연결 기반 (각 노드가 이전/다음을 참조) |
| **접근 속도**      | 빠름 (O(1), index 접근)                 | 느림 (O(n), 앞에서부터 순차 접근)          |
| **삽입/삭제 속도** | 느림 (중간 삽입/삭제 시 shift 필요)     | 빠름 (노드 포인터만 변경)                  |
| **메모리 사용량**  | 적음                                    | 많음 (데이터 + 포인터 정보 저장)           |
| **순차 접근**      | 빠름                                    | 빠름                                       |
| **중간 수정**      | 느림                                    | 빠름                                       |

---
<br><br>

## 🧪 예시 코드

### ✅ ArrayList 예제

```java
import java.util.ArrayList;

ArrayList<String> arr = new ArrayList<>();
arr.add("a");
arr.add("b");
arr.add("c");

System.out.println(arr.get(1)); // "b"
```
✔️ get(index)로 빠른 접근 가능 <br>
❌ 중간 삽입/삭제 시 다른 요소를 이동시켜야 해서 느림


<br><br>

### ✅ LinkedList 예제

```java
import java.util.LinkedList;

LinkedList<String> list = new LinkedList<>();
list.add("a");
list.add("b");
list.add("c");

list.add(1, "x"); // 중간 삽입
```
❌ 인덱스 접근은 느림 (앞에서부터 찾아야 함) <br>
✔️ 삽입/삭제는 빠름 (포인터만 조정하면 됨)

🤔 어떤 걸 써야 할까? <br>
**`상황 추천 자료구조`**
- 데이터를 자주 읽고 접근해야 함 ArrayList 👍
- 데이터를 자주 삽입/삭제함	LinkedList 👍
- 전체 순회만 필요한 경우 둘 다 가능 ✅