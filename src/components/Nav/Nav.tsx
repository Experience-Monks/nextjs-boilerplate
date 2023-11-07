import { FC, ForwardedRef, memo, useImperativeHandle, useRef } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './Nav.module.scss'

import { Content } from '@/data/types'

import BaseImage from '@/components/BaseImage/BaseImage'

import SvgExperienceLogo from '@/svgs/ExperienceLogo.svg'

export type NavHandle = {
  animateIn: () => gsap.core.TimelineChild
}

export interface NavProps {
  // List here all props that are public and settable by the parent component.
  className?: string
  handleRef?: ForwardedRef<NavHandle>
  content: Content['common']['nav']
}

export interface ViewProps extends NavProps {
  // List here the private props that are only settable by the controller component.
}

// View (pure and testable component, receives props from the controller)
export const View: FC<ViewProps> = ({ className, content, handleRef }) => {
  const rootRef = useRef<HTMLElement>(null)

  useImperativeHandle(handleRef, () => ({
    animateIn: () => gsap.timeline().to(rootRef.current, { duration: 0.33, opacity: 1 }, 0.33)
  }))

  return (
    <nav className={classNames('Nav', css.root, className)} ref={rootRef}>
      <div className={css.wrapper}>
        <ul className={css.routes}>
          <a tabIndex={0} aria-label="Skip to content" className={css.skipToContent} href="#start-of-content">
            Skip to content
          </a>
          {content.routes.map(({ path, title }) => (
            <li key={title}>
              <Link href={path} aria-label="Home" scroll={false}>
                {path === '/' ? <SvgExperienceLogo className={css.mainLogo} /> : title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={css.links}>
          {content.links.map(({ href, label, image }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <BaseImage src={image} alt={label} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <section aria-hidden="true" id="start-of-content"></section>
    </nav>
  )
}

View.displayName = 'Nav-View'

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const Nav: FC<NavProps> = (props) => {
  return <View {...props} />
}

export default memo(Nav)
