import type { RefObject } from 'react'

import { useContext, useEffect } from 'react'
import { useRefValue } from '@mediamonks/react-hooks'

import { TransitionContext } from '@/motion/transition/transition.context'

export type BeforeUnmountCallback = (
  abortSignal: AbortSignal
) => // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
PromiseLike<unknown> | void

/**
 * Executes async callback to defer unmounting of children in nearest
 * TransitionPresence boundary
 */
export function useBeforeUnmount(callback: BeforeUnmountCallback): void {
  const context = useContext(TransitionContext)
  const callbackRef = useRefValue(callback)

  if (context === undefined) console.warn('Component is not rendered in the context of a TransitionPresence')

  useEffect(() => {
    queueMicrotask(() => {
      context?.add(callbackRef)
    })

    return () => {
      context?.delete(callbackRef)
    }
  }, [context, callbackRef])
}

/**
 * useBeforeUnmount without the warning, this should only be used within the
 * <TransitionPresence> component in this package.
 */
export function useTransitionPresenceBeforeUnmount(callback: BeforeUnmountCallback | undefined): void {
  const context = useContext(TransitionContext)
  const callbackRef = useRefValue(callback)

  useEffect(() => {
    if (!callbackRef?.current) return

    const ref = callbackRef as RefObject<BeforeUnmountCallback>

    queueMicrotask(() => {
      context?.add(ref)
    })

    return () => {
      context?.delete(ref)
    }
  }, [context, callbackRef])
}
