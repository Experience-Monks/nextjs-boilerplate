import type { FC } from 'react'
import type { ControllerProps } from './Nav.controller'

import { useImperativeHandle } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './Nav.module.scss'

import { useRefs } from '@/hooks/use-refs'

import { BaseButton } from '@/components/BaseButton'
import { BaseImage } from '@/components/BaseImage'

import { Svgs } from '#/svg-imports'

export type ViewHandle = {
  animateIn: () => gsap.core.Timeline
}

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement
}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ className, content, handleRef }) => {
  const refs = useRefs<ViewRefs>()

  useImperativeHandle(handleRef, () => ({
    animateIn: () => gsap.timeline().to(refs.root.current, { duration: 0.33, opacity: 1 }, 0.33)
  }))

  return (
    <nav className={classNames('Nav', css.root, className)} ref={refs.root}>
      <div className={css.wrapper}>
        <ul className={css.routes}>
          <a tabIndex={0} aria-label="Skip to content" className={css.skipToContent} href="#start-of-content">
            Skip to content
          </a>
          {content.routes.map(({ path, title }) => (
            <li key={title}>
              <BaseButton href={path} aria-label="Home">
                {path === '/' ? <Svgs.ExperienceLogo className={css.mainLogo} /> : title}
              </BaseButton>
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

View.displayName = 'Nav_View'
