import { memo, useEffect, useCallback, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { device } from '@jam3/detect';

import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import { GtmScript } from '@/utils/analytics';

import { setPrevRoute, setIsWebpSupported, useAppDispatch } from '@/redux';
import { checkWebpSupport } from '@/utils/basic-functions';
import useCookieBanner from '@/hooks/use-cookie-banner';

const AppAdmin = dynamic(() => import('@/components/AppAdmin/AppAdmin'), { ssr: false });
const RotateScreen = dynamic(() => import('@/components/RotateScreen/RotateScreen'), { ssr: false });

export type Props = PropsWithChildren<{}>;

function Layout({ children }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { validCookie, cookieConsent, updateCookies, acceptAllCookies, rejectAllCookies } = useCookieBanner();

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
      <GtmScript consent={cookieConsent?.statistics} />

      <Nav />

      {children}

      <Footer />

      {!device.desktop && <RotateScreen />}

      {!validCookie && (
        <CookieBanner
          cookieConsent={cookieConsent}
          onAccept={acceptAllCookies}
          onUpdate={updateCookies}
          onReject={rejectAllCookies}
        />
      )}

      {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' && <AppAdmin />}
    </>
  );
}

export default memo(Layout);
