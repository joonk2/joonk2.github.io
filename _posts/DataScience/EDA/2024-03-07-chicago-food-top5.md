---
title:  "static web page crawling"
layout: post
categories: [DataScience, EDA, WebCrawling] 
tags: [eda, web-crawling, static web page crawling]
toc: true
toc_sticky: true
date: 2024-03-07
written: 2024-03-07 wed 00:37
---
<img src="https://raw.githubusercontent.com/joonk2/mySvg/main/zb-joonhwan.gif" width="400">

이글은 제로베이스 강의를 듣고 작성합니다. <br>
참 이번에 처음 알았는데 웹크롤링으로 `csv파일`도 만들 수 있네요 <br>
아무튼 이글은 `시카고 맛집 찾기`에 대해 총 3단계로 나눕니다!

## 목표
```
* 1단계: 메인페이지 긁어오고 html —> csv 파일로 저장 
* 2단계: 저장한 csv파일로 하위페이지 작성 
* 3단계: 구글 api를 이용한 시각화 
```
<br>

```python
<목차>

1-1. 파일 불러오기 & headers 의미 
1-2. 홈페이지에서 필요한 부분 추출
1-3. 차근차근 하나씩 
1-4. A to Z 
1-5. a 태그, href 
1-6. 결과 분리 re 
1-7. 아까 했던 1~6 원큐에 
1-8. 확인 및 DF형태로 만들고 저장 

2-1. 하위페이지 시작
2-2. 하위페이지 반복문 (5개)

3. 시각화 & 구글api
```

<br>

# 1-1. 파일 불러오기 & headers 의미

- `headers ={}`를 왜 쓰지? <br>
—> 저의 인터넷 접근 경로를 알리기 위해서입니다. <br>
전 chrome으로 접근하는데 그걸 시카고 맛집 홈페이지 서버관리자가 확인함으로써 당황하지않게 됩니다ㅎ

```python
# !pip install fake-useragent
from urllib.request import Request, urlopen 
from fake_useragent import UserAgent
from bs4 import BeautifulSoup

url_base = "https://www.chicagomag.com/"
url_sub = "Chicago-Magazine/November-2012/Best-Sandwiches-Chicago/"
url = url_base + url_sub  
ua = UserAgent()

# note
req = Request(url, headers={"user-agent": ua.ie})

html = urlopen(req)
soup = BeautifulSoup(html, "html.parser")
print(soup.prettify())
```
![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/0.png)
<br><br><br>

# 1-2. 홈페이지에서 필요한 부분 추출
https://www.chicagomag.com/Chicago-Magazine/November-2012/Best-Sandwiches-Chicago/  <br>
이 주소로 들어가 blt에서 검사 클릭
![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/1.png)

```python
# 1위인 blt를 검사하니 div class랑 class내용인 sammy가 있네. 이거 추출합시다

soup.find_all("div", "sammy"), len(soup.find_all("div", "sammy"))
#➡️ soup.select(".sammy"), len(soup.select(".sammy"))
```
<br><br><br>

# 1-3. 차근차근 하나씩

```python
# div class인 것과 class명이 sammy인 것 싹다
(soup.find_all("div", "sammy")) 

len(soup.find_all("div", "sammy")) # 50개 (잘 들어옴)

soup.find_all("div", "sammy")[0]
```

![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/2.png)
<br><br><br>

# 1-4. A to Z

![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/3.png)

> 이걸 참고해서 맨 아래 코드 짜봅시다

```python
## div class인 것과 class명이 sammy인 것 싹다
(soup.find_all("div", "sammy")) 

len(soup.find_all("div", "sammy")) # 50개 (잘 들어옴)

soup.find_all("div", "sammy")[0]
tmp_one = soup.find_all("div", "sammy")[0]
type(tmp_one) # bs4.element.Tag --> find 사용 가능

## sammy, sammyRank, sammyListing 아무거나 다 ㅇㅋ
tmp_one.find(class_="sammyListing").get_text() 
```

![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/4.png)
<br><br><br>

# 1-5. a태그, href

```python
# bs4.element 태그니까 아래 조건하에 a태그, href 찾아봄

tmp_one.find("a")["href"]
#➡️ tmp_one.select_one("a").get("href")
```
![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/5.png)
<br><br><br>

# 1-6. 결과 분리 re
```python
import re 
tmp_string = tmp_one.find(class_="sammyListing").get_text()
tmp_string
#➡️ 'BLT\nOld Oak Tap\nRead more '

re.split(("\n|\r\n"), tmp_string) # 역슬래시 n 혹은 역슬래시 r, n
#➡️ ['BLT', 'Old Oak Tap', 'Read more ']

print(re.split(("\n|\r\n"), tmp_string)[0]) # BLT
print(re.split(("\n|\r\n"), tmp_string)[1]) # Old Oak Tap 
```
<br><br><br>

