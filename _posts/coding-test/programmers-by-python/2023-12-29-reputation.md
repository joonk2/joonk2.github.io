---
title:  "인사고과 lv3"
layout: post
categories: [coding-test, programmers-by-python] 
tags: [연산, datastructure, algorithm, coding-test]
toc: true
toc_sticky: true
date: 2023-12-29 
---

## [🌈문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/152995) 

![Desktop View](/assets/img/programmers-py/2023-12-29-reputation/0.png)

![Desktop View](/assets/img/programmers-py/2023-12-29-reputation/1.png)

# 코드

```python
def solution(scores):
    answer = 0 # 원호의 등수
    front, back = scores[0]
    total_score = front + back

    # 첫번째 점수에 대해서 내림차순, 그래서 -사용,
    # 첫 번째 점수가 같으면 두 번째 점수에 대해서 오름차순(기본형)으로 정렬
    scores.sort(key=lambda x: (-x[0], x[1]))
    
    # front 점수 기준으로 내림차순하면 인센티브가 합산점수 높은 순으로 절대 안나온다.
		# 그래서 max_back 만들어 줬고, 혹시 back이 최고점으로 갱신하고
		# total score인 원호점수보다 크면 원호가 등수 뒤로 밀리는 것으로
    max_back = 0
    
		# 원호점수 [2,2]를 각각 front, back에 고정해서 인덱스 1부터 반복하여 비교하여, 높으면 등수 위로 
    for a, b in scores:
        if front < a and back < b:
            return -1
            

        if b >= max_back:
            max_back = b
            if a + b > total_score:
                answer += 1
            
		# 원호 자신을 포함한 등수 반환이라 +1
    return answer + 1
```

## 풀이

- score 배열의 앞자리인 근무태도 점수를 front, 뒷자리인 동료평가 점수를 back으로 설정함
    
    —> 2개 더한 것을 total_score
    
- 문제에서 점수 높은 순으로 인센티브 준다하니 당연히 내림차순!, 앞의 점수가 같다면 두번째 점수는 오름차순

- *왜 어째서! ~~max_front~~가 아니라 `max_back`을 썼는가???*
    
    —> `scores = [[2,2],[1,4],[3,2],[3,2],[2,1]]`여기서 앞의 점수 기준으로 내림차순하면 합산한 결과가 높은 사람도 등수가 낮아지기 때문이다. 그래서 뒷점수까지 합한게 더 높은 순위가 될 수있도록, 일단 max_back 변수를 생성해줌
    
- 원호점수 [2,2]를 각각 front, back에 고정해서 인덱스 1부터 반복하여 비교하여,
    
    높으면 등수 위로 보내줄거라 return -1 함
    
- 누군가의 동료평가 점수가 기존 동료평가 점수보다 높고, (근무태도 + 동료평가)가 원호의 2개 합친 점수보다 높으면 원호는 등수 빠꾸먹고 내려가야해서 `answer += 1` 적었음
- 원호 자신을 포함한 등수 반환이라 `return answer +1`
    
    만약 return answer만 적으면 원호를 빼고 등수 반환 
    

# 다른 코드

```python
def solution(scores):
    answer = 1 # 1명의 등수를 위해 적은 것
    wanho = scores[0]
    sum_wanho = wanho[0] + wanho[1]
    
		# 앞자리 내림차순, 뒷자리 오름차순
    scores.sort(key = lambda x: (-x[0], x[1]))
    colleague_rating_score = 0
    for s in scores:
        if wanho[0] < s[0] and wanho[1] < s[1]:
            return -1
        if colleague_rating_score <= s[1]:
            if sum_wanho < s[0] + s[1]:
                answer += 1
            colleague_rating_score = s[1]
    return answer
```

<br><br><br>

# 참고

[https://www.ai-bio.info/programmers/152995](https://www.ai-bio.info/programmers/152995)

[https://cheon2308.tistory.com/entry/프로그래머스-Lv-3-파이썬-인사고과](https://cheon2308.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-Lv-3-%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%9D%B8%EC%82%AC%EA%B3%A0%EA%B3%BC)