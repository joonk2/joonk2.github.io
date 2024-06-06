// music-controls.js

var audio = new Audio();
var mp3Urls = [
  "https://github.com/joonk2/music/raw/music/texas-look-me-up.mp3",
  "https://github.com/joonk2/music/raw/music/primitive-tribe.mp3",
  "https://github.com/joonk2/music/raw/music/soundfxcenter.mp3",
  "https://github.com/joonk2/music/raw/music/big-city.mp3",
  "https://github.com/joonk2/music/raw/music/forestpiano.mp3",
  "https://github.com/joonk2/music/raw/music/Swingin_Yuletide.mp3",
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








// --------------------------------      2024-03-13 업데이트 -----------------------------------------
  // 실행 중인 버튼에 반투명 스타일 적용
  playButton.style.opacity = audio.paused ? '1' : '0.5';
  pauseButton.style.opacity = audio.paused ? '0.5' : '1';
  nextButton.style.opacity = '1'; // next 버튼은 항상 투명하지 않음
}