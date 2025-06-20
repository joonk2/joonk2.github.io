import { basic, initSidebar, initTopbar } from './modules/layouts';
import { initLocaleDatetime } from './modules/plugins';
import { initChatbot } from './modules/components/chatbot';

initSidebar();
initTopbar();
initLocaleDatetime();
initChatbot();
basic();
