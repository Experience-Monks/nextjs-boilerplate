import type { ForwardedRef, MutableRefObject, RefObject } from 'react'

import { useMemo, useRef } from 'react'

type UnknownMap = { [key: string | symbol]: unknown }
type InitialRefs<T extends UnknownMap> = {
  [key in keyof T]: RefObject<T[key]> | MutableRefObject<T[key]> | ForwardedRef<T[key]>
}
type ResultRefs<T extends UnknownMap> = { [key in keyof T]: MutableRefObject<T[key] | null> }

export function useRefs<T extends UnknownMap>(initialTarget?: Partial<InitialRefs<T>>): ResultRefs<T> {
  const proxyTarget = useRef<Partial<ResultRefs<T>>>((initialTarget ?? {}) as ResultRefs<T>)

  return useMemo(
    () =>
      new Proxy(proxyTarget.current, {
        get(target, prop): unknown {
          const p = prop as keyof T
          if (target[p]) return target[p]
          target[p] = { current: undefined } as MutableRefObject<T[keyof T]>
          return target[p]
        }
      }) as ResultRefs<T>,
    []
  )
}
