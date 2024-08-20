import type { ReactElement, ReactFragment } from 'react'

export function childrenAreEqual(
  previousChildren: ReactElement | ReactFragment | null,
  nextChildren: ReactElement | ReactFragment | null
): boolean {
  if (previousChildren === nextChildren) {
    return true
  }

  // React reconciler will create a new instance when children type changes
  if (
    (previousChildren !== null && 'type' in previousChildren && previousChildren.type) !==
    (nextChildren !== null && 'type' in nextChildren && nextChildren.type)
  ) {
    return false
  }

  // React reconciler will create a new instance when children key changes
  if (
    (previousChildren !== null && 'key' in previousChildren && previousChildren.key) !==
    (nextChildren !== null && 'key' in nextChildren && nextChildren.key)
  ) {
    return false
  }

  return true
}
