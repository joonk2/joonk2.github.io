/**
 * Expand or close the sidebar in mobile screens.
 */

const ATTR_DISPLAY = 'sidebar-display';

class SidebarUtil {
  static isExpanded = false;

  static toggle() {
    console.log('Sidebar toggle called, current state:', SidebarUtil.isExpanded);
    
    if (SidebarUtil.isExpanded === false) {
      document.body.setAttribute(ATTR_DISPLAY, '');
      console.log('Sidebar expanded');
    } else {
      document.body.removeAttribute(ATTR_DISPLAY);
      console.log('Sidebar collapsed');
    }

    SidebarUtil.isExpanded = !SidebarUtil.isExpanded;
  }
}

export function sidebarExpand() {
  const sidebarTrigger = document.getElementById('sidebar-trigger');
  const mask = document.getElementById('mask');
  
  console.log('Initializing sidebar, sidebar-trigger found:', !!sidebarTrigger);
  console.log('Mask element found:', !!mask);
  
  if (sidebarTrigger) {
    sidebarTrigger.addEventListener('click', (e) => {
      console.log('Sidebar trigger clicked');
      SidebarUtil.toggle();
    });
  } else {
    console.error('Sidebar trigger element not found!');
  }

  if (mask) {
    mask.addEventListener('click', (e) => {
      console.log('Mask clicked');
      SidebarUtil.toggle();
    });
  } else {
    console.error('Mask element not found!');
  }
}
