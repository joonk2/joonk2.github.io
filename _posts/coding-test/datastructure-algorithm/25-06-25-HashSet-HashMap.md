---
title:  "HashSet vs HashMap"
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, HashSet, HashMap]
toc: true
toc_sticky: true
date: 2025-06-25
---

# ✅ HashSet vs HashMap

Java에서 `HashSet`과 `HashMap`은 모두 **해시 테이블 기반의 자료구조**입니다.  
둘 다 빠른 삽입/탐색/삭제가 가능하지만, **저장 방식과 사용 목적**은 서로 다릅니다.

---

## 🔍 차이점 요약

| 항목         | HashSet                            | HashMap                                |
|--------------|------------------------------------|----------------------------------------|
| 저장 방식    | 값(value)만 저장                   | 키(key)-값(value) 쌍 저장             |
| 키 중복      | 해당 없음                          | 키 중복 불가                           |
| 값 중복      | 허용하지 않음                      | 값은 중복 가능                         |
| 내부 구조    | 내부적으로 HashMap을 사용함        | 자체적인 키-값 구조 사용               |
| 주요 메서드  | `add`, `remove`, `contains`, `size`| `put`, `get`, `remove`, `containsKey`, `keySet`, `values` 등 |

---

## ✅ HashSet

`HashSet`은 **중복을 허용하지 않는 집합(Set)** 구조입니다.  
내부적으로 `HashMap`을 사용하여, 값 자체가 key처럼 저장됩니다.

### 📌 주요 메서드

| 메서드        | 설명                            |
|---------------|---------------------------------|
| `add(e)`      | 요소 추가 (중복 시 무시됨)       |
| `remove(e)`   | 요소 제거                        |
| `contains(e)` | 요소 존재 여부 확인              |
| `size()`      | 요소 개수 반환                   |

### 💡 예시 코드
```java
import java.util.HashSet;

public class HashSetExample {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();

        // add: 요소 추가 (중복 허용 안 함)
        set.add("apple");
        set.add("banana");
        set.add("apple");  // 중복 무시됨

        // contains: 요소 포함 여부 확인
        System.out.println("banana 포함? " + set.contains("banana")); // true
        System.out.println("grape 포함? " + set.contains("grape"));   // false

        // remove: 요소 제거
        set.remove("banana");

        // size: 전체 요소 개수 확인
        System.out.println("전체 개수: " + set.size()); // 1

        // 최종 set 출력
        System.out.println("남은 요소: " + set); // [apple]
    }
}
```
```java
# ----- 출력 값 -----

banana 포함? true
grape 포함? false
전체 개수: 1
남은 요소: [apple]
```

<br><br><br>

## ✅ HashMap
`HashMap`은 **Key-Value 쌍으로 데이터를 저장**하는 자료구조입니다.  
Key는 중복이 불가능하며, Value는 중복이 가능합니다.

---

### 📌 주요 메서드

| 메서드           | 설명                                      |
|------------------|-------------------------------------------|
| `put(k, v)`      | 키-값 추가 (기존 키가 있으면 값 갱신)     |
| `get(k)`         | 키에 해당하는 값 반환                      |
| `remove(k)`      | 해당 키 제거                               |
| `containsKey(k)` | 특정 키 존재 여부 확인                     |
| `keySet()`       | 모든 키를 `Set` 형태로 반환                |
| `values()`       | 모든 값을 `Collection` 형태로 반환         |

---

### 💡 예시 코드

```java
import java.util.HashMap;
import java.util.Collection;
import java.util.Set;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();

        // put: 값 추가 및 갱신
        map.put("apple", 3);
        map.put("banana", 2);
        map.put("apple", 4); // 기존 키인 "apple"의 값 수정

        // get: 키에 해당하는 값 조회
        System.out.println("apple의 수량: " + map.get("apple")); // 4

        // containsKey: 키 존재 여부 확인
        System.out.println("pear 존재 여부: " + map.containsKey("pear")); // false

        // remove: 키 삭제
        map.remove("banana");

        // keySet: 모든 키 조회
        Set<String> keys = map.keySet();
        System.out.println("모든 과일 이름: " + keys); // [apple]

        // values: 모든 값 조회
        Collection<Integer> values = map.values();
        System.out.println("모든 과일 수량: " + values); // [4]
    }
}
```

```java
# ------ 출력 값 -----------

apple의 수량: 4
pear 존재 여부: false
모든 과일 이름: [apple]
모든 과일 수량: [4]
```