import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery && mediaQuery.matches) setDarkMode(true);
    function onChange(event: MediaQueryListEvent) {
      const element = event.target as MediaQueryList;
      setDarkMode(element.matches);
    }
    if (mediaQuery) {
      mediaQuery.addEventListener('change', onChange);
    }
    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', onChange);
      }
    };
  }, []);

  return darkMode;
};

export default useDarkMode;
