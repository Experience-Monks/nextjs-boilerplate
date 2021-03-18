/**
 * Lock and unlock body scroll within page
 */

//importing utils
import { getScrollTop } from 'get-scroll';
import scrollPage from './scroll-page';

//variables
const root = document.documentElement;
let scrollPosY = 0;
let isLocked = false;

/* Lock body scroll function */

function lockBodyScroll() {
  if (!isLocked) {
    root.style.setProperty('--body-scroll', 'hidden');
    isLocked = true;
  }
}

/**
 * Unlock body scroll
 *
 * @param {boolean} [skipPositionRestore=false] - Skip page position restoration flag
 */

function unlockBodyScroll(skipPositionRestore = false) {
  if (isLocked) {
    scrollPosY = getScrollTop();
    root.style.setProperty('--body-scroll', 'auto');
    !skipPositionRestore && scrollPage({ y: scrollPosY });
    isLocked = false;
  }
}

export { lockBodyScroll, unlockBodyScroll };
