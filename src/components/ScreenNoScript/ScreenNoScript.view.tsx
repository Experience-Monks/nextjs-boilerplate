import type { FC } from 'react'
import type { ControllerProps } from './ScreenNoScript.controller'

import classNames from 'classnames'

import css from './ScreenNoScript.module.scss'

import { copy } from '@/utils/copy'

export interface ViewProps extends ControllerProps {}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ className, content }) => {
  const Component = process.env.STORYBOOK ? 'div' : 'noscript'

  return (
    <Component className={classNames('ScreenNoScript', css.root, className)}>
      <div className={css.text}>
        <h1 className={css.title} {...copy.html(content.title, {}, 10)} />
        <p className={css.description} {...copy.html(content.description, {}, 10)} />
      </div>
    </Component>
  )
}

View.displayName = 'ScreenNoScript_View'
