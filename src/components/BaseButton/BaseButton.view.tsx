import type { MouseEvent } from 'react'
import type { ControllerProps } from './BaseButton.controller'
import type { UrlObject } from 'node:url'

import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { AnalyticsService } from '@/services/analytics.service'

import { fixSlashes } from '@/utils/basic-functions'
import { isRoutedHref } from '@/utils/is-routed-href'
import { multiRef } from '@/utils/multi-ref'

import { useRefs } from '@/hooks/use-refs'

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLElement
}

// View (pure and testable component, receives props exclusively from the controller)
export const View = forwardRef<HTMLElement, ViewProps>(
  ({ className, href: h, link: l, subject, children, gtmEvent, disabled, onClick, ...props }, ref) => {
    const refs = useRefs<ViewRefs>()

    const href = h || l

    const [url, setUrl] = useState<string | UrlObject | undefined>(href)

    const pathname = useMemo(() => (typeof href === 'string' ? href : href?.pathname || ''), [href])
    const routed = useMemo(() => isRoutedHref(href, props.download), [href, props.download])

    let prefix = ''
    let suffix = ''

    if (href && !props.download) {
      if (/^(https:\/\/|http:\/\/)/u.test(pathname)) {
        props.target = '_blank'
        props.rel = 'noopener noreferrer'
      } else if (pathname.includes('@')) {
        props.target = '_blank'
        prefix = 'mailto:'
        if (subject) suffix = `?subject=${subject}`
      }
    }

    const handleClick = useCallback(
      (e: MouseEvent<HTMLElement>) => {
        onClick?.(e)
        if (gtmEvent) AnalyticsService.trackGtm(gtmEvent)
      },
      [gtmEvent, onClick]
    )

    useEffect(() => {
      if (href && routed) {
        setUrl(() => {
          if (typeof href === 'string') {
            if (href.startsWith('#')) return href
            return {
              pathname: fixSlashes(`/${href.split('#')[0].split('?')[0]}`),
              hash: href.split('#')[1] || '',
              query: (href.split('#')[0].split('?')[1] /* || window.location.search */ || '').replace('?', '')
            }
          }
          return {
            ...href,
            pathname: fixSlashes(`/${href.pathname}`)
          }
        })
      }
    }, [href, pathname, routed])

    return href ? (
      routed ? (
        <Link
          {...props}
          ref={multiRef(refs.root, ref)}
          href={url as UrlObject}
          scroll={false}
          className={className}
          onClick={handleClick}
        >
          {children}
        </Link>
      ) : (
        <a
          {...props}
          ref={multiRef(refs.root, ref)}
          href={`${prefix}${href}${suffix}`}
          className={className}
          onClick={handleClick}
        >
          {children}
        </a>
      )
    ) : (
      <button {...props} ref={multiRef(refs.root, ref)} disabled={disabled} className={className} onClick={handleClick}>
        {children}
      </button>
    )
  }
)

View.displayName = 'BaseButton-View'
