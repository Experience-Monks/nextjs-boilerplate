import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const RotateScreen = dynamic(() => import('../RotateScreen/RotateScreen'), { ssr: false });

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

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

Layout.defaultProps = {};

export default Layout;
