import { memo } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

import Head from '@/components/Head/Head';

function Unsupported() {
  return (
    <main className={classnames(styles.Unsupported)}>
      <Head title="Not Supported" />

      <h1 className={styles.title}>Your browser is not supported.</h1>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      isUnsupported: true
    }
  };
}

export default memo(Unsupported);
