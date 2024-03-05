---
title:  "[blog] 블로그 음악 추가"
layout: post
categories: [etc, blog] 
tags: [blog, jekyll, github, git]
toc: true
toc_sticky: true
date: 2024-03-05
written: 2024-03-05 tue 08:58
---

```python
<목차>
1. 음악은 어디서 구해오냐?
2. 음악 자동재생 기준으로 멈춤&재생 버튼을 추가해보자
3. githubpage에서 작동하게 변형해보자 (수동으로 클릭)
4. github page에 업로드하고 확인
```
<br><br><br>

# 1. 음악은 어디서 구해오냐?

우선 이글은 jekyll theme chirpy를 기준으로 작성한다. <br>
저작권 문제로 인해 나는 저작권이 없는 무료 음반사이트를 이용하였다. <br>
## —> [이것 클릭](https://www.fesliyanstudios.com/royalty-free-music/downloads-c/happy-music/2)

음악을 다운로드받고 나는 githib에 따로 또 등록하였다. <br>
우리가 필요한 건 음악의 raw 주소다. <br>
github나 gitlab에 올린 음악파일.wav 혹은 mp4는 용량이 커서 view raw를 누르면 다운로드 되는데 당황하지말고 일단 나의 글을 천천히 잘 읽어보자 <br>

음악의 raw주소는 아래 코드에 어떻게 구하는지 나의 코드를 보고 참고하자. <br>
이제 다음으로 넘어가겠다. <br><br><br><br><br>

# 2. 음악 자동재생 기준으로 멈춤&재생 버튼을 추가해보자

sidebar, topbar, 뭐 아래쪽 부분 등등 추가할 위치는 여러분의 선택이다 <br>
우선 나는 원하는 버튼과 glf이미지를 _includes/sidebar.html에 추가했다. <br>
물결표시 부분에 코드 추가해주었다. <br>
```
  </ul> <!-- ul.nav.flex-column -→

~~~

 <div class="sidebar-bottom mt-auto d-flex flex-wrap justify-content-center align-items-center">
```
<br><br>

### _includes/sidebar.html 물결부분에 추가한 코드
```html
<!-- 음악 제어 버튼 추가 -->
<div id="music-controls" style="text-align: center;">
  <img id="musicGif" src="https://media.tenor.com/15YUsMWt4FEAAAAj/music.gif" alt="Music GIF" style="display: inline-block; width: 50px; height: 50px; margin-top: 21px;">
  <button id="playButton" onclick="playMusic()" style="display: inline-block; margin-top: 10px; font-size: 14px;">Play</button>
  <button id="pauseButton" onclick="pauseMusic()" style="display: inline-block; margin-top: 10px; font-size: 14px;">Pause</button>
  <button id="nextButton" onclick="nextMusic()" style="display: inline-block; margin-top: 10px; font-size: 14px;">Next</button>
</div>

<script>
  var audio = new Audio();
  var mp3Urls = [
    "https://github.com/joonk2/music/raw/music/Swingin_Yuletide.mp3",
    "https://github.com/joonk2/music/raw/music/A_Happy_Christmas_-_David_Fesliyan.mp3",

    // Add more URLs as needed
  ];
  var currentTrack = 0;

  // 이전에 저장된 상태를 불러오기
  var savedState = JSON.parse(localStorage.getItem('musicPlayerState')) || {};
  if (savedState.currentTrack !== undefined) {
    currentTrack = savedState.currentTrack;
  }

  // 페이지 로드 시 자동으로 상태에 따라 트랙을 재생
  playMusic();

  audio.addEventListener('ended', function() {
    // 음악이 끝나면 다음 트랙으로 자동 재생
    nextMusic();
  });

  function saveState() {
    // 현재 상태를 로컬 스토리지에 저장
    localStorage.setItem('musicPlayerState', JSON.stringify({ currentTrack: currentTrack }));
  }

  function playMusic() {
    if (audio.src !== mp3Urls[currentTrack]) {
      audio.src = mp3Urls[currentTrack];
    }
    audio.play().then(() => {
      updateButtons();
      saveState();
    }).catch((error) => {
      console.error("Autoplay failed:", error);
    });
  }

  function pauseMusic() {
    audio.pause();
    updateButtons();
    saveState();
  }

  function nextMusic() {
    currentTrack = (currentTrack + 1) % mp3Urls.length;
    playMusic(); // 다음 트랙을 재생
  }

  function updateButtons() {
    var playButton = document.getElementById('playButton');
    var pauseButton = document.getElementById('pauseButton');
    playButton.disabled = !audio.paused;
    pauseButton.disabled = audio.paused;
  }
</script>
```

```bash
# 실행하면 이렇게 된다
bundle exec jekyll build
```
![Desktop View](/assets/img/blog/music/0.png)
#### 영상으로 확인하고 싶으면 링크 클릭
## [ㄱㄱ](https://github.com/joonk2/music/assets/153247950/492279e7-a319-4bd8-b049-1c3b4f75dae5)

- [x] 로컬 홈페이지를 들어가자마자 음악 자동재생 된다
- [x] play, pause, next 버튼 모두 잘 작동한다
- [] github page에서 잘 작동하는가? (잘 모름)

<br><br><br><br>

# 3. githubpage에서 작동하게 변형해보자 (수동으로 클릭)

규정 때문에 githubpage에서 위의 코드로는 작동 안한다카네 <br>

