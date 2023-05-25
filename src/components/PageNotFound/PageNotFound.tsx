import { FC, memo, useEffect, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'
import gsap from 'gsap'

import css from './PageNotFound.module.scss'

import { Content, PageHandle, PageProps } from '@/data/types'

import copy from '@/utils/copy'

export interface PageNotFoundProps extends PageProps {
  content: Content['pageNotFound']
}
export interface ViewProps extends PageNotFoundProps {}

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
    <main className={classNames('PageNotFound', css.root)} ref={rootRef}>
      <h1 className={css.title} {...copy.html(content.body.title)} />
    </main>
  )
}

View.displayName = 'PageNotFound-View'

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const PageNotFound: FC<PageNotFoundProps> = (props) => {
  return <View {...props} />
}

PageNotFound.displayName = 'PageNotFound'

export default memo(PageNotFound)
