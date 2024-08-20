import type { ReactElement, RefObject } from 'react'
import type { BeforeUnmountCallback } from '@/hooks/use-before-unmount'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRefValue } from '@mediamonks/react-hooks'

import { childrenAreEqual } from '@/utils/children-are-equal'
import { tick } from '@/utils/tick'

import { useTransitionPresenceBeforeUnmount } from '@/hooks/use-before-unmount'

import { TransitionContext } from './transition.context'

export type TransitionPresenceProps = {
  children: ReactElement | null
  blockParentTransition?: boolean
  onPreviousChildrenUnmounting?: (
    previousChildren: ReactElement | null,
    children: ReactElement | null
  ) => void | Promise<void>
  onPreviousChildrenUnmounted?: (
    previousChildren: ReactElement | null,
    children: ReactElement | null
  ) => void | Promise<void>
  onChildrenMounted?: (previousChildren: ReactElement | null, children: ReactElement | null) => void | Promise<void>
}

/**
 * Will defer transition in new children by waiting on the
 * `BeforeUnmountCallback`s that are registered using the `useBeforeUnmount`
 * hook.
 */
export function TransitionPresence({
  children,
  blockParentTransition,
  onPreviousChildrenUnmounting,
  onPreviousChildrenUnmounted,
  onChildrenMounted
}: TransitionPresenceProps): ReactElement {
  const beforeUnmountCallbacks = useMemo(() => new Set<RefObject<BeforeUnmountCallback>>(), [])

  const [previousChildren, setPreviousChildren] = useState<typeof children>(children)

  const onPreviousChildrenUnmountingRef = useRefValue(onPreviousChildrenUnmounting)
  const onPreviousChildrenUnmountedRef = useRefValue(onPreviousChildrenUnmounted)
  const onChildrenMountedRef = useRefValue(onChildrenMounted)

  const beforeUnmountPreviousChildren = useCallback(
    async (abortSignal: AbortSignal) => {
      const promises: ReturnType<BeforeUnmountCallback>[] = []
      for (const callback of beforeUnmountCallbacks) promises.push(callback.current?.(abortSignal))
      await Promise.all(promises)
    },
    [beforeUnmountCallbacks]
  )

  useEffect(() => {
    if (childrenAreEqual(children, previousChildren)) {
      setPreviousChildren(children)
      return
    }

    const abortController = new AbortController()

    ;(async (): Promise<void> => {
      onPreviousChildrenUnmountingRef.current?.(previousChildren, children)

      // Defer children update for before unmount lifecycle
      await beforeUnmountPreviousChildren(abortController.signal)

      setPreviousChildren(null)

      // Wait a tick after removing previous children to make sure new children
      // are re-initialized
      await tick()

      onPreviousChildrenUnmountedRef.current?.(previousChildren, children)

      // Set new children
      setPreviousChildren(children)
      await tick()

      onChildrenMountedRef.current?.(previousChildren, children)
    })()

    return () => {
      abortController.abort()
    }
  }, [
    children,
    previousChildren,
    onChildrenMountedRef,
    onPreviousChildrenUnmountedRef,
    onPreviousChildrenUnmountingRef,
    beforeUnmountPreviousChildren
  ])

  // Apply same effect when TransitionPresence in tree updates
  useTransitionPresenceBeforeUnmount(blockParentTransition ? beforeUnmountPreviousChildren : undefined)

  return <TransitionContext.Provider value={beforeUnmountCallbacks}>{previousChildren}</TransitionContext.Provider>
}
