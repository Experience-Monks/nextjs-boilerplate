import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import classnames from 'classnames';

import styles from './Layout.module.scss';

// import useLayout from '../../utils/hooks/use-layout';

function Layout({ children }) {
  // const layout = useLayout().layout;

  return <main className={classnames(styles.Layout)}>{children}</main>;
}

Layout.propTypes = checkProps({
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
});

export default Layout;
