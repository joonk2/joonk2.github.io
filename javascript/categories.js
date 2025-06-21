import { basic, initSidebar, initTopbar } from './modules/layouts';
import { categoryCollapse } from './modules/plugins';
import { initChatbot } from './modules/components/chatbot';

basic();
initSidebar();
initTopbar();
categoryCollapse();

// DOM이 완전히 로드된 후 챗봇 초기화
document.addEventListener('DOMContentLoaded', function() {
  initChatbot();
});
