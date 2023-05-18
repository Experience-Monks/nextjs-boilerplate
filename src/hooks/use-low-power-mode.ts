import { useEffect, useState } from 'react'

import visibility from '@/services/visibility'

import { os } from '@/utils/detect'
import getLowPowerMode from '@/utils/detect-low-power-mode'

let cachedResult = false

const useLowPowerMode = () => {
  const [lowPower, setLowPower] = useState(cachedResult)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const update = async () => {
      const isLowPower = await getLowPowerMode()
      setLowPower(isLowPower)

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        update()
      }, 1000 * 5) // Check every 5 seconds
    }

    if (os.ios) {
      update()
      visibility.listen(update)
    }

    return () => {
      clearTimeout(timeout)
      visibility.dismiss(update)
    }
  }, [])

  cachedResult = lowPower
  return cachedResult
}

export default useLowPowerMode
