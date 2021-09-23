import { memo, useRef } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

import Head from '@/components/Head/Head';

type Props = {
  className: string;
};

function About({ className }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <main className={classnames(styles.About, className)} ref={containerRef}>
      <Head title="About" />
      <h1 className={styles.title}>About Page</h1>
    </main>
  );
}

export default memo(About);
