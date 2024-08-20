import type { FC } from 'react'
import type { ControllerProps } from './PageHome.controller'

import { useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './PageHome.module.scss'

import { copy } from '@/utils/copy'

import { useRefs } from '@/hooks/use-refs'
import { useTransitionPresence } from '@/hooks/use-transition-presence'

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLImageElement
  list: HTMLUListElement
  title: HTMLHeadingElement
  description: HTMLHeadingElement
}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ content }) => {
  const refs = useRefs<ViewRefs>()

  useEffect(() => {
    gsap
      .timeline()
      .set(refs.root.current, { opacity: 0 })
      .set(refs.title.current, { opacity: 0 })
      .set(refs.description.current, { opacity: 0 })
      .set(refs.list.current!.childNodes, { opacity: 0 })
  }, [refs])

  useTransitionPresence(
    useMemo(
      () => ({
        animateIn: () => {
          return gsap
            .timeline()
            .to(refs.root.current, { opacity: 1 }, 0)
            .fadeIn(refs.title.current, {}, 0)
            .fadeIn(refs.description.current, {}, 0.2)
            .fadeIn(refs.list.current!.childNodes, { stagger: 0.1 }, 0.4)
        },
        animateOut: () => gsap.timeline().to(refs.root.current, { opacity: 0 })
      }),
      [refs]
    )
  )

  return (
    <main className={classNames('PageHome', css.root)} ref={refs.root}>
      <section className={css.hero}>
        <h1 className={css.title} {...copy.html(content.body.title)} ref={refs.title} />
        <h2 className={css.description} {...copy.html(content.body.description)} ref={refs.description} />
        <ul className={css.row} ref={refs.list}>
          {content.body.cards.map(({ title, description, href }) => (
            <li key={title}>
              <a href={href} className={css.card} target="_blank" rel="noopener noreferrer">
                <h3 {...copy.html(title)} />
                <p {...copy.html(description)} />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

View.displayName = 'PageHome_View'
