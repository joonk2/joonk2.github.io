---
title:  "오픈채팅방 lv2 &nbsp&nbsp&nbsp&nbsp&nbsp (2019 KAKAO BLIND RECRUITMENT)"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [연산, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2023-12-20
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/42888) 

![Desktop View](/assets/img/programmers-py/2023-12-20-openkakaotalk/0.png)

![Desktop View](/assets/img/programmers-py/2023-12-20-openkakaotalk/1.png)

![Desktop View](/assets/img/programmers-py/2023-12-20-openkakaotalk/2.png)
```python
코드 1

def solution(record):
    answer = []
    dict = {}
    for message in record:
        message_split = message.split()
        if message_split[0] == 'Enter' or message_split[0] =='Change':
            dict[message_split[1]] = message_split[2]

		for message in record:
        message_split = message.split()
        if message_split[0] == 'Enter':
            answer.append(dict[message_split[1]]+"님이 들어왔습니다.")
        elif message_split[0] =='Leave':
            answer.append(dict[message_split[1]]+"님이 나갔습니다.")

    return answer
```

## 풀이 1

`def solution(record):
answer = []
dict = {}`

answer을 빈 리스트로, dict는 빈 딕셔너리로 생성합니다

`for message in record:
message_split = message.split()
if message_split[0] == 'Enter' or message_split[0] =='Change':
dict[message_split[1]] = message_split[2]`

- <참고>를 보면 알 수 있듯이 공백을 포함하여 나누어야해서 split을 썼다.
- 만약 나눈 3개의 문자 중에서 첫번째 문자가 Enter 혹은 Change면,

들어오거나 닉네임 변경한 유저를 같은 유저로 인식

(id 키를 가진 딕셔너리를 닉네임으로 바꾼다)

`for message in record:
message_split = message.split()
if message_split[0] == 'Enter':
answer.append(dict[message_split[1]]+"님이 들어왔습니다.")
elif message_split[0] =='Leave':
answer.append(dict[message_split[1]]+"님이 나갔습니다.")`

`return answer`

- 노란 형광표시 확인 —> 입출 형식만 있다.
- answer에 append(추가)

```python
def solution(record):
    answer = []
    dic = {}
    
    for message in record:
        message_split = message.split()
        if len(message_split) == 3:
            dic[message_split[1]] = message_split[2]
            
    for message in record:
        message_split = message.split()
        if message_split[0] == 'Enter':
            answer.append('%s님이 들어왔습니다.' %dic[message_split[1]])
        elif message_split[0] == 'Leave':
            answer.append('%s님이 나갔습니다.' %dic[message_split[1]])
            
    return(answer)
```

알게된 것

```python
a = "개미"
print('%s가 들어왔다.' %a)

# 출력 --> 개미가 들어왔다.
```