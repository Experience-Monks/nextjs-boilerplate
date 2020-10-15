import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import { setPrevRoute } from '../../redux/modules/app';

const RotateScreen = dynamic(() => import('../RotateScreen/RotateScreen'), { ssr: false });

function Layout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [lastRoute, setLastRoute] = useState(router.asPath?.split('?')[0]);

  useEffect(() => {
    const currRoute = router.asPath?.split('?')[0];
    if (currRoute !== lastRoute) {
      dispatch(setPrevRoute(lastRoute));
      setLastRoute(currRoute);
    }
  }, [dispatch, lastRoute, router]);

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

export default memo(Layout);
