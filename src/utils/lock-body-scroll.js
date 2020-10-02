import { getScrollTop } from 'get-scroll';

import scrollPage from './scroll-page';

/**
 * Lock and unlock body scroll with page position restoration
 */
function lockBodyScroll() {
  let scrollPosY = 0;
  let isLocked = false;

  /**
   * Lock body scroll
   */
  function lock() {
    if (!isLocked) {
      scrollPosY = getScrollTop();
      document.body.style.position = 'fixed';
      document.body.style.overflowY = 'scroll';
      document.body.style.marginTop = `-${scrollPosY}px`;
      isLocked = true;
    }
  }

  /**
   * Unlock body scroll
   *
   * @param {boolean} [skipPositionRestore=false] - Skip page position restoration flag
   */
  function unlock(skipPositionRestore = false) {
    if (isLocked) {
      document.body.style.position = '';
      document.body.style.overflowY = '';
      document.body.style.marginTop = '';
      !skipPositionRestore && scrollPage({ y: scrollPosY });
      isLocked = false;
    }
  }

  return { isLocked, lock, unlock };
}

export default lockBodyScroll();
