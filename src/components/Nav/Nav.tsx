import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';

import styles from './Nav.module.scss';

import jam3LogoSrc from '../../assets/images/threeLogo.jpeg';
import githubLogoSrc from '../../assets/images/github-icon-64b.png';

const LINKS = [
  { href: 'https://jam3.com', label: 'Jam3', src: jam3LogoSrc },
  { href: 'https://github.com/jam3', label: 'GitHub', src: githubLogoSrc }
].map(link => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`
}));

function Nav() {
  return (
    <nav className={classnames(styles.Nav)}>
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
          {LINKS.map(({ key, href, label, src }) => (
            <li key={key}>
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

Nav.defaultProps = {};

export default Nav;
