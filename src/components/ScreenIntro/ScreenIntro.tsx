import { FC, memo } from 'react'
import classNames from 'classnames'

import css from './ScreenIntro.module.scss'

import { Intro } from '@/motion/rive/Intro'

export interface ScreenIntroProps {
  // List here all props that are public and settable by the parent component.
  className?: string
  onComplete?: () => void
}

export interface ViewProps extends ScreenIntroProps {
  // List here the private props that are only settable by the controller component.
}

// View (pure and testable component, receives props from the controller)
export const View: FC<ViewProps> = ({ className, onComplete }) => {
  const show = true
  return show ? (
    <div className={classNames('ScreenIntro', css.root, className)}>
      <Intro riveParams={{ onStop: onComplete }} />
    </div>
  ) : null
}

View.displayName = 'ScreenIntro-View'

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const ScreenIntro: FC<ScreenIntroProps> = (props) => {
  return <View {...props} />
}

export default memo(ScreenIntro)
