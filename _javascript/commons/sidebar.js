$(function() {
  // 음악을 자동으로 재생할 audio 요소 생성
  var audio = new Audio();

  const sidebarUtil = (function () {
    const ATTR_DISPLAY = "sidebar-display";
    let isExpanded = false;
    const body = $("body");

    const toggleMusic = function() {
      var musicGif = document.getElementById('musicGif');
      var playPauseButton = document.getElementById('playPauseButton');

      if (audio.paused) {
        // 음악이 멈춰있을 때 재생
        audio.play();
        playPauseButton.innerText = 'Pause';  // 텍스트 변경
        musicGif.style.opacity = 1;  // 음악 이미지 표시
        isPlaying = true;  // 상태 업데이트
      } else {
        // 음악이 재생 중일 때 멈춤
        audio.pause();
        playPauseButton.innerText = 'Play';  // 텍스트 변경
        musicGif.style.opacity = 0.5;  // 음악 이미지 반투명하게 표시
        isPlaying = false;  // 상태 업데이트
      }
    };

    return {
      toggle: function() {
        if (isExpanded === false) {
          body.attr(ATTR_DISPLAY, "");
        } else {
          body.removeAttr(ATTR_DISPLAY);
        }

        isExpanded = !isExpanded;
        toggleMusic();  // 여기서 toggleMusic 함수 호출
      }
    };

  }());

  $("#sidebar-trigger").click(sidebarUtil.toggle);

  $("#mask").click(sidebarUtil.toggle);
});