import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import styles from '../index.module.scss';

import Nav from '../../components/Nav/Nav';

import { withRedux } from '../../redux/withRedux';
import { State } from '../../redux';

function About() {
  const appLoaded = useSelector((state: State) => state.app.loaded);

  return (
    <section className="About">
      <Head>
        <title>About | Jam3 generator</title>
      </Head>

      <Nav />

      <div className={styles.hero}>
        <h1 className={styles.title}>About!</h1>
        <p>{appLoaded ? 'landing loaded' : 'landing is not loaded'}</p>
      </div>
    </section>
  );
}

export default withRedux(About);
