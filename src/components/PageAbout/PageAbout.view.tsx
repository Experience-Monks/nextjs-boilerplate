import type { FC } from 'react'
import type { PageHandle } from '@/data/types'
import type { ControllerProps } from './PageAbout.controller'

import { useEffect, useImperativeHandle } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './PageAbout.module.scss'

import { copy } from '@/utils/copy'

import { useRefs } from '@/hooks/use-refs'

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLImageElement
  pageHandle: PageHandle
}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ content, onReady }) => {
  const refs = useRefs<ViewRefs>()

  useImperativeHandle(refs.pageHandle, () => ({
    animateIn: () => gsap.timeline().to(refs.root.current, { opacity: 1 }),
    animateOut: () => gsap.timeline().to(refs.root.current, { opacity: 0 })
  }))

  useEffect(() => {
    gsap.set(refs.root.current, { opacity: 0 })
    onReady?.(refs.pageHandle)
  }, [refs, onReady])

  return (
    <main className={classNames('PageAbout', css.root)} ref={refs.root}>
      <h1 className={css.title} {...copy.html(content.body.title)} />
      <div className={css.description} {...copy.html(content.body.description, {}, true)} />
    </main>
  )
}

View.displayName = 'PageAbout_View'
