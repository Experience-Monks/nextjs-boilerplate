import React, { memo, useCallback, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import { gsap } from 'gsap';
import { useSelector } from 'react-redux';

import styles from './index.module.scss';

import Head from '../../components/Head/Head';

function About({ className }) {
  const containerRef = useRef();
  const appLoaded = useSelector((state) => state.loaded);

  const animateIn = useCallback(() => {
    gsap.from(containerRef.current, { opacity: 0.01, duration: 0.3, ease: 'none' });
  }, []);

  useLayoutEffect(() => {
    animateIn();
  }, [animateIn]);

  return (
    <main className={classnames(styles.About, className)} ref={containerRef}>
      <Head title="About" />
      <h1 className={styles.title}>About Page</h1>
      <p>{appLoaded ? 'Landing loaded' : 'Landing is not loaded'}</p>
    </main>
  );
}

About.propTypes = checkProps({
  className: PropTypes.string
});

About.defaultProps = {};

export default memo(About);
