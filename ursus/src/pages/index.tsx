import { memo, useRef } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

import Head from './../components/Head/Head';
import Header from './../components/Header/Header';

type Props = {
  className: string;
};

function Home({ className }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <main className={classnames(styles.Home, className)} ref={containerRef}>
      <Head />
      <Header
        className={styles.header}
        setting={{
          name: 'Landing Page',
          description: 'Welcome to Ursus'
        }}
      />
      <div className={styles.content}>Landing content - TBD</div>
    </main>
  );
}

export default memo(Home);
