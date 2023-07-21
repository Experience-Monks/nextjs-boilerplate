import { FC, memo, useEffect, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'
import gsap from 'gsap'

import css from './PageAbout.module.scss'

import { Content, PageHandle, PageProps } from '@/data/types'

import copy from '@/utils/copy'

export interface PageAboutProps extends PageProps {
  content: Content['pageAbout']
}
export interface ViewProps extends PageAboutProps {}

// View (pure and testable component, receives props from the controller)
export const View: FC<ViewProps> = ({ content, onReady }) => {
  const rootRef = useRef<HTMLElement>(null)
  const handleRef = useRef<PageHandle>(null)

  useEffect(() => {
    gsap.set(rootRef.current, { opacity: 0 })
    onReady?.(handleRef)
  }, [onReady])

  useImperativeHandle(handleRef, () => ({
    animateIn: () => gsap.timeline().to(rootRef.current, { opacity: 1 }),
    animateOut: () => gsap.timeline().to(rootRef.current, { opacity: 0 })
  }))

  return (
    <main className={classNames('PageAbout', css.root)} ref={rootRef}>
      <h1 className={css.title} {...copy.html(content.body.title)} />
      <div className={css.description} {...copy.html(content.body.description, {}, true)} />
    </main>
  )
}

View.displayName = 'PageAbout-View'

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const PageAbout: FC<PageAboutProps> = (props) => {
  return <View {...props} />
}

PageAbout.displayName = 'PageAbout'

export default memo(PageAbout)
