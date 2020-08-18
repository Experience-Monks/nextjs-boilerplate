import React from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import RotateScreen from '../RotateScreen/RotateScreen';

function Layout({ children }) {
  return (
    <>
      <Nav />

      {children}

      <Footer />

      <RotateScreen />
    </>
  );
}

Layout.propTypes = checkProps({
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
});

Layout.defaultProps = {};

export default Layout;
