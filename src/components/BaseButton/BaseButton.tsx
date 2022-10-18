import {
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  memo,
  MouseEvent,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { UrlObject } from 'url';

import isRoutedHref from '@/utils/is-routed-href';
export interface BaseButtonProps {
  children: ReactNode;
  playSound?: boolean;
  className?: string;
  download?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  subject?: string;
  target?: string;
  title?: string;
  href?: string | UrlObject;
  role?: string;
  rel?: string;
  id?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
  onFocus?: (event?: FocusEvent<HTMLElement>) => void;
  onKeyDown?: (event?: KeyboardEvent<HTMLElement>) => void;
  onMouseEnter?: (event?: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event?: MouseEvent<HTMLElement>) => void;
  'aria-label'?: string;
}

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const BaseButton = forwardRef<HTMLElement, BaseButtonProps>(
  // eslint-disable-next-line sonarjs/cognitive-complexity
  ({ className, href, subject, children, disabled, playSound, onClick, ...props }, ref) => {
    const [url, setUrl] = useState<string | UrlObject | undefined>(href);

    const pathname = useMemo(() => (typeof href === 'string' ? href : href?.pathname || ''), [href]);
    const routed = useMemo(() => isRoutedHref(href, props.download), [href, props.download]);

    let prefix = '';
    let suffix = '';

    if (href && !props.download) {
      if (/^(https:\/\/|http:\/\/)/.test(pathname)) {
        props.target = '_blank';
        props.rel = 'noopener noreferrer';
      } else if (pathname.includes('@')) {
        props.target = '_blank';
        prefix = 'mailto:';
        if (subject) suffix = `?subject=${subject}`;
      }
    }

    const handleClick = useCallback(
      (e: MouseEvent<HTMLElement>) => {
        onClick?.(e);
        // Add analytics, soundfx, etc... here
      },
      [onClick]
    );

    useEffect(() => {
      if (href && routed) {
        setUrl(() => {
          if (typeof href === 'string') {
            if (href.startsWith('#')) return href;
            return {
              pathname: `${href.split('#')[0].split('?')[0]}`,
              hash: href.split('#')[1] || '',
              query: (href.split('#')[0].split('?')[1] || '').replace('?', '')
            };
          }
          return {
            ...href,
            pathname: `${href.pathname}`
          };
        });
      }
    }, [href, pathname, routed]);

    return href ? (
      routed ? (
        <Link href={url as UrlObject} scroll={false}>
          <a
            ref={ref as Ref<HTMLAnchorElement>}
            className={classNames('BaseButton', className)}
            onClick={handleClick}
            {...props}
          >
            {children}
          </a>
        </Link>
      ) : (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={className}
          href={`${prefix}${href}${suffix}`}
          {...props}
          onClick={handleClick}
        >
          {children}
        </a>
      )
    ) : (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={className}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BaseButton.displayName = 'BaseButton';

export default memo(BaseButton);
