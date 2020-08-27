import { useState, useEffect, useCallback } from 'react';
import { useWindowSize } from '@jam3/react-hooks';

import { resizeDebounceTime } from '../../data/settings';
import layout from '../layout';

/**
 * Layout hook
 * Set layout on window resize
 * @returns {object} Current layout object
 *
 * Example:
 * import useLayout from '[path]/use-layout';
 * const { layout } = useLayout();
 */
function useLayout() {
  const { innerWidth } = useWindowSize(resizeDebounceTime);
  const [currentLayout, setCurrentLayout] = useState(layout.all);

  const handleResize = useCallback(() => {
    if (Object.keys(layout.all).filter((key) => currentLayout[key] !== layout[key]).length) {
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
