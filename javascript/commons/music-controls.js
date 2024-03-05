// music-controls.js

var audio = new Audio();
var mp3Urls = [
  "https://github.com/joonk2/music/raw/music/Swingin_Yuletide.mp3",
  "https://github.com/joonk2/music/raw/music/A_Happy_Christmas_-_David_Fesliyan.mp3",
  "https://github.com/joonk2/music/raw/music/Tchaikovsky-march-of-the-wooden-solders(piano).mp3",
  "https://github.com/joonk2/music/raw/music/SellBuyMusic - C. Hunter - Possum And Taters_4.mp3"
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