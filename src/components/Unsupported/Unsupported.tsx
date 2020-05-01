import React, { memo } from 'react';
import classnames from 'classnames';

import styles from './Unsupported.module.scss';

function Unsupported() {
  return (
    <section className={classnames(styles.Unsupported)}>
      <h1>UNSUPPORTED PAGE</h1>
    </section>
  );
}

export default memo(Unsupported);
