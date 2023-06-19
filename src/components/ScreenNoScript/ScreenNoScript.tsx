import { FC, memo } from 'react'
import classNames from 'classnames'

import css from './ScreenNoScript.module.scss'

import { Content } from '@/data/types'

import copy from '@/utils/copy'

export interface ScreenNoScriptProps {
  className?: string
  content: Content['common']['screenNoScript']
}
export interface ViewProps extends ScreenNoScriptProps {}

// View (pure and testable component, receives props from the controller)
export const View: FC<ViewProps> = ({ className, content }) => {
  const Component = process.env.STORYBOOK ? 'div' : 'noscript'
  return (
    <Component className={classNames('ScreenNoScript', css.root, className)}>
      <div className={css.text}>
        <h1 className={css.title} {...copy.html(content.title, {}, true)} />
        <p className={css.description} {...copy.html(content.description, {}, true)} />
      </div>
    </Component>
  )
}

View.displayName = 'ScreenNoScript-View'

// Controller (handle global state, router, data fetching, etc. Feeds props to the view component)
const ScreenNoScript: FC<ScreenNoScriptProps> = (props) => {
  return <View {...props} />
}

export default memo(ScreenNoScript)
