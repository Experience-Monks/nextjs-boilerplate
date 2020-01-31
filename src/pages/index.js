import React, { useRef, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';

import styles from './index.module.scss';

import Nav from '../components/Nav/Nav';

function Landing() {
  const containerRef = useRef();
  const animateInInit = useCallback(() => {
    gsap.set(containerRef.current, { autoAlpha: 0 });
  }, []);

  const animateIn = useCallback(() => {
    gsap.to(containerRef.current, { duration: 0.5, autoAlpha: 1, delay: 0.3 });
  }, []);

  useEffect(() => {
    animateInInit();
  }, [animateInInit]);

  useEffect(() => {
    animateIn();
  }, [animateIn]);

  return (
    <section className="Landing">
      <Head>
        <title>Home | Jam3 generator</title>
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>

      <Nav />

      <section className={styles.hero} ref={containerRef}>
        <h1 className={styles.title}>Welcome to Jam3!</h1>

        <p className={styles.description}>
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>

        <ul className={styles.row}>
          <li>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h3>Code standard</h3>
              <p>Learn more about Jam3 code standard.</p>
            </a>
          </li>
          <li>
            <a href="https://nextjs.org/learn" className={styles.card}>
              <h3>Jam3.dev</h3>
              <p>Learn more about Jam3.dev</p>
            </a>
          </li>
        </ul>
      </section>
    </section>
  );
}

export default Landing;
