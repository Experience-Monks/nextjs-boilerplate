import { FC, memo, useEffect, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './PageHome.module.scss'

import { Content, PageHandle, PageProps } from '@/data/types'

import copy from '@/utils/copy'

import useAppAdmin from '@/hooks/use-app-admin'

export interface PageHomeProps extends PageProps {
  // List here all props that are public and settable by the Layout component.
  content: Content['pageHome']
}
export interface ViewProps extends PageHomeProps {
  // List here the private props that are only settable by the controller component.
}

// View (pure and testable component, receives props from the controller)
export const View: FC<ViewProps> = ({ content, onReady }) => {
  const rootRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLHeadingElement>(null)

  const handleRef = useRef<PageHandle>(null)

  const { options } = useAppAdmin()

  useEffect(() => {
    gsap.set(rootRef.current, { opacity: 0 })
    onReady?.(handleRef)
  }, [onReady])

  useImperativeHandle(handleRef, () => ({
    animateIn: () => {
      if (options.animateInHome) {
        return gsap
          .timeline()
          .to(rootRef.current, { opacity: 1 }, 0)
          .fadeIn(titleRef.current, 0)
          .fadeIn(descriptionRef.current, 0.2)
          .fadeIn(listRef.current?.childNodes, { stagger: 0.1 }, 0.4)
      } else {
        return gsap.set(rootRef.current, { opacity: 1 })
      }
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

View.displayName = 'PageHome-View'

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const PageHome: FC<PageHomeProps> = (props) => {
  return <View {...props} />
}

PageHome.displayName = 'PageHome'

export default memo(PageHome)
