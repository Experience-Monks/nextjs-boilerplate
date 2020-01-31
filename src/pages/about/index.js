import React from 'react';
import Head from 'next/head';

import styles from '../index.module.scss';

import Nav from '../../components/Nav/Nav';

function About() {
  return (
    <section className={'About'}>
      <Head>
        <title>About | Jam3 generator</title>
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>

      <Nav />

      <div className={styles.hero}>
        <h1 className={styles.title}>About!</h1>
      </div>
    </section>
  );
}

export default About;
