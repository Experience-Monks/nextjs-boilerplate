import React, { useRef, useCallback, useEffect } from 'react';
import checkProps from '@jam3/react-check-extra-props';
import Link from 'next/link';
import { gsap } from 'gsap';

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
  const containerRef = useRef();
  const animateInInit = useCallback(() => {
    gsap.set(Array.from(containerRef.current.querySelectorAll('li')), { autoAlpha: 0 });
  }, []);

  const animateIn = useCallback(() => {
    gsap.to(Array.from(containerRef.current.querySelectorAll('li')), {
      duration: 0.5,
      autoAlpha: 1,
      stagger: 0.167,
      delay: 0.3
    });
  }, []);

  useEffect(() => {
    animateInInit();
  }, [animateInInit]);

  useEffect(() => {
    animateIn();
  }, [animateIn]);

  return (
    <nav className={styles.Nav}>
      <div className={styles.wrapper} ref={containerRef}>
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

Nav.propTypes = checkProps({});

export default Nav;
