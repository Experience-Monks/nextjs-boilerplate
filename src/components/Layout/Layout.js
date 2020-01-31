import React from 'react';
import classnames from 'classnames';
import styles from './Layout.module.scss';

import useLayout from '../../utils/hooks/use-layout';

export default function Layout({ children }) {
  const layout = useLayout().layout;

  return <main className={classnames(styles.Layout)}>{children}</main>;
}
