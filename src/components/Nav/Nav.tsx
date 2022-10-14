import { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import css from './Nav.module.scss';

import routes from '@/data/routes';

import BaseImage from '@/components/BaseImage/BaseImage';

import SvgThreeLogo from '@/components/svgs/three-logo.svg';

const LINKS = [
  { href: 'https://jam3.com', label: 'Jam3', data: require('@/assets/images/three-logo.jpeg').default },
  { href: 'https://github.com/jam3', label: 'GitHub', data: require('@/assets/images/github-icon-64b.png').default }
].map((link) => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`
}));

export interface NavProps {
  className?: string;
}

const Nav: FC<NavProps> = ({ className }) => {
  return (
    <nav className={classNames('Nav', css.root, className)}>
      <div className={css.wrapper}>
        <ul className={css.routes}>
          <a tabIndex={0} aria-label="Skip to content" className={css.skipToContent} href="#start-of-content">
            Skip to content
          </a>
          {Object.values(routes).map(({ path, title }) => (
            <li key={path}>
              <Link href={path}>
                <a aria-label="Home">{path === '/' ? <SvgThreeLogo className={css.threeLogo} /> : title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className={css.links}>
          {LINKS.map(({ key, href, label, data }) => (
            <li key={key}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <BaseImage data={data} alt={label} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <section aria-hidden="true" id="start-of-content"></section>
    </nav>
  );
};

export default Nav;