# 1-7. 아까 했던 1~6 원큐에
```python
from urllib.parse import urljoin 

url_base = "http://www.chicagomag.com"

# 필요한 내용을 담을 빈 리스트 
# 리스트로 하나씩 컬럼을 만들고, DataFrame으로 합칠 예정 
rank = [] 
main_menu = [] 
cafe_name = [] 
url_add = [] 

list_soup = soup.find_all("div", "sammy") # soup.select(".sammy")

for item in list_soup: 
    rank.append(item.find(class_="sammyRank").get_text())
    tmp_string = item.find(class_="sammyListing").get_text() 
    main_menu.append(re.split(("\n|\r\n"), tmp_string)[0])
    cafe_name.append(re.split(("\n|\r\n"), tmp_string)[1])
    url_add.append(urljoin(url_base, item.find("a")["href"]))

list_soup 
#➡️ 50개
```
![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/6.png)
<br><br><br>

# 1-8. 확인 및 DF형태로 만들고 저장 
```python
# 50개씩 완벽하게 잘 들어옴

len(rank), len(main_menu), len(cafe_name), len(url_add)
#➡️ (50, 50, 50, 50)

rank[:5]
#➡️ ['1', '2', '3', '4', '5']

cafe_name[:5]
#➡️ ['Old Oak Tap', 'Au Cheval', 'Xoco', 'Al’s Deli', 'Publican Quality Meats']

url_add[:5]

#➡️ 5개까지 0, 1, 2, 3, 4
['http://www.chicagomag.com/Chicago-Magazine/November-2012/Best-Sandwiches-in-Chicago-Old-Oak-Tap-BLT/',
 'http://www.chicagomag.com/Chicago-Magazine/November-2012/Best-Sandwiches-in-Chicago-Au-Cheval-Fried-Bologna/',
 'http://www.chicagomag.com/Chicago-Magazine/November-2012/Best-Sandwiches-in-Chicago-Xoco-Woodland-Mushroom/',
 'http://www.chicagomag.com/Chicago-Magazine/November-2012/Best-Sandwiches-in-Chicago-Als-Deli-Roast-Beef/',
 'http://www.chicagomag.com/Chicago-Magazine/November-2012/Best-Sandwiches-in-Chicago-Publican-Quality-Meats-PB-L/']
```
<br>

DataFrame 형태로 만듭니다
```python
import pandas as pd 

data = {
    "Rank": rank, 
    "Menu": main_menu,
    "Cafe": cafe_name,
    "URL": url_add, 
}

df = pd.DataFrame(data)
df.tail(2)
```
![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/7.png)

<br><br>

```python
# 컬럼 순서 변경
df = pd.DataFrame(data, columns=["Rank", "Cafe", "Menu", "URL"])
df.tail()
```

![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/8.png)

```python
# 데이터 저장
src = "C:/Users/withj/Desktop/eda-practice/web"
df.to_csv(
    src + "/best_sandwiches_list_chicago.csv", sep=",", encoding="utf-8"
)
```

<br><br><br><br>

# 2-1. 하위페이지
>url 정보를 따라 50개 페이지 각각의 주소와 가격을 갖고와야 합니다.

```python
# requirements 
import pandas as pd 
from urllib.request import urlopen, Request
from fake_useragent import UserAgent
from bs4 import BeautifulSoup

src = "C:/Users/withj/Desktop/eda-practice/web"
df = pd.read_csv( src+ "/best_sandwiches_list_chicago.csv", index_col=0)
df.tail()

df["URL"][0]
#➡️ 'http://www.chicagomag.com/Chicago-Magazine/November-2012/Best-Sandwiches-in-Chicago-Old-Oak-Tap-BLT/'
```
<br><br>

출력해서 나온 첫번째 링크를 들어가서 조금 스크롤을 내려 저기서 `검사` 클릭 <br>
--> 확인하니 p라는 태그, &nbsp;&nbsp;addy라는 클래스

![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/9.png)

<br><br>

p랑 addy 찾자
```python
soup_tmp.find("p", "addy") # soup_find.select_one(".addy")
```
![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/10.png)

추출 ——> 가격, 위치, 번호, 홈페이지

```python
ua = UserAgent()
req = Request(df["URL"][0], headers={"user-agent":ua.ie})
html = urlopen(req).read()
soup_tmp = BeautifulSoup(html, "html.parser")
price_tmp = soup_tmp.find("p", "addy").text
price_tmp
```

