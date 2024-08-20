import { useEffect, useState } from 'react'

import { OrientationService } from '@/services/orientation.service'
import { ResizeService } from '@/services/resize.service'

import { device } from '@/utils/detect'

export function useOrientation(includeDesktop = false) {
  const [current, setCurrent] = useState({ portrait: true, landscape: false }) // ssr

  useEffect(() => {
    const update = () => {
      setCurrent({ landscape: device.landscape, portrait: !device.landscape })
    }

    if (device.mobile || includeDesktop) {
      update()
      if (includeDesktop) {
        ResizeService.listen(update)
      } else {
        OrientationService.listen(update)
      }
    }

    return () => {
      ResizeService.dismiss(update)
      OrientationService.dismiss(update)
    }
  }, [includeDesktop])

  return current
}
