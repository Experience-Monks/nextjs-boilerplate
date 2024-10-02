import type { FC } from 'react'
import type { AppProps } from 'next/app'
import type { NavHandle } from '@/components/Nav'
import type { PageProps } from '@/data/types'

import { memo, useCallback, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { gsap } from 'gsap'

import css from './Layout.module.scss'

import { storeState } from '@/store/store'

import { getScrollTop } from '@/utils/basic-functions'
import { fontVariables } from '@/utils/fonts'

import { useRefs } from '@/hooks/use-refs'

import { TransitionPresence } from '@/motion/transition/transition.presence'

import { Footer } from '@/components/Footer'
import { Head } from '@/components/Head'
import { Nav } from '@/components/Nav'
import { ScreenIntro } from '@/components/ScreenIntro'
import { ScreenNoScript } from '@/components/ScreenNoScript'

const ScreenRotate = dynamic(() => import('@/components/ScreenRotate').then((m) => m.ScreenRotate), { ssr: false })
const CookieBanner = dynamic(() => import('@/components/CookieBanner').then((m) => m.CookieBanner), { ssr: false })
const AppAdmin = dynamic(() => import('@/components/AppAdmin').then((m) => m.AppAdmin), { ssr: false })

export type LayoutRefs = {
  pathname: string
  navHandle: NavHandle | null
  isFirstPage: boolean
  scrollRestorationTimeout: NodeJS.Timeout
}

export const Layout: FC<AppProps<PageProps>> = memo(({ Component, pageProps }) => {
  const refs = useRefs<LayoutRefs>({
    pathname: useRef('/'),
    isFirstPage: useRef(true)
  })

  const router = useRouter()

  const handlePageMounted = useCallback(() => {
    storeState().navigation.setPathname(refs.pathname.current || '/')
    // restore scroll
    clearTimeout(refs.scrollRestorationTimeout.current!)
    refs.scrollRestorationTimeout.current = setTimeout(() => {
      if (storeState().navigation.isNavigatingBack) {
        const scrollHistory = [...storeState().navigation.scrollHistory]
        const lastScrollHistory = scrollHistory.pop()
        storeState().navigation.setScrollHistory(scrollHistory)
        if (lastScrollHistory && lastScrollHistory.pathname === refs.pathname.current) {
          gsap.set(window, { scrollTo: { x: 0, y: lastScrollHistory.value, autoKill: false } })
        }
      } else {
        gsap.set(window, { scrollTo: { x: 0, y: 0, autoKill: false } })
      }
      clearTimeout(refs.scrollRestorationTimeout.current!)
      refs.scrollRestorationTimeout.current = setTimeout(() => {
        storeState().navigation.setIsNavigatingBack(false)
      }, 400)
    }, 100)
  }, [refs])

  //
  // Update pathname ref
  //
  useEffect(() => {
    const fixedPath = router.asPath
      .split('#')[0]
      .split('?')[0]
      .replace(/^\/..-..\/?/u, '')
    if (!refs.pathname.current) storeState().navigation.setPathname(fixedPath)
    refs.pathname.current = fixedPath
  }, [refs, router.asPath])

  //
  // Navigation utils
  //
  useEffect(() => {
    const navigateTo = (href: string) => {
      const to = href.split('/').filter(Boolean).join('/').replace(/\/$/u, '')
      const from = router.asPath.split('/').filter(Boolean).join('/').replace(/\/$/u, '')
      if (to === from) router.replace(href, '', { scroll: false })
      else router.push(href, '', { scroll: false })
    }
    const navigateBack = () => {
      if (storeState().navigation.hasNavigated) {
        router.back()
      } else if (window.location.hash) {
        setTimeout(() => {
          navigateTo(window.location.pathname)
        })
      } else {
        navigateTo('/')
      }
    }
    storeState().navigation.setNavigateTo(navigateTo)
    storeState().navigation.setNavigateBack(navigateBack)
    // detect first navigation
    const onFirstNavigation = () => {
      storeState().navigation.setHasNavigated(true)
      router.events.off('routeChangeComplete', onFirstNavigation)
      router.events.off('hashChangeComplete', onFirstNavigation)
    }
    if (!storeState().navigation.hasNavigated) {
      router.events.on('routeChangeComplete', onFirstNavigation)
      router.events.on('hashChangeComplete', onFirstNavigation)
    }
    // handle scroll history
    const onBeforeHistoryChange = () => {
      if (!storeState().navigation.isNavigatingBack) {
        const scrollHistory = [
          ...storeState().navigation.scrollHistory,
          { pathname: refs.pathname.current || '/', value: getScrollTop() }
        ]
        storeState().navigation.setScrollHistory(scrollHistory)
      }
    }
    router.beforePopState(() => {
      storeState().navigation.setIsNavigatingBack(true)
      return true
    })
    router.events.on('beforeHistoryChange', onBeforeHistoryChange)
    return () => {
      router.events.off('beforeHistoryChange', onBeforeHistoryChange)
    }
  }, [refs, router])

  return (
    <div className={classNames('Layout', css.root, fontVariables)}>
      <Head {...pageProps.content.head} />

      <Nav content={pageProps.content.common.nav} handleRef={refs.navHandle} />

      <TransitionPresence onChildrenMounted={handlePageMounted}>
        <Component {...pageProps} key={router.asPath} />
      </TransitionPresence>

      <Footer content={pageProps.content.common.footer} />

      <ScreenIntro />
      <ScreenRotate content={pageProps.content.common.screenRotate} />
      <ScreenNoScript content={pageProps.content.common.screenNoScript} />

      <CookieBanner content={pageProps.content.common.cookieBanner} />

      <AppAdmin />
    </div>
  )
})

Layout.displayName = 'Layout'
