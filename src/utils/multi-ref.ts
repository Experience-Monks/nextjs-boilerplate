import type { ForwardedRef, MutableRefObject } from 'react'

export function multiRef<T = unknown>(
  ...refs: (MutableRefObject<T> | ForwardedRef<T> | ((r: T) => void))[]
): (element: unknown) => void {
  return (element) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') ref(element as T)
      else if (ref) ref.current = element as T
    })
  }
}
