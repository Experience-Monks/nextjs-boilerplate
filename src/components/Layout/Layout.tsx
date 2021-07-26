import { memo, useEffect, useCallback, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import NextHead from 'next/head';
import { useRouter } from 'next/router';

import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import CookieBanner from '@/components/CookieBanner/CookieBanner';

import { setPrevRoute, setIsWebpSupported, useAppDispatch } from '@/redux';
import { checkWebpSupport } from '@/utils/basic-functions';
import { GtmScript } from '@/utils/analytics';
import useCookieBanner from '@/utils/hooks/use-cookie-banner';

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
      <NextHead>{cookieConsent?.statistics && GtmScript()}</NextHead>

      <Nav />
      {children}
      <Footer />
      <RotateScreen />
      {!validCookie && (
        <CookieBanner
          cookieConsent={cookieConsent}
          onAccept={acceptAllCookies}
          onUpdate={updateCookies}
          onReject={rejectAllCookies}
        />
      )}
    </>
  );
}

export default memo(Layout);
