import { MutableRefObject, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { getScrollTop } from 'get-scroll';

import scroll from '@/services/scroll';

interface State {
  down: boolean;
  top: boolean;
  up: boolean;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function useScrollDirection(throttle = 100, target?: Element | RefObject<Element>, fallbackToWindowScroll = true) {
  const [state, setState] = useState<State>({
    down: false,
    top: true,
    up: false
  });

  const element = useMemo(
    () => target && ((target as MutableRefObject<Element>).current || (target as Element)),
    [target]
  );

  const lastScrollY = useRef(element ? element.scrollTop : typeof window !== 'undefined' ? getScrollTop() : 0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        const scrollY = element ? element.scrollTop : getScrollTop();

        setState({
          down: scrollY > lastScrollY.current,
          top: scrollY === 0,
          up: scrollY < lastScrollY.current
        });

        lastScrollY.current = scrollY;
      }, throttle);
    };

    handleScroll();

    if (element) {
      element.addEventListener('scroll', handleScroll);
    } else if (fallbackToWindowScroll) {
      scroll.listen(handleScroll);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      } else if (fallbackToWindowScroll) {
        scroll.dismiss(handleScroll);
      }
    };
  }, [element, throttle, fallbackToWindowScroll]);

  return state;
}

export default useScrollDirection;
