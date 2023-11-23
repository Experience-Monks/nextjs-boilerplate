import type { FC } from 'react'
import type { ControllerProps } from './Footer.controller'

import classNames from 'classnames'

import css from './Footer.module.scss'

import { useRefs } from '@/hooks/use-refs'

import { BaseButton } from '@/components/BaseButton'

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement
}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ className, content }) => {
  const refs = useRefs<ViewRefs>()

  return (
    <footer className={classNames('Footer', css.root, className)} ref={refs.root}>
      <ul>
        {content.routes.map(({ path, title }) => (
          <li key={title}>
            <BaseButton href={path}>{title}</BaseButton>
          </li>
        ))}
      </ul>
    </footer>
  )
}

View.displayName = 'Footer_View'
