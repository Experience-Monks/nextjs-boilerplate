import { getScrollTop } from 'get-scroll';
import noop from 'no-op';

import scrollPage from '@/utils/scroll-page';

/**
 * Lock and unlock body scroll with page position restoration
 */
class LockBodyScroll {
  scrollPosY = 0;
  isLocked = false;

  lock =
    typeof window === 'undefined'
      ? noop
      : () => {
          this.scrollPosY = getScrollTop();
          document.body.style.position = 'fixed';
          document.body.style.overflowY = 'scroll';
          document.body.style.marginTop = `-${this.scrollPosY}px`;
          this.isLocked = true;
        };

  unlock =
    typeof window === 'undefined'
      ? noop
      : (skipPositionRestore: Boolean = false) => {
          document.body.style.position = '';
          document.body.style.overflowY = '';
          document.body.style.marginTop = '';
          !skipPositionRestore && scrollPage({ y: this.scrollPosY, duration: 0 });
          this.isLocked = false;
        };
}

export default new LockBodyScroll();
