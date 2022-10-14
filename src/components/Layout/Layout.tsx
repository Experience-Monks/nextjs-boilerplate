import { FC, memo, PropsWithChildren, useCallback, useEffect } from 'react';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { device } from '@jam3/detect';

import { PageProps } from '@/data/types';

import Footer from '@/components/Footer/Footer';
import Head from '@/components/Head/Head';
import Nav from '@/components/Nav/Nav';

import { useCookieBanner } from '@/hooks';
import { GtmScript } from '@/utils/analytics';
import { checkWebpSupport } from '@/utils/basic-functions';

import { setIsWebpSupported, setPrevRoute, useAppDispatch } from '@/redux';

const RotateScreen = dynamic(() => import('@/components/RotateScreen/RotateScreen'), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/CookieBanner/CookieBanner'), { ssr: false });
const AppAdmin = dynamic(() => import('@/components/AppAdmin/AppAdmin'), { ssr: false });

export type Props = PropsWithChildren<{}>;

const Layout: FC<AppProps<PageProps>> = ({ Component, pageProps }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { validCookie, cookieConsent, updateCookies, acceptAllCookies, rejectAllCookies } = useCookieBanner();

  const handleRouteChange = useCallback(
    (url: string) => {
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

      <Head {...pageProps.head} />

      <Nav />

      <Component {...pageProps} />

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
};

export default memo(Layout);
