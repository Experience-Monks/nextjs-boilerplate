import React, { ReactNode } from 'react';
import classnames from 'classnames';

import styles from './Layout.module.scss';

// import useLayout from '../../utils/hooks/use-layout';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  // const layout = useLayout().layout;

  return <main className={classnames(styles.Layout)}>{children}</main>;
}

Layout.defaultProps = {};

export default Layout;
