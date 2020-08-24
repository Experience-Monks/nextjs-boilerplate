import React from 'react';
import { useSelector } from 'react-redux';

import styles from '../index.module.scss';

import Head from '../../components/Head/Head';
import Nav from '../../components/Nav/Nav';

import { withRedux } from '../../redux/withRedux';

function About() {
  const appLoaded = useSelector(state => state.app.loaded);

  return (
    <section className="About">
      <Head title="About" />

      <Nav />

      <div className={styles.hero}>
        <h1 className={styles.title}>About!</h1>
        <p>{appLoaded ? 'landing loaded' : 'landing is not loaded'}</p>
      </div>
    </section>
  );
}

export default withRedux(About);
