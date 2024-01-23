import type { FC } from 'react'
import type { ControllerProps } from './PageAbout.controller'

import { useEffect } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './PageAbout.module.scss'

import { copy } from '@/utils/copy'

import { useRefs } from '@/hooks/use-refs'
import { useTransitionPresence } from '@/hooks/use-transition-presence'

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLImageElement
}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ content }) => {
  const refs = useRefs<ViewRefs>()

  useEffect(() => {
    gsap.set(refs.root.current, { opacity: 0 })
  }, [refs])

  useTransitionPresence({
    animateIn: () => gsap.timeline().to(refs.root.current, { opacity: 1 }),
    animateOut: () => gsap.timeline().to(refs.root.current, { opacity: 0 })
  })

  return (
    <main className={classNames('PageAbout', css.root)} ref={refs.root}>
      <h1 className={css.title} {...copy.html(content.body.title)} />
      <div className={css.description} {...copy.html(content.body.description, {}, 10)} />
    </main>
  )
}

View.displayName = 'PageAbout_View'
