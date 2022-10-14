import { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import css from './Nav.module.scss';

import routes from '@/data/routes';

import Image from '@/components/Image/Image';

import SvgThreeLogo from '@/components/svgs/three-logo.svg';

const LINKS = [
  { href: 'https://jam3.com', label: 'Jam3', file: 'three-logo.jpeg' },
  { href: 'https://github.com/jam3', label: 'GitHub', file: 'github-icon-64b.png' }
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
          {LINKS.map(({ key, href, label, file }) => (
            <li key={key}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Image src={file} alt={label} />
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
