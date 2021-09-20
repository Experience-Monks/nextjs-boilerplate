import { memo } from 'react';

import styles from './index.module.scss';

import Head from '../../components/Head/Head';

function {{name}}() {
  return (
    <main className={styles.{{name}}}>
      <Head title="{{name}}" />

      <h1>{{name}} Page</h1>
    </main>
  );
}

export default memo({{name}});
