import type { FC } from 'react'
import type { PageHandle } from '@/data/types'
import type { ControllerProps } from './PageNotFound.controller'

import { useEffect, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './PageNotFound.module.scss'

import copy from '@/utils/copy'

export interface ViewProps extends ControllerProps {}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ content, onReady }) => {
  const rootRef = useRef<HTMLElement>(null)
  const pageHandle = useRef<PageHandle>(null)

  useEffect(() => {
    gsap.set(rootRef.current, { opacity: 0 })
    onReady?.(pageHandle)
  }, [onReady])

  useImperativeHandle(pageHandle, () => ({
    animateIn: () => gsap.timeline().to(rootRef.current, { opacity: 1 }),
    animateOut: () => gsap.timeline().to(rootRef.current, { opacity: 0 })
  }))

  return (
    <main className={classNames('PageNotFound', css.root)} ref={rootRef}>
      <h1 className={css.title} {...copy.html(content.body.title)} />
    </main>
  )
}

View.displayName = 'PageNotFound_View'
