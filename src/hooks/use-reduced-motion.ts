import { useEffect, useState } from 'react';

// https://css-tricks.com/introduction-reduced-motion-media-query/

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && mediaQuery.matches) setReducedMotion(true);
    function onChange(event: MediaQueryListEvent) {
      const element = event.target as MediaQueryList;
      setReducedMotion(element.matches);
    }
    if (mediaQuery) {
      mediaQuery.addEventListener ? mediaQuery.addEventListener('change', onChange) : mediaQuery.addListener(onChange);
    }
    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener
          ? mediaQuery.removeEventListener('change', onChange)
          : mediaQuery.removeListener(onChange);
      }
    };
  }, []);

  return reducedMotion;
};

export default useReducedMotion;
