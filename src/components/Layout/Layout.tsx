import { FC, memo, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { nanoid } from '@reduxjs/toolkit'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './Layout.module.scss'

import { PageHandle, PageProps } from '@/data/types'

import { GtmScript } from '@/utils/analytics'

import useCookieBanner from '@/hooks/use-cookie-banner'

import Footer from '@/components/Footer/Footer'
import Head from '@/components/Head/Head'
import Nav, { NavHandle } from '@/components/Nav/Nav'

import { setPrevRoute, useAppDispatch } from '@/redux'

const ScreenRotate = dynamic(() => import('@/components/ScreenRotate/ScreenRotate'), { ssr: false })
const CookieBanner = dynamic(() => import('@/components/CookieBanner/CookieBanner'), { ssr: false })
const AppAdmin = dynamic(() => import('@/components/AppAdmin/AppAdmin'), { ssr: false })

const Layout: FC<AppProps<PageProps>> = ({ Component, pageProps }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState<ReactNode>(<Component {...pageProps} />)

  const pageHandleRef = useRef<PageHandle | null>(null)
  const navHandleRef = useRef<NavHandle | null>(null)

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

  // handle page transitions
  useEffect(() => {
    const transitionTimeline = gsap.timeline()

    // if the current page has an animateOut(), do it
    if (pageHandleRef.current?.animateOut) transitionTimeline.add(pageHandleRef.current.animateOut())

    // after the out animation, set the new page
    transitionTimeline.add(() => {
      gsap.set(window, { scrollTo: { x: 0, y: 0, autoKill: false } })
      setCurrentPage(
        <Component
          key={nanoid()}
          {...pageProps}
          onReady={(pageHandle?: RefObject<PageHandle>) => {
            pageHandleRef.current = pageHandle?.current || null
            pageHandleRef.current?.animateIn?.()
            navHandleRef.current?.animateIn?.()
          }}
        />
      )
    })

    return () => {
      transitionTimeline.kill()
    }
  }, [Component, pageProps])

  return (
    <div className={classNames('Layout', css.root)}>
      <GtmScript consent={cookieConsent?.statistics} />

      <Head {...pageProps.head} />

      <Nav content={pageProps.common.nav} handleRef={navHandleRef} />

      <div className={css.content}>{currentPage}</div>

      <Footer content={pageProps.common.footer} />

      {!validCookie && (
        <CookieBanner
          cookieConsent={cookieConsent}
          onAccept={acceptAllCookies}
          onUpdate={updateCookies}
          onReject={rejectAllCookies}
        />
      )}

      <ScreenRotate content={pageProps.common.screenRotate} />

      <AppAdmin />
    </div>
  )
}

export default memo(Layout)
