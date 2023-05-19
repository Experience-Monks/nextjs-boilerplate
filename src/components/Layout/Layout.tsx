import { FC, memo, useCallback, useEffect } from 'react'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { PageProps } from '@/data/types'

import { GtmScript } from '@/utils/analytics'
import { checkWebpSupport } from '@/utils/basic-functions'
import { device } from '@/utils/detect'

import useCookieBanner from '@/hooks/use-cookie-banner'

import Footer from '@/components/Footer/Footer'
import Head from '@/components/Head/Head'
import Nav from '@/components/Nav/Nav'

import { setIsWebpSupported, setPrevRoute, useAppDispatch } from '@/redux'

const RotateScreen = dynamic(() => import('@/components/RotateScreen/RotateScreen'), { ssr: false })
const CookieBanner = dynamic(() => import('@/components/CookieBanner/CookieBanner'), { ssr: false })
const AppAdmin = dynamic(() => import('@/components/AppAdmin/AppAdmin'), { ssr: false })

const Layout: FC<AppProps<PageProps>> = ({ Component, pageProps }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { validCookie, cookieConsent, updateCookies, acceptAllCookies, rejectAllCookies } = useCookieBanner()

  const handleRouteChange = useCallback(
    (url: string) => {
      if (router.asPath !== url) {
        dispatch(setPrevRoute(router.asPath))
      }
    },
    [dispatch, router.asPath]
  )

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events, handleRouteChange])

  useEffect(() => {
    checkWebpSupport('lossy', (isSupported) => dispatch(setIsWebpSupported(isSupported)))
  }, [dispatch])

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

      <AppAdmin />
    </>
  )
}

export default memo(Layout)
