import React, { memo } from 'react';
import classnames from 'classnames';

import styles from './Unsupported.module.scss';

type Props = {
  className?: string
};

function Unsupported({ className }: Props) {
  return (
    <section className={classnames(styles.Unsupported, className)}>
      <h1>UNSUPPORTED PAGE</h1>
    </section>
  );
}

export default (memo(Unsupported): React$AbstractComponent<any, any>);
