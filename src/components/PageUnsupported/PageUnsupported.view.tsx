import type { FC } from 'react'
import type { ControllerProps } from './PageUnsupported.controller'

import classNames from 'classnames'

import css from './PageUnsupported.module.scss'

import copy from '@/utils/copy'

export interface ViewProps extends ControllerProps {}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ content }) => {
  return (
    <main className={classNames('PageUnsupported', css.root)}>
      <h1 className={css.title} {...copy.html(content.body.title)} />
    </main>
  )
}

View.displayName = 'PageUnsupported_View'
