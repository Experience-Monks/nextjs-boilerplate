import { memo, PropsWithChildren, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { device } from '@jam3/detect';

import CookieBanner from '@/components/CookieBanner/CookieBanner';
import Footer from '@/components/Footer/Footer';
import Nav from '@/components/Nav/Nav';

import { GtmScript } from '@/utils/analytics';
import { checkWebpSupport } from '@/utils/basic-functions';
import useCookieBanner from '@/hooks/use-cookie-banner';

import { setIsWebpSupported, setPrevRoute, useAppDispatch } from '@/redux';

const RotateScreen = dynamic(() => import('@/components/RotateScreen/RotateScreen'), { ssr: false });
const AppAdmin = dynamic(() => import(/* webpackChunkName: 'app-admin' */ '@/components/AppAdmin/AppAdmin'), {
  ssr: false
});
const FeaturePolicy = dynamic(
  () => import(/* webpackChunkName: 'feature-policy' */ '@/components/Head/FeaturePolicy'),
  {
    ssr: false
  }
);
const ContentSecurityPolicy = dynamic(
  () => import(/* webpackChunkName: 'content-security-policy' */ '@/components/Head/ContentSecurityPolicy'),
  { ssr: false }
);

export type Props = PropsWithChildren<{}>;

function Layout({ children }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { validCookie, cookieConsent, updateCookies, acceptAllCookies, rejectAllCookies } = useCookieBanner();

  const handleRouteChange = useCallback(
    (url) => {
      if (router.asPath !== url) {
        dispatch(setPrevRoute(router.asPath));
      }
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

      {process.env.NODE_ENV === 'development' && (
        <>
          <FeaturePolicy />
          <ContentSecurityPolicy />
        </>
      )}
    </>
  );
}

export default memo(Layout);
