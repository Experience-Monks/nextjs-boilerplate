import { memo, useRef } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

import Head from '@/components/Head/Head';

type Props = {
  className: string;
};

function NotFound({ className }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <main className={classnames(styles.NotFound, className)} ref={containerRef}>
      <Head title="NotFound" />
      <h1 className={styles.title}>NotFound Page</h1>
    </main>
  );
}

export default memo(NotFound);
