import type { FC } from 'react'
import type { PageHandle } from '@/data/types'
import type { ControllerProps } from './PageHome.controller'

import { useEffect, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './PageHome.module.scss'

import copy from '@/utils/copy'

export interface ViewProps extends ControllerProps {}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ content, onReady }) => {
  const rootRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLHeadingElement>(null)

  const handleRef = useRef<PageHandle>(null)

  useEffect(() => {
    gsap.set(rootRef.current, { opacity: 0 })
    onReady?.(handleRef)
  }, [onReady])

  useImperativeHandle(handleRef, () => ({
    animateIn: () => {
      return gsap
        .timeline()
        .to(rootRef.current, { opacity: 1 }, 0)
        .fadeIn(titleRef.current, {}, 0)
        .fadeIn(descriptionRef.current, {}, 0.2)
        .fadeIn(listRef.current!.childNodes, { stagger: 0.1 }, 0.4)
    },
    animateOut: () => gsap.timeline().to(rootRef.current, { opacity: 0 })
  }))

  return (
    <main className={classNames('PageHome', css.root)} ref={rootRef}>
      <section className={css.hero}>
        <h1 className={css.title} {...copy.html(content.body.title)} ref={titleRef} />
        <h2 className={css.description} {...copy.html(content.body.description)} ref={descriptionRef} />
        <ul className={css.row} ref={listRef}>
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