import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'

// Detects if a specific #hash is added to the current route. This is useful for
// opening modals or to trigger specific animations based on the location hash.

export function useHashState(hashes: string[]): [boolean, () => void, () => void] {
  const router = useRouter()
  const normalized = useMemo(() => hashes.map((h: string) => h.replace(/#/gu, '')), [hashes])
  const active = useMemo(
    () => normalized.some((hash) => router.asPath.includes(`#${hash}`)),
    [normalized, router.asPath]
  )
  const enable = useCallback(() => router.push({ hash: normalized[0] }), [normalized, router])
  const disable = useCallback(() => router.back(), [router])
  return [active, enable, disable]
}
