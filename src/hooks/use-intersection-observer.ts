import type { MutableRefObject, RefObject } from 'react'

import { useEffect, useState } from 'react'

export function useIntersectionObserver(
  element: Element | RefObject<Element> | null | undefined,
  triggerOnce = true,
  threshold = 0.3
): boolean {
  const [intersecting, setIntersecting] = useState(false)

  useEffect(() => {
    let observer: IntersectionObserver

    if (element) {
      const el = (element as MutableRefObject<Element>).current || (element as Element)
      if (el?.tagName) {
        const options = {
          threshold,
          triggerOnce: Boolean(triggerOnce),
          rootMargin: '0px'
        }
        observer = new IntersectionObserver((entries) => {
          if (options.triggerOnce) {
            if (entries.some((e) => e.isIntersecting)) {
              setIntersecting(true)
              observer.unobserve(el)
            }
          } else {
            setIntersecting(entries[0].isIntersecting)
          }
        }, options)
        observer.observe(el)
      }
    }

    return () => {
      observer?.disconnect()
    }
  }, [element, threshold, triggerOnce])

  return intersecting
}
