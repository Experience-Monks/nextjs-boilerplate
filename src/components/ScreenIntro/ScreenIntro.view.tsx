import type { ControllerProps } from './ScreenIntro.controller'

import { type FC, useState } from 'react'
import classNames from 'classnames'

import css from './ScreenIntro.module.scss'

import { useRefs } from '@/hooks/use-refs'

import { Intro } from '@/motion/rive/Intro'

export interface ViewProps extends ControllerProps {
  onComplete?: () => void
}

export type ViewRefs = {
  root: HTMLDivElement
}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ className, onComplete }) => {
  const refs = useRefs<ViewRefs>()

  const [loaded, setLoaded] = useState(false)

  const handleLoad = () => setLoaded(true)

  return (
    <div className={classNames('ScreenIntro', css.root, className, { [css.loaded]: loaded })} ref={refs.root}>
      <Intro riveParams={{ onStop: onComplete, onLoad: handleLoad }} />
    </div>
  )
}

View.displayName = 'ScreenIntro_View'
