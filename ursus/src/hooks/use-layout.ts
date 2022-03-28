import { useState, useEffect, useCallback } from 'react';
import { useWindowSize } from '@jam3/react-hooks';

import { resizeDebounceTime } from '@/data/settings';
import layout, { Breakpoints } from '@/utils/layout';

/**
 * Layout hook
 * Set layout on window resize
 * @returns {object} Current layout object
 *
 * Example:
 * import useLayout from '[path]/use-layout';
 * const { layout } = useLayout();
 */
function useLayout(): { layout: Breakpoints } {
  const { innerWidth } = useWindowSize(resizeDebounceTime);
  const [currentLayout, setCurrentLayout] = useState<Breakpoints>(layout.all);

  const handleResize = useCallback(() => {
    const breakpoints = Object.keys(layout.all) as (keyof Breakpoints)[];
    if (breakpoints.filter((key) => currentLayout[key] !== layout[key]).length) {
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
