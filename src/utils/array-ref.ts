import type { MutableRefObject } from 'react'

export function arrayRef<T extends MutableRefObject<unknown[] | null>>(
  ref: T,
  index: number
): (element: NonNullable<T['current']>[number] | null) => void {
  return (element) => {
    if (!ref.current) ref.current = []
    ref.current[index] = element
  }
}
