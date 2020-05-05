import { useState, useEffect, useCallback } from 'react';
import { useWindowSize } from '@jam3/react-hooks';
import settings from '../../data/settings';
import layout from '../layout';

/**
 * Layout hook
 * Set layout on window resize
 *
 * Example:
 * import useLayout from '[path]/use-layout';
 * const { layout } = useLayout();
 */
function useLayout() {
  const { innerWidth } = useWindowSize(settings.resizeDebounceTime);
  const [currentLayout, setCurrentLayout] = useState(layout.all);

  const handleResize = useCallback(() => {
    if ((Object.keys(layout.all) as (keyof typeof layout.all)[]).some(key => currentLayout[key] !== layout[key])) {
      setCurrentLayout(layout.all);
    }
  }, [currentLayout, setCurrentLayout]);

  useEffect(() => {
    handleResize();
  }, [handleResize, innerWidth]);

  return {
    layout: currentLayout
  };
}

export default useLayout;
