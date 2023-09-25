import { FC, memo, useRef } from 'react'
import classNames from 'classnames'

import css from './PageUnsupported.module.scss'

import { Content, PageProps } from '@/data/types'

import copy from '@/utils/copy'

export interface PageUnsupportedProps extends PageProps {
  // List here all props that are public and settable by the Layout component.
  content: Content['pageUnsupported']
}
export interface ViewProps extends PageUnsupportedProps {
  // List here the private props that are only settable by the controller component.
}

// View (pure and testable component, receives props from the controller)
export const View: FC<ViewProps> = ({ content }) => {
  const rootRef = useRef<HTMLElement>(null)

  return (
    <main className={classNames('PageUnsupported', css.root)} ref={rootRef}>
      <h1 className={css.title} {...copy.html(content.body.title)} />
    </main>
  )
}

View.displayName = 'PageUnsupported-View'

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const PageUnsupported: FC<PageUnsupportedProps> = (props) => {
  return <View {...props} />
}

PageUnsupported.displayName = 'PageUnsupported'

export default memo(PageUnsupported)
