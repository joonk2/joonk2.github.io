---
title:  "크레인 인형뽑기 lv1 &nbsp&nbsp&nbsp&nbsp&nbsp (2019 카카오 개발자 겨울 인턴십)"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [stack, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2023-12-21
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/64061) 

![Desktop View](/assets/img/programmers-py/2023-12-21-doll-picking-by-machine/0.png)

![Desktop View](/assets/img/programmers-py/2023-12-21-doll-picking-by-machine/1.png)

## 조건

- 같은 모양의 인형 2개가 연속으로 쌓일 시, 해당인형 2개 없어짐.
- 크레인 작동 시 인형 안 집어지는 경우는 없으나, 인형 없는 곳에서는 아무 것도 못 얻게 됨.

## 경우

1. 크레인이 내려오는 곳에 인형이 없을 때
2. 크레인이 내려오는 곳에 인형이 있을 때
3. 바구니에 담은 인형이 연속중복이라서 사라질 때

## 풀이

```python
<**참고>
--------------------------------------------------------------------**
board = [
    [0,0,0,0,0],
    [0,0,1,0,3],
    [0,2,5,0,1],
    [4,2,4,4,2],
    [3,5,1,3,1]
]

moves = [1,5,3,5,1,2,1,4]
--------------------------------------------------------------------
```

```python
def solution(board, moves):
    bucket = []
    answer = 0

    for pick in moves:
        for order in range(len(board)):
            if board[order][pick-1] == 0:
                pass
            else:
                bucket.append(board[order][pick-1])
                board[order][pick-1] = 0
                break

        if len(bucket) > 1 and bucket[len(bucket)-1] == bucket[len(bucket)-2]:
            bucket.pop(-1)
            bucket.pop(-1)
            answer += 2

    return answer
```

## 해설

`def solution(board, moves):
bucket = []
answer = 0`

- bucket —> 인형 담을 바구니
- answer —> 사라진 인형 찾기 위한 답을 구하기 위해 일단 0으로 초기화

`for pick in moves:
for order in range(len(board)):`

- for문 —> 인형 뽑는 순서가 moves에 있어 pick으로 임의 작성
- board는 인형 배치 형태라 order(순서)를 개별 요소로 작성 why?

—> 인형 뽑는 순서가 `1,5,3,5,1,2,1,4`니까, **참!** 그리고 board가 2차 배열이라 len()으로 범위 잡음

            `if board[order][pick-1] == 0:
                pass
            else:
                bucket.append(board[order][pick-1])
                board[order][pick-1] = 0
                break`

- 만약 인형이 없으면 패스, 있다면 인형을 뽑고(append),  막 뽑아서 인형이 없는 그 자리에 볼일 없으니 0으로 설정
- 그리고 break로 중단하고 다음 인형뽑기로 넘어가기
    
    (만약 break 안쓰면 계속해서 같은 칸의 인형 뽑아버림)
    

★ 왜 ***pick-1*** 인가? —> 배열의 인덱스는 보통 0부터 시작. 

근데 문제에는 moves 배열이 1부터 시작하니까, 1을 빼주자

`if len(bucket) > 1 and bucket[len(bucket)-1] == bucket[len(bucket)-2]:
bucket.pop(-1)
bucket.pop(-1)`

```python
**★참고**
바구니 안에 든 인형이 2개 이상이라면?? (연속으로 중복된 인형을 없애기 위한 설계)
이것도 역시 bucket이 배열이라 len()을 사용해줌, 안그럼 오타남
```

만약 바구니에 인형 2개 이상이고, 추가로 맨 끝 인형과 맨끝에서 2번째 인형이 같으면,

맨끝에 있는 것 둘다 각각 없애기

`answer += 2`

터뜨려서 사라진 인형을 찾는거니 없앤 만큼 2개 추가해줍시다

`return answer`

총 터뜨린 인형 갯수 반환

# 배운 것

인덱스는 0 부터 시작합니다!

1) 만약 배열이 0부터 시작한다면,    -1 없이 그대로.

```python
moves = [0,5,3,5,1,2,1,4]
for pick in moves:
        for order in range(len(board)):
            if board[order][pick] == 0:
```

2) 만약 배열이 1부터 시작한다면, -1 해주자

```python
moves = [1,5,3,5,1,2,1,4]
for pick in moves:
        for order in range(len(board)):
            if board[order][pick-1] == 0:
```