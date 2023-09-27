import { FC, memo } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import css from './Footer.module.scss'

import { Content } from '@/data/types'

export interface FooterProps {
  // List here all props that are public and settable by the parent component.
  className?: string
  content: Content['common']['footer']
}

export interface ViewProps extends FooterProps {
  // List here the private props that are only settable by the controller component.
}

// View (pure and testable component, receives props from the controller)
export const View: FC<ViewProps> = ({ className, content }) => {
  return (
    <footer className={classNames('Footer', css.root, className)}>
      <ul>
        {content.routes.map(({ path, title }) => (
          <li key={title}>
            <Link href={path} scroll={false}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}

View.displayName = 'Footer-View'

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const Footer: FC<FooterProps> = (props) => {
  return <View {...props} />
}

export default memo(Footer)