![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/11.png)
<br><br>

., 기준으로 분리합니다. &nbsp;&nbsp;&nbsp; 그리고 `참고`를 보면 아래 코드를 쉽게 이해할 수 있음
```python
import re 
re.split(".,", price_tmp)
# 쉼표랑 점이랑 같이 있으면 분리
#➡️ ['\n$10. 2109 W. Chicago Ave', ' 773-772-040', ' theoldoaktap.com']

price_tmp = re.split(".,", price_tmp)[0]
price_tmp
#➡️ '\n$10. 2109 W. Chicago Ave'

------------ex) 참고-------------
pattern = r"\$\d+\.(\d+)?"
text = "$100.50"
----------------------------

tmp = re.search("\$\d+\.(\d+)?", price_tmp).group()
tmp
#➡️ '$10.'

price_tmp[len(tmp) + 2:]
#➡️ '2109 W. Chicago Ave'
```
<br><br><br>

# 2-2. 하위페이지 반복문 (5개)
```python
from tqdm import tqdm 

price = [] 
address = [] 

# 5개만 url 받자 0, 1, 2, 3, 4
# iterrows() --> 각행을 index, Series형태로 반환
for idx, row in tqdm(df[:5].iterrows()):

---------------- 수정 --------------------

# 근데 우리는 50개가 필요하니 싹 다 돌려야 함
for idx, row in tqdm(df.iterrows()):
    req = Request(row["URL"], headers={"user-agent":ua.ie})
    html = urlopen(req).read()
    soup_tmp = BeautifulSoup(html, "html.parser")
    gettings = soup_tmp.find("p", "addy").get_text()
    price_tmp = re.split(".,", gettings)[0]
    tmp = re.search("\$\d+\.(\d+)?", price_tmp).group()
    price.append(tmp)
    address.append(price_tmp[len(tmp)+2:])
    print(idx)

# 그럼 인덱스 0번부터 49번까지 아래에 천천히 progress처럼 생성합니다
```
<br><br>

잘 생성되었나 확인 ㄱㄱ
```python
len(price), len(address) 
# (50, 50)

address[:5]
# ['2109 W. Chicago Ave',
# '800 W. Randolph St',
# ' 445 N. Clark St',
# ' 914 Noyes St',
# '825 W. Fulton Mkt']

df.tail(2)
# 48 ..
# 49 ..

df["Price"] = price 
df["Address"] = address
df = df.loc[:, ["Rank", "Cafe", "Menu", "Price", "Address"]]
df.set_index("Rank", inplace=True)
df.head()
```

![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/12.png)
<br><br><br>

이제 저장~
```python
src = "C:/Users/withj/Desktop/eda-practice/web"
df.to_csv(
    src+"chicago2.csv", sep=",", encoding="UTF-8"
)
```

<br><br><br><br>

# 3. 시각화 & 구글api
아까 저장한 파일 불러옵시다
```python
df = pd.read_csv(src+"chicago2.csv", index_col=0)
df.tail()
```
![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/13.png)

<br><br>

이제 google geocoding api 쓰자
```python
gmaps_key = "write your key"
gmaps = googlemaps.Client(key=gmaps_key)

lat = [] 
lng = [] 

for idx, row in tqdm(df.iterrows()):
    if not row["Address"] == "Multiple location":
        target_name = row["Address"] + ", " + "Chicago"
        # print(target_name)
        gmaps_output = gmaps.geocode(target_name)
        location_ouput = gmaps_output[0].get("geometry")
        lat.append(location_ouput["location"]["lat"])
        lng.append(location_ouput["location"]["lng"])
        # location_output = gmaps_output[0]
    else:
        lat.append(np.nan)
        lng.append(np.nan)

#➡️ 0it [00:00, ?it/s]
#➡️ 50it [00:06,  8.23it/s]

len(lat), len(lng)
#➡️ (50, 50)

df.tail()
#➡️ 잘나옴

df["lat"] = lat 
df["lng"] = lng 
df.tail()
```
![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/14.png)
<br><br>

이제 시각화 ㄱㄱ
```python
mapping = folium.Map(location=[41.8781136, -87.6297982], zoom_start=11)

for idx, row in df.iterrows():
    if not row["Address"] == "Multiple location":
        folium.Marker(
            location=[row["lat"], row["lng"]],
            popup=row["Cafe"],
            tooltip=row["Menu"],
            icon=folium.Icon(
                icon="coffee",
                prefix="fa"
            )
        ).add_to(mapping)

mapping
```
![Desktop View](/assets/img/DataScience/EDA/WebCrawling/chicago/15.png)