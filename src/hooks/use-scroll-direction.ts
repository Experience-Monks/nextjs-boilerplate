import type { MutableRefObject, RefObject } from 'react'

import { useEffect, useMemo, useRef, useState } from 'react'

import { ScrollService } from '@/services/scroll.service'

import { getScrollTop } from '@/utils/basic-functions'

interface State {
  down: boolean
  top: boolean
  up: boolean
}

export function useScrollDirection(
  target?: Element | RefObject<Element>,
  throttle = 100,
  fallbackToWindowScroll = true
) {
  const [state, setState] = useState<State>({
    down: false,
    top: true,
    up: false
  })

  const element = useMemo(
    () => target && ((target as MutableRefObject<Element>).current || (target as Element)),
    [target]
  )

  const lastScrollY = useRef(element ? element.scrollTop : typeof window !== 'undefined' ? getScrollTop() : 0)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleScroll = () => {
      if (timeout) clearTimeout(timeout)

      timeout = setTimeout(() => {
        const scrollY = element ? element.scrollTop : getScrollTop()

        setState({
          down: scrollY > lastScrollY.current,
          top: scrollY === 0,
          up: scrollY < lastScrollY.current
        })

        lastScrollY.current = scrollY
      }, throttle)
    }

    handleScroll()

    if (element) {
      element.addEventListener('scroll', handleScroll)
    } else if (fallbackToWindowScroll) {
      ScrollService.listen(handleScroll)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
      if (element) {
        element.removeEventListener('scroll', handleScroll)
      } else if (fallbackToWindowScroll) {
        ScrollService.dismiss(handleScroll)
      }
    }
  }, [element, throttle, fallbackToWindowScroll])

  return state
}
