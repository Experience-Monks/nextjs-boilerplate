import { useEffect } from 'react'

import { store } from '@/store'

import { useBeforeUnmount } from '@/hooks/use-before-unmount'

export function useTransitionPresence(animations?: {
  animateIn?: () => gsap.core.Animation
  animateOut?: () => gsap.core.Animation
}) {
  const animationsEnabled = store((state) => state.animations.animationsEnabled)

  useEffect(() => {
    if (!animations || !animationsEnabled) return
    const anim = animations.animateIn?.()
    return () => {
      anim?.kill()
    }
  }, [animations, animationsEnabled])

  useBeforeUnmount(async (abortSignal) => {
    if (!animations?.animateOut) return
    const anim = animations.animateOut()
    abortSignal.addEventListener('abort', () => {
      anim.kill()
    })
    return anim
  })
}
