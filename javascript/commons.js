import { basic, initSidebar, initTopbar } from './modules/layouts';
import { initChatbot } from './modules/components/chatbot';

initSidebar();
initTopbar();
basic();

// DOM이 완전히 로드된 후 챗봇 초기화
document.addEventListener('DOMContentLoaded', function() {
  initChatbot();
});
