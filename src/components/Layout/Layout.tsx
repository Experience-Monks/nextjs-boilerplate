import { memo, useEffect, useCallback, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import { setPrevRoute, setIsWebpSupported, useAppDispatch } from '../../redux';
import { checkWebpSupport } from '../../utils/detect';

const RotateScreen = dynamic(() => import('../RotateScreen/RotateScreen'), { ssr: false });

export type Props = PropsWithChildren<{}>;

function Layout({ children }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRouteChange = useCallback(
    (url) => {
      if (router.asPath !== url) dispatch(setPrevRoute(router.asPath));
    },
    [dispatch, router.asPath]
  );

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, handleRouteChange]);

  useEffect(() => {
    checkWebpSupport('lossy', (isSupported) => dispatch(setIsWebpSupported(isSupported)));
  }, [dispatch]);

  return (
    <>
      <Nav />
      {children}
      <Footer />
      <RotateScreen />
    </>
  );
}

Layout.defaultProps = {};

export default memo(Layout);
