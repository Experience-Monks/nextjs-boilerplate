import { getScrollTop } from 'get-scroll';
import noop from 'no-op';

import scrollPage from '@/utils/scroll-page';

/**
 * Lock and unlock body scroll with page position restoration
 */
function lockBodyScroll() {
  let isLocked = false;
  let lock = noop;
  let unlock = noop;

  if (typeof window !== 'undefined') {
    let scrollPosY = 0;

    /**
     * Lock body scroll
     */
    lock = function () {
      if (!isLocked) {
        scrollPosY = getScrollTop();
        document.body.style.position = 'fixed';
        document.body.style.overflowY = 'scroll';
        document.body.style.marginTop = `-${scrollPosY}px`;
        isLocked = true;
      }
    };

    /**
     * Unlock body scroll
     * @param {boolean} [skipPositionRestore=false] - Skip page position restoration flag
     */
    unlock = function (skipPositionRestore = false) {
      if (isLocked) {
        document.body.style.position = '';
        document.body.style.overflowY = '';
        document.body.style.marginTop = '';
        !skipPositionRestore && scrollPage({ y: scrollPosY });
        isLocked = false;
      }
    };
  }

  return {
    get isLocked() {
      return isLocked;
    },
    lock,
    unlock
  };
}

const instance = lockBodyScroll();

if (typeof window !== 'undefined') {
  Object.freeze(instance);
}

export default instance;
