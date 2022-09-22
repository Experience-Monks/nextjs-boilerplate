import { useCallback, useEffect, useState } from 'react';

import { useWindowSize } from '@/hooks';
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
  const { width } = useWindowSize();
  const [currentLayout, setCurrentLayout] = useState<Breakpoints>(layout.all);

  const handleResize = useCallback(() => {
    const breakpoints = Object.keys(layout.all) as (keyof Breakpoints)[];

    if (breakpoints.filter((key) => currentLayout[key] !== layout[key]).length) {
      setCurrentLayout(layout.all);
    }
  }, [currentLayout, setCurrentLayout]);

  useEffect(() => {
    handleResize();
  }, [handleResize, width]);

  return {
    layout: currentLayout
  };
}

export default useLayout;
