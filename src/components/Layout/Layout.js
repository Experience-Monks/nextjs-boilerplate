import React, { memo } from 'react';
import classnames from 'classnames';

import styles from './Layout.module.scss';

// import useLayout from '../../utils/hooks/use-layout';

type Props = {
  children?: React$Node,
  className?: string
};

function Layout({ children, className }: Props) {
  // const { layout } = useLayout();
  return <main className={classnames(styles.Layout, className)}>{children}</main>;
}

export default (memo(Layout): React$AbstractComponent<Props, any>);
