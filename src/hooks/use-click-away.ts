import type { RefObject } from 'react'

import { useEffect, useRef } from 'react'

const useClickAway = (ref: RefObject<Element>, onClickAway: () => void) => {
  const callbackRef = useRef(onClickAway)

  useEffect(() => {
    callbackRef.current = onClickAway
  }, [onClickAway])

  useEffect(() => {
    const handler = (event: Event) => {
      const el = ref.current
      if (el && !el.contains(event.target as Node)) callbackRef.current()
    }
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [ref])
}

export default useClickAway
