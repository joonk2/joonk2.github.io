import { basic, initSidebar, initTopbar } from './modules/layouts';
import { loadImg, imgPopup, initClipboard } from './modules/plugins';
import { initChatbot } from './modules/components/chatbot';

loadImg();
imgPopup();
initSidebar();
initTopbar();
initClipboard();
initChatbot();
basic();
