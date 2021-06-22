import React, { useRef, useCallback, useLayoutEffect, memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import { gsap } from 'gsap';

import styles from './index.module.scss';

import Head from '../components/Head/Head';
import { isBrowser } from '../utils/detect';

function Landing({ className }) {
  const containerRef = useRef();

  const animateIn = useCallback(() => {
    gsap.from(containerRef.current, { opacity: 0.01, duration: 0.3, ease: 'none' });
  }, []);

  useLayoutEffect(() => {
    animateIn();
  }, [animateIn]);

  return (
    <main className={classnames(styles.Landing, className)} ref={containerRef}>
      <Head />
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to Jam3!</h1>
        {isBrowser && <code>{navigator?.userAgent}</code>}
        <h2 className={styles.description}>
          To get started, edit <code>pages/index.js</code> and save to reload.
        </h2>
        <ul className={styles.row}>
          <li>
            <a
              href="https://github.com/Jam3?q=&type=source"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Visit out GitHub</h3>
              <p>See our contributions to Open Source community</p>
            </a>
          </li>
          <li>
            <a href="https://jam3.dev" className={styles.card} target="_blank" rel="noopener noreferrer">
              <h3>Jam3.dev</h3>
              <p>Learn more about Jam3.dev</p>
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}

Landing.propTypes = checkProps({
  className: PropTypes.string
});

Landing.defaultProps = {};

export default memo(Landing);
