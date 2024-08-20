import { useEffect, useState } from 'react'

import { ResizeService } from '@/services/resize.service'

import { getLayout, ssrLayout } from '@/utils/get-layout'

/**
 * Layout hook
 * Set layout on window resize
 * @returns {object} Current layout object
 *
 * Example:
 * import useLayout from '@/hooks/use-layout';
 * const layout = useLayout();
 */
export function useLayout() {
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
