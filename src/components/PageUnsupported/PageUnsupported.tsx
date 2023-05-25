import { FC, memo, useEffect, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'
import gsap from 'gsap'

import css from './PageUnsupported.module.scss'

import { Content, PageHandle, PageProps } from '@/data/types'

import copy from '@/utils/copy'

export interface PageUnsupportedProps extends PageProps {
  content: Content['pageUnsupported']
}
export interface ViewProps extends PageUnsupportedProps {}

// View (pure and testable component, receives props from the controller)
export const View: FC<ViewProps> = ({ content, onReady }) => {
  const rootRef = useRef<HTMLElement>(null)
  const handleRef = useRef<PageHandle>(null)

  useEffect(() => {
    onReady?.(handleRef)
  }, [onReady])

  useImperativeHandle(handleRef, () => ({
    animateIn: () => gsap.timeline().to(rootRef.current, { opacity: 1 }),
    animateOut: () => gsap.timeline().to(rootRef.current, { opacity: 0 })
  }))

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
