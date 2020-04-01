import { getScrollTop } from 'get-scroll';

import scrollPage from './scroll-page';

type LockBodyScroll = {
  isLocked: boolean,
  lock: Function,
  unlock: Function
};

/**
 * Lock and unlock body scroll with page position restoration
 */
function lockBodyScroll(): LockBodyScroll {
  let scrollPosY = 0;
  let isLocked = false;

  /**
   * Lock body scroll
   */
  function lock(): void {
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
  function unlock(skipPositionRestore: boolean = false): void {
    if (isLocked) {
      document.body.style.position = '';
      document.body.style.overflowY = '';
      document.body.style.marginTop = '';
      !skipPositionRestore && scrollPage({ y: scrollPosY }, 0);
      isLocked = false;
    }
  }

  return { isLocked, lock, unlock };
}

export default (lockBodyScroll(): LockBodyScroll);
