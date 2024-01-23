import { useEffect } from 'react'
import { useBeforeUnmount } from '@mediamonks/react-transition-presence'

import { store } from '@/store'

export function useGsapTransitions(
  animations: { animateIn?: () => gsap.core.Animation; animateOut?: () => gsap.core.Animation },
  dependencies: readonly unknown[] = []
) {
  const animationsEnabled = store((state) => state.animations.animationsEnabled)

  useEffect(() => {
    if (!animationsEnabled) return
    const anim = animations.animateIn?.()
    return () => {
      anim?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, animations, animationsEnabled])

  useBeforeUnmount(async (abortSignal) => {
    if (!animations.animateOut) return
    const animation = animations.animateOut()
    abortSignal.addEventListener('abort', () => {
      animation.kill()
    })
    return animation
  })
}
