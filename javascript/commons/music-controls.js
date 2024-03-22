// 전역 변수
var audio = new Audio();
var mp3Urls = [
  "https://github.com/joonk2/music/raw/music/happyworkingsong.mp4",
  "https://github.com/joonk2/music/raw/music/partlysunnyalwaysfunny.mp4",
  "https://github.com/joonk2/music/raw/music/Swingin_Yuletide.mp3",
  "https://github.com/joonk2/music/raw/music/A_Happy_Christmas_-_David_Fesliyan.mp3",
  "https://github.com/joonk2/music/raw/music/Tchaikovsky-march-of-the-wooden-solders(piano).mp3",
  "https://github.com/joonk2/music/raw/music/SellBuyMusic - C. Hunter - Possum And Taters_4.mp3"
  // Add more URLs as needed
];
var currentTrack = 0;

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function() {
  // 이전에 저장된 상태를 불러오고 음악을 재생합니다.
  loadSavedState();
  if (!audio.src) {
    playMusic();
  } else {
    updateButtons();
  }
});

// 음악이 끝나면 다음 트랙을 재생합니다.
audio.addEventListener('ended', function() {
  nextMusic();
});

// 현재 상태를 로컬 스토리지에 저장합니다.
function saveState() {
  localStorage.setItem('musicPlayerState', JSON.stringify({ currentTrack: currentTrack }));
}

// 이전에 저장된 상태를 불러옵니다.
function loadSavedState() {
  var savedState = JSON.parse(localStorage.getItem('musicPlayerState')) || {};
  if (savedState.currentTrack !== undefined) {
    currentTrack = savedState.currentTrack;
  }
}

// 음악을 재생합니다.
function playMusic() {
  if (audio.src !== mp3Urls[currentTrack]) {
    audio.src = mp3Urls[currentTrack];
  }
  audio.play().then(() => {
    updateButtons();
  }).catch((error) => {
    console.error("Autoplay failed:", error);
  });
}

// 음악을 일시 정지합니다.
function pauseMusic() {
  audio.pause();
  updateButtons();
  saveState();
}

// 다음 트랙을 재생합니다.
function nextMusic() {
  currentTrack = (currentTrack + 1) % mp3Urls.length;
  playMusic();
}

// 버튼 상태를 업데이트합니다.
function updateButtons() {
  var playButton = document.getElementById('playButton');
  var pauseButton = document.getElementById('pauseButton');
  playButton.disabled = !audio.paused;
  pauseButton.disabled = audio.paused;
  playButton.style.opacity = audio.paused ? '1' : '0.5';
  pauseButton.style.opacity = audio.paused ? '0.5' : '1';
  nextButton.style.opacity = '1';
}