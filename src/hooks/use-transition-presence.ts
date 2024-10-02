import { useEffect } from 'react'

import { store } from '@/store/store'

import { useBeforeUnmount } from '@/hooks/use-before-unmount'

export function useTransitionPresence(animations?: {
  animateIn?: () => gsap.core.Animation
  animateOut?: () => gsap.core.Animation
}) {
  const introComplete = store((state) => state.animations.introComplete)

  useEffect(() => {
    if (!animations || !introComplete) return
    const anim = animations.animateIn?.()
    return () => {
      anim?.kill()
    }
  }, [animations, introComplete])

  useBeforeUnmount(async (abortSignal) => {
    if (!animations?.animateOut) return
    const anim = animations.animateOut()
    abortSignal.addEventListener('abort', () => {
      anim.kill()
    })
    return anim
  })
}
