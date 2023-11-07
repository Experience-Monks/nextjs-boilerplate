import { useEffect, useState } from 'react'

import ResizeService from '@/services/resize'

import getLayout, { ssrLayout } from '@/utils/get-layout'

/**
 * Layout hook
 * Set layout on window resize
 * @returns {object} Current layout object
 *
 * Example:
 * import useLayout from '@/utils/use-layout';
 * const layout = useLayout();
 */
function useLayout() {
  const [currentLayout, setCurrentLayout] = useState(ssrLayout)

  useEffect(() => {
    function handleResize() {
      const layout = getLayout()
      if (JSON.stringify(layout) !== JSON.stringify(currentLayout)) setCurrentLayout(layout)
    }
    ResizeService.listen(handleResize)
    handleResize()
    return () => {
      ResizeService.dismiss(handleResize)
    }
  }, [currentLayout])

  return currentLayout
}

export default useLayout
