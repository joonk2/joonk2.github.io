import { basic, initSidebar, initTopbar } from './modules/layouts';
import { loadImg, imgPopup, initClipboard } from './modules/plugins';
import { initChatbot } from './modules/components/chatbot';

loadImg();
imgPopup();
initSidebar();
initTopbar();
initClipboard();
basic();

// DOM이 완전히 로드된 후 챗봇 초기화
document.addEventListener('DOMContentLoaded', function() {
  initChatbot();
});
