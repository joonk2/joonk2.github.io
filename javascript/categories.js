import { basic, initSidebar, initTopbar } from './modules/layouts';
import { categoryCollapse } from './modules/plugins';
import { initChatbot } from './modules/components/chatbot';

basic();
initSidebar();
initTopbar();
categoryCollapse();
initChatbot();