`bundle exec jekyll build` 을 통해 들어간 로컬 주소 [http://127.0.0.1:4000/](http://127.0.0.1:4000/) 여기서는 자동 실행이 잘만되는데 어째서 깃허브 블로그에 업로드하고 각 play, pause, next 버튼을 클릭하니 음악 실행은 되지않고 F12 누르니 아래와 같은 오류가 뜨더라

![Desktop View](/assets/img/blog/music/1.png)
<br>

jekyll 페이지가 정적이라하여 처음 홈페이지 들어올 때 자동 재생을 못한다더라 <br>
대신 메인 홈페이지 들어오자마자 play를 누르거나 내부 페이지를 눌렀을 때 음악 자동재생이 시작된다하네 <br>
<br><br>

내가 바꾸고 추가한 것 (총 3가지)
```
/_javascript —> /javascript

music-controls.js

sidebar.html
```
<br><br>

### 3-1) 우선 /_javascript —> /javascript

jekyll theme은 /_filename 형식은 안 읽는다고 하여 폴더명을 바꿔주었다 <br>
`/_javascript —> /javascript`

<br>

### 3-2) /javascript/commons/music-controls.js

새로운 파일인 music-controls.js를 생성해주었다. 왜냐하면 jekyll은 정적인 페이지라 아까 위의 html코드에 한번에 작성하면 로컬주소에서는 작동이 될진 모르나, 실제 나의 https 도메인에서는 작동이 안되기에 기능을 끌어오는 방식으로 써야한다더라

```jsx
// music-controls.js

var audio = new Audio();
var mp3Urls = [
  "https://github.com/joonk2/music/raw/music/Swingin_Yuletide.mp3",
  "https://github.com/joonk2/music/raw/music/A_Happy_Christmas_-_David_Fesliyan.mp3",
  // Add more URLs as needed
];
var currentTrack = 0;

// 이전에 저장된 상태를 불러오기
var savedState = JSON.parse(localStorage.getItem('musicPlayerState')) || {};
if (savedState.currentTrack !== undefined) {
  currentTrack = savedState.currentTrack;
}

// 페이지 로드 시 자동으로 상태에 따라 트랙을 재생
playMusic();

audio.addEventListener('ended', function() {
  // 음악이 끝나면 다음 트랙으로 자동 재생
  nextMusic();
});

function saveState() {
  // 현재 상태를 로컬 스토리지에 저장
  localStorage.setItem('musicPlayerState', JSON.stringify({ currentTrack: currentTrack }));
}

function playMusic() {
  if (audio.src !== mp3Urls[currentTrack]) {
    audio.src = mp3Urls[currentTrack];
  }
  audio.play().then(() => {
    updateButtons();
    saveState();
  }).catch((error) => {
    console.error("Autoplay failed:", error);
  });
}

function pauseMusic() {
  audio.pause();
  updateButtons();
  saveState();
}

function nextMusic() {
  currentTrack = (currentTrack + 1) % mp3Urls.length;
  playMusic(); // 다음 트랙을 재생
}

function updateButtons() {
  var playButton = document.getElementById('playButton');
  var pauseButton = document.getElementById('pauseButton');
  playButton.disabled = !audio.paused;
  pauseButton.disabled = audio.paused;
}
```
<br><br>

### 3-3) _includes/sidebar.html


### src 변경 시도
사실 수도 없이 시도해봤지만 그나마 마지막으로 기억나는게 이 방법들이다. <br>
참고로 `/_javascript/` 경로로 시도해본다면 안될 것이다. 내가 그 시행착오를 엄청 겪었다. 만약 폴더명을 바꾸지 않아도 된다면 여러분은 행운이고 그렇지 않다면 내 방법을 따라하여 나처럼 오랫동안 여기에 시간이 묶이지 않길 바랄 뿐이다.

```html
1번째 시도(폴더명 바꾸기 전) --> <script src="/_javascript/commons/music-controls.js"></script>
2번째 시도     //           --> 비슷
........
........
n-3번째 시도 --> <script src="https://joonk2.github.io/_javascript/commons/music-controls.js"></script>
n-2번째 시도 --> <script src="/javascript/commons/music-controls.js"></script>
n-1번째 시도 --> <script src="../../javascript/commons/music-controls.js"></script>
마지막 시도 --> <script src="{{ site.baseurl }}/javascript/commons/music-controls.js"></script>`
```

아까 적었던 코드에서 조금 변형을 시켜 이렇게 만들어보자
나는 이러한 방법으로 시도하다가 결국 해결이 되었다.

```jsx
# sidebar.html

<!-- 음악 제어 버튼 추가 -->
<div id="music-controls" style="text-align: center;">
  <img id="musicGif" src="https://media.tenor.com/15YUsMWt4FEAAAAj/music.gif" alt="Music GIF" style="display: inline-block; width: 50px; height: 50px; margin-top: 21px;">
  <button id="playButton" onclick="playMusic()" style="display: inline-block; margin-top: 10px; font-size: 14px;">Play</button>
  <button id="pauseButton" onclick="pauseMusic()" style="display: inline-block; margin-top: 10px; font-size: 14px;">Pause</button>
  <button id="nextButton" onclick="nextMusic()" style="display: inline-block; margin-top: 10px; font-size: 14px;">Next</button>
</div>

<script src="{{ site.baseurl }}/javascript/commons/music-controls.js"></script>
```

<br><br><br><br>
# 4. github page에 업로드하고 확인
![Desktop View](/assets/img/blog/music/2.png)

#### 영상으로 확인하고 싶으면 링크 클릭
## [ㄱㄱ](https://github.com/joonk2/music/assets/153247950/12c0ae39-a3c7-4d03-b3aa-71600e473137)
 <br><br>

이제 우리는 깃허브 메인 홈페이지에서 수동으로 play를 클릭하면 음악이 자동으로 재생되는 것을 확인할 수 있고, pause, next도 정상 작동한다.

## 블로그가 조금 더 활기차진 것 같지 않은가!?