import { useEffect, useState } from 'react'

import { VisibilityService } from '@/services/visibility.service'

export const useWindowVisible = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const update = (e: Event) => {
      if (e && e.type === 'blur') {
        setVisible(false)
      } else {
        setVisible(!document.hidden)
      }
    }

    VisibilityService.listen(update)

    return () => {
      VisibilityService.dismiss(update)
    }
  }, [])

  return visible
}
