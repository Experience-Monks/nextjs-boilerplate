import { FC, memo, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { nanoid } from '@reduxjs/toolkit'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './Layout.module.scss'

import config from '@/data/config.json'
import { PageHandle, PageProps } from '@/data/types'

import AnalyticsService from '@/services/analytics'

import { getScrollTop } from '@/utils/basic-functions'

import useCookieBanner from '@/hooks/use-cookie-banner'

import ScreenNoScript from '@/components/ScreenNoScript/ScreenNoScript'

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

  const [currentPage, setCurrentPage] = useState<ReactNode>(<Component key="first-page" {...pageProps} />)

  const rootRef = useRef<HTMLDivElement>(null)
  const navHandleRef = useRef<NavHandle | null>(null)
  const pageHandleRef = useRef<PageHandle | null>(null)
  const isFirstPageRef = useRef(true)
  const isGoingBackRef = useRef(false)
  const scrollHistoryRef = useRef<{ pathname: string; value: number }[]>([])
  const currentPathnameRef = useRef(router.asPath.split('#')[0].split('?')[0])
  const scrollRestorationTimeoutRef = useRef<NodeJS.Timeout>()

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

  // make sure the page us un-hidden once application kicks in
  useEffect(() => {
    gsap.set(document.documentElement, { autoAlpha: 1 })
    gsap.set(rootRef.current, { autoAlpha: 1 })
  }, [])

  // handle scroll history
  useEffect(() => {
    history.scrollRestoration = 'manual'
    currentPathnameRef.current = router.asPath.split('#')[0].split('?')[0]
    const onBeforeHistoryChange = () => {
      if (!isGoingBackRef.current) {
        scrollHistoryRef.current.push({ pathname: currentPathnameRef.current, value: getScrollTop() })
      }
    }
    router.beforePopState(() => {
      isGoingBackRef.current = true
      return true
    })
    router.events.on('beforeHistoryChange', onBeforeHistoryChange)
    return () => {
      router.events.off('beforeHistoryChange', onBeforeHistoryChange)
    }
  }, [router])

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
          key={isFirstPageRef.current ? 'first-page' : nanoid()}
          {...pageProps}
          onReady={(pageHandle?: RefObject<PageHandle>) => {
            pageHandleRef.current = pageHandle?.current || null
            // restore scroll
            if (isGoingBackRef.current) {
              const lastScrollHistory = scrollHistoryRef.current.pop()
              if (lastScrollHistory && lastScrollHistory.pathname === currentPathnameRef.current) {
                gsap.set(window, { scrollTo: { x: 0, y: lastScrollHistory.value, autoKill: false } })
              }
            }
            clearTimeout(scrollRestorationTimeoutRef.current)
            scrollRestorationTimeoutRef.current = setTimeout(() => {
              isGoingBackRef.current = false
            }, 400)
            // animate in
            pageHandleRef.current?.animateIn?.()
            navHandleRef.current?.animateIn?.()
          }}
        />
      )
      isFirstPageRef.current = false
    })

    return () => {
      transitionTimeline.kill()
    }
  }, [Component, pageProps])

  // start analytics
  useEffect(() => {
    if (cookieConsent?.statistics) AnalyticsService.start()
  }, [cookieConsent])

  return (
    <>
      <Head {...pageProps.head} />

      <div className={classNames('Layout', css.root)} ref={rootRef}>
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
      </div>

      <AppAdmin />

      <ScreenRotate content={pageProps.common.screenRotate} />
      {!config.supportsNoJs && <ScreenNoScript content={pageProps.common.screenNoScript} />}
    </>
  )
}

export default memo(Layout)
