import { FC, memo } from 'react'
import classNames from 'classnames'

import css from './ScreenNoScript.module.scss'

import { Content } from '@/data/types'

import copy from '@/utils/copy'

import useFeatureFlags from '@/hooks/use-feature-flags'

export interface ScreenNoScriptProps {
  // List here all props that are public and settable by the parent component.
  className?: string
  content: Content['common']['screenNoScript']
}
export interface ViewProps extends ScreenNoScriptProps {
  // List here the private props that are only settable by the controller component.
}

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
  const { flags } = useFeatureFlags()
  return flags.javascriptRequired ? <View {...props} /> : null
}

export default memo(ScreenNoScript)
