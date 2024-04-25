import type { FC } from 'react'
import type { ControllerProps } from './PageNotFound.controller'

import { useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './PageNotFound.module.scss'

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

  useTransitionPresence(
    useMemo(
      () => ({
        animateIn: () => gsap.timeline().to(refs.root.current, { opacity: 1 }),
        animateOut: () => gsap.timeline().to(refs.root.current, { opacity: 0 })
      }),
      [refs]
    )
  )

  return (
    <main className={classNames('PageNotFound', css.root)} ref={refs.root}>
      <h1 className={css.title} {...copy.html(content.body.title)} />
    </main>
  )
}

View.displayName = 'PageNotFound_View'
