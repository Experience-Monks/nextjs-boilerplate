import React, { memo } from 'react';
import classnames from 'classnames';
import Link from 'next/link';

import styles from './Nav.module.scss';

import jam3LogoSrc from '../../assets/images/threeLogo.jpg';
import githubLogoSrc from '../../assets/images/github-icon-64b.png';

type NavLink = { href: string, label: string, src: string };

type Props = {
  links?: Array<NavLink>,
  className?: string
};

function Nav({ links, className }: Props) {
  return (
    <nav className={classnames(styles.Nav, className)}>
      <div className={styles.wrapper}>
        <ul className={styles.routes}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>

          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>

        <ul className={styles.links}>
          {links &&
            links.map(({ href, label, src }) => (
              <li key={`nav-link-${href}-${label}`}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <img src={src} alt={label} />
                </a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}

Nav.defaultProps = ({
  links: [
    { href: 'https://jam3.com', label: 'Jam3', src: jam3LogoSrc },
    { href: 'https://github.com/jam3', label: 'GitHub', src: githubLogoSrc }
  ]
}: Props);

export default (memo(Nav): React$AbstractComponent<Props, any>);
