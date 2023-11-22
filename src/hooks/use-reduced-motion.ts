import { useEffect, useState } from 'react'

// https://css-tricks.com/introduction-reduced-motion-media-query/

export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery && mediaQuery.matches) setReducedMotion(true)
    function onChange(event: MediaQueryListEvent) {
      const element = event.target as MediaQueryList
      setReducedMotion(element.matches)
    }
    mediaQuery?.addEventListener('change', onChange)

    return () => {
      mediaQuery?.removeEventListener('change', onChange)
    }
  }, [])

  return reducedMotion
}
