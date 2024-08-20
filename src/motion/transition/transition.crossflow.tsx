import type { ReactElement } from 'react'
import type { TransitionPresenceProps } from './transition.presence'

import { cloneElement, useCallback, useEffect, useRef, useState } from 'react'
import { useIsMounted } from '@mediamonks/react-hooks'

import { childrenAreEqual } from '@/utils/children-are-equal'
import { getId } from '@/utils/get-id'

import { TransitionPresence } from './transition.presence'

type TransitionCrossFlowQueue = { [key: string]: TransitionPresenceProps['children'] }

export function TransitionCrossFlow({ children, onChildrenMounted, ...props }: TransitionPresenceProps): ReactElement {
  const previousChildren = useRef<typeof children>(children)

  const [queue, setQueue] = useState<TransitionCrossFlowQueue>(() => (children === null ? {} : { [getId()]: children }))

  const isMounted = useIsMounted()

  useEffect(() => {
    // Don't do anything during the first render
    if (!isMounted.current) return

    // If the children are equal we don't want to do anything
    const areChildrenEqual = childrenAreEqual(children, previousChildren.current)
    previousChildren.current = children

    if (areChildrenEqual) {
      return
    }

    // Add new children to the queue and remove the old children instance for
    // its key to start the  out transition
    setQueue((value) => {
      const emptyQueue: { [key: string]: null } = {}

      // eslint-disable-next-line guard-for-in
      for (const key in value) {
        emptyQueue[key] = null
      }

      if (children === null) {
        return emptyQueue
      }

      return {
        ...emptyQueue,
        [getId()]: children
      }
    })
  }, [children, isMounted, previousChildren])

  const onChildrenMountedCleanup = useCallback(
    (_children: ReactElement | null) => {
      setQueue((value) => {
        if (_children && 'key' in _children && _children.key !== null) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete value[_children.key]
        }

        return { ...value }
      })

      onChildrenMounted?.(_children, null)
    },
    [onChildrenMounted]
  )

  return (
    <>
      {Object.entries(queue).map(([key, queuedChildren]) => (
        <TransitionPresence onChildrenMounted={onChildrenMountedCleanup} {...props} key={key}>
          {queuedChildren && cloneElement(queuedChildren, { key })}
        </TransitionPresence>
      ))}
    </>
  )
}
