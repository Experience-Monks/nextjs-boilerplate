import { memo } from 'react';
import classnames from 'classnames';

import styles from './index.module.scss';

import Head from '../../components/Head/Head';

function {{name}}() {
  return (
    <main className={classnames(styles.{{name}}, className)}>
      <Head title="{{name}}" />

      <h1>{{name}} Page</h1>
    </main>
  );
}

{{name}}.defaultProps = {};

export default memo({{name}});
