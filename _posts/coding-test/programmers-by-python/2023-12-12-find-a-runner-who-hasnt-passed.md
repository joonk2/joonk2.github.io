---
title:  "완주하지 못한 선수 찾기 lv1"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [hash, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2023-12-12
---


## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42576?language=python3)

![Desktop View](/assets/img/programmers-py/2023-12-12-find-a-runner-who-hasnt-passed/0.png)

![Desktop View](/assets/img/programmers-py/2023-12-12-find-a-runner-who-hasnt-passed/1.png)

```python
def solution(participant, completion):
    hashDict = {}   # 참가자 목록을 딕셔너리 형태로 저장
    sumHash = 0
    # sumHash는 participant 리스트의 각 참가자 이름을 해싱해 합을 구하는데 사용
    # 0은 해시의 누적된 값을 저장할 공간을 마련해두기 위한 초기값

    # 참가자의 sum(hash) 구하기
    for part in participant:
        hashDict[hash(part)] = part
        sumHash += hash(part)        
				# sumHash = sumHash + hash(part)
    
    # 완주자의 sum(hash) 빼기
    for comp in completion:
        sumHash -= hash(comp)
				# sumHash = sumHash - hash(comp)
    
		# 완주못한자? --> 참가자 - 완주자
    # 남은 값이 완주하지 못한 선수의 hash 값이 된다
    return hashDict[sumHash]
```

![Desktop View](/assets/img/programmers-py/2023-12-12-find-a-runner-who-hasnt-passed/2.png)

# 삽화 예시

★ completion 배열

```python
전제조건: 3명 중 2명이 완주 성공이라면 1명은 당연히 실패했습니다.
```

![Desktop View](/assets/img/programmers-py/2023-12-12-find-a-runner-who-hasnt-passed/3.png)

```python
sumHash는 다합쳐서 35, 여기서 완주한 무시쿵야(5)와 완계쿵야(18)을 뺍시다
sumHash == 17이 우리가 찾는 완주못한 자의 key값입니다.
여기서 HashDict[sumHash] 쓰면 '초밥쿵야'가 답이 됩니다.
```

```python
def solution(participant, completion):
    answer = ''

    # 1. 두 리스트를 정렬
    participant.sort()
    completion.sort()

    # 2. completeion list의 len만큼 participant를 찾아서 없는 사람을 찾읍시다
    for i in range(len(completion)):
        if participant[i] != completion[i]:
            return participant[i]

    # 3. 맨 마지막이 꼴지고 완주를 못했다.
    return participant[-1] 
```

**<설명>**

![Desktop View](/assets/img/programmers-py/2023-12-12-find-a-runner-who-hasnt-passed/4.png)