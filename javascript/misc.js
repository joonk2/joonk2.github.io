import { basic, initSidebar, initTopbar } from './modules/layouts';
import { initLocaleDatetime } from './modules/plugins';
import { initChatbot } from './modules/components/chatbot';

initSidebar();
initTopbar();
initLocaleDatetime();
basic();

// DOM이 완전히 로드된 후 챗봇 초기화
document.addEventListener('DOMContentLoaded', function() {
  initChatbot();
});
