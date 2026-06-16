---
title:  "HashSet vs HashMap"
description: "HashSet과 HashMap의 차이점과 각각의 특징을 설명합니다. Set과 Map 자료구조의 활용 시점을 이해하고, Java에서의 구현 방법과 시간 복잡도를 학습합니다."
layout: post
categories: [coding-test, datastructure-algorithm] 
tags: [datastructure, algorithm, HashSet, HashMap]
toc: true
toc_sticky: true
date: 2025-06-25
---

# ✅ HashSet vs HashMap

Java에서 `HashSet`과 `HashMap`은 모두 **Hash Table** 기반의 자료구조입니다. 둘 다 **빠른 삽입/탐색/삭제**가 가능하지만, **저장 방식과 사용 목적**은 다릅니다.

---

## ✅ HashSet

`HashSet`은 **중복을 허용하지 않는 집합(Set)** 구조입니다.  
내부적으로는 `HashMap`을 사용하여 원소들을 저장합니다. 순서는 보장되지 않으며, **값만 저장**됩니다.

### 📌 주요 메서드

| 메서드          | 시간 복잡도 | 설명                          |
|-----------------|-------------|-------------------------------|
| `add(e)`        | O(1)        | 원소 추가                     |
| `contains(e)`   | O(1)        | 포함 여부 조회                |
| `remove(e)`     | O(1)        | 원소 삭제                     |
| `Iterator` 순회 | O(N)        | 순회 (순서는 무작위)          |

### 📍 언제 써야 하는지 (O(1))
- **중복 제거가 필요할 때**
- **빠른 포함 여부 확인이 필요할 때**

### 📍 언제 쓰지 말아야 하는지
- **원소의 순서가 중요할 때** (→ `LinkedHashSet` 또는 `TreeSet`)
- **빈번한 정렬 또는 범위 탐색이 필요할 때**

### 💡 예시 코드

```java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();

        set.add("apple");
        set.add("banana");
        set.add("apple");  // 중복 무시

        System.out.println(set.contains("banana")); // true

        set.remove("banana");

        System.out.println(set); // [apple]
    }
}
```
<br><br><br>


## ✅ HashMap

`HashMap`은 **키(key)-값(value)** 쌍을 저장하는 자료구조입니다.  
**키는 중복이 불가능**하며, **값은 중복이 가능합니다**. 내부적으로 `HashTable`을 사용하여 효율적인 키-값 매핑을 제공합니다.

### 📌 주요 메서드

| 메서드             | 시간 복잡도 | 설명                        |
|--------------------|-------------|-----------------------------|
| `put(k, v)`        | O(1)        | 키-값 추가 또는 수정         |
| `get(k)`           | O(1)        | 키로 값 조회                 |
| `containsKey(k)`   | O(1)        | 키 존재 여부 확인            |
| `remove(k)`        | O(1)        | 키로 삭제                    |
| `keySet()/entrySet()` | O(N)      | 전체 순회                     |

### 📍 언제 써야 하는지 (O(1))
- **키-값 매핑이 필요할 때**
- **빠른 조회, 수정, 삭제가 필요할 때**

### 📍 언제 쓰지 말아야 하는지
- **삽입 순서 또는 정렬된 키 순서가 중요할 때** (→ `LinkedHashMap` 또는 `TreeMap`)
- **값 기준 정렬/탐색이 필요할 때**

### 💡 예시 코드
```java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();

        map.put("apple", 3);
        map.put("banana", 2);
        map.put("apple", 5); // 기존 값 수정

        System.out.println(map.get("apple"));          // 5
        System.out.println(map.containsKey("banana")); // true

        map.remove("banana");

        for (String key : map.keySet()) {
            System.out.println(key + " => " + map.get(key));
        }
    }
}
```