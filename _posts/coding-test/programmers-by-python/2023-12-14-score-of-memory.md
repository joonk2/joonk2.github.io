---
title:  "추억 점수 lv0"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [연산, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2023-12-14 
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/176963)

![Desktop View](/assets/img/programmers-py/2023-12-14-score-of-memory/0.png)

![Desktop View](/assets/img/programmers-py/2023-12-14-score-of-memory/1.png)

```python
def solution(name, yearning, photo):
    result = []
    info = dict(zip(name, yearning))
    
    for people in photo:        
        score = 0     
        for person in people:
            score += info.get(person, 0)
        result.append(score)
    return result
```

## <풀이>

```python
result = []
# 빈 리스트인 result 생성

info = dict(zip(name, yearning))
# name, yearning을 zip으로 묶어주며 이 튜플을 딕셔너리로 만든 후 info에 대입

for peoplie in photo:
    score = 0
  # 사진 속 사람들 확인하는 루프   &   그리움 점수 누적을 위한 초기값 0 설정

    for person in pepple:
      # 사람들 각각 점수를 확인할 루프

      score += info.get(person, 0)
			# 같은 뜻 score = score + info.get(person, 0)
			# person이 있으면 person에 해당하는 고유값 반환
			# 없다면 0 반환
			
		result.append(score)
		# result에 누적된 score 배열을 append(추가)하겠다.  
```

### 배운 것

`info.get(person, 0)`

★우선 위에 딕셔너리로 만들어 주었다는 것을 기억하자.

딕셔너리인 info에서 key가 person인 값을 찾는데, 만약 찾고자 하는 key가 없다면 2번째 인자인 0 반환

`result.append(score)`

result에 누적된 score 배열을 append(추가)하겠다.