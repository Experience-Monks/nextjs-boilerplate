import { useEffect, useState } from 'react'

import { VisibilityService } from '@/services/visibility.service'

import { os } from '@/utils/detect'
import { getLowPowerMode } from '@/utils/detect-low-power-mode'

let cachedResult = false

export const useLowPowerMode = () => {
  const [lowPower, setLowPower] = useState(cachedResult)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const update = () => {
      getLowPowerMode()
        .then((isLowPower) => {
          setLowPower(isLowPower)

          clearTimeout(timeout)
          timeout = setTimeout(() => {
            update()
          }, 1000 * 5) // Check every 5 seconds
        })
        .catch(console.log)
    }

    if (os.ios) {
      update()
      VisibilityService.listen(update)
    }

    return () => {
      clearTimeout(timeout)
      VisibilityService.dismiss(update)
    }
  }, [])

  cachedResult = lowPower
  return cachedResult
}
