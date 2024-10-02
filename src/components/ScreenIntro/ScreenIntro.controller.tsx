import type { FC } from 'react'

import { memo, useCallback } from 'react'
import dynamic from 'next/dynamic'

import { store } from '@/store/store'

const View = dynamic(() => import('./ScreenIntro.view').then((m) => m.View), { ssr: false })

export interface ControllerProps {
  className?: string
}

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
export const Controller: FC<ControllerProps> = memo((props) => {
  const introComplete = store(({ animations }) => animations.introComplete)
  const setIntroComplete = store(({ animations }) => animations.setIntroComplete)

  const handleComplete = useCallback(() => {
    setIntroComplete(true)
  }, [setIntroComplete])

  return introComplete ? null : <View {...props} onComplete={handleComplete} />
})

Controller.displayName = 'ScreenIntro_Controller'
