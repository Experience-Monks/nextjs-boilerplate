import { FC, memo, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { nanoid } from 'nanoid'

import css from './Layout.module.scss'

import { PageHandle, PageProps } from '@/data/types'

import { localState } from '@/store'

import { getScrollTop } from '@/utils/basic-functions'
import { fontVariables } from '@/utils/fonts'

import useFeatureFlags from '@/hooks/use-feature-flags'

import ScreenIntro from '@/components/ScreenIntro/ScreenIntro'
import ScreenNoScript from '@/components/ScreenNoScript/ScreenNoScript'

import Footer from '@/components/Footer/Footer'
import Head from '@/components/Head/Head'
import Nav, { NavHandle } from '@/components/Nav/Nav'

const ScreenRotate = dynamic(() => import('@/components/ScreenRotate/ScreenRotate'), { ssr: false })
const CookieBanner = dynamic(() => import('@/components/CookieBanner/CookieBanner'), { ssr: false })
const AppAdmin = dynamic(() => import('@/components/AppAdmin/AppAdmin'), { ssr: false })

const Layout: FC<AppProps<PageProps>> = ({ Component, pageProps }) => {
  const router = useRouter()

  const { flags } = useFeatureFlags()

  const [currentPage, setCurrentPage] = useState<ReactNode>(<Component key="first-page" {...pageProps} />)
  const [introComplete, setIntroComplete] = useState(false)

  const pathnameRef = useRef('/')
  const navHandleRef = useRef<NavHandle | null>(null)
  const pageHandleRef = useRef<PageHandle | null>(null)
  const isFirstPageRef = useRef(true)
  const scrollRestorationTimeoutRef = useRef<NodeJS.Timeout>()

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  //
  // Update pathname ref
  //
  useEffect(() => {
    pathnameRef.current = router.asPath
      .split('#')[0]
      .split('?')[0]
      .replace(/^\/..-..\/?/, '')
  }, [router.asPath])

  //
  // Navigation utils
  //
  useEffect(() => {
    const navigateTo = (href: string) => {
      const to = href.split('/').filter(Boolean).join('/').replace(/\/$/, '')
      const from = router.asPath.split('/').filter(Boolean).join('/').replace(/\/$/, '')
      if (to === from) router.replace(href, '', { scroll: false }).catch(console.log)
      else router.push(href, '', { scroll: false }).catch(console.log)
    }
    const navigateBack = () => {
      if (localState().app.hasNavigated) {
        router.back()
      } else if (window.location.hash) {
        setTimeout(() => {
          navigateTo(window.location.pathname)
        })
      } else {
        navigateTo('/')
      }
    }
    localState().app.setNavigateTo(navigateTo)
    localState().app.setNavigateBack(navigateBack)
    // detect first navigation
    const onFirstNavigation = () => {
      localState().app.setHasNavigated(true)
      router.events.off('routeChangeComplete', onFirstNavigation)
      router.events.off('hashChangeComplete', onFirstNavigation)
    }
    if (!localState().app.hasNavigated) {
      router.events.on('routeChangeComplete', onFirstNavigation)
      router.events.on('hashChangeComplete', onFirstNavigation)
    }
    // handle scroll history
    const onBeforeHistoryChange = () => {
      if (!localState().app.isNavigatingBack) {
        const scrollHistory = [
          ...localState().app.scrollHistory,
          { pathname: pathnameRef.current, value: getScrollTop() }
        ]
        localState().app.setScrollHistory(scrollHistory)
      }
    }
    router.beforePopState(() => {
      localState().app.setIsNavigatingBack(true)
      return true
    })
    router.events.on('beforeHistoryChange', onBeforeHistoryChange)
    return () => {
      router.events.off('beforeHistoryChange', onBeforeHistoryChange)
    }
  }, [router])

  //
  // Page transitions
  //
  useEffect(() => {
    if (!introComplete) return

    const transitionTimeline = gsap.timeline()

    // if the current page has an animateOut(), do it
    if (flags.pageTransitions && pageHandleRef.current?.animateOut) {
      transitionTimeline.add(pageHandleRef.current.animateOut())
    }

    // after the out animation, set the new page
    transitionTimeline.add(() => {
      // reset scroll
      gsap.set(window, { scrollTo: { x: 0, y: 0, autoKill: false } })
      // update app.pathname
      localState().app.setPathname(pathnameRef.current)
      // set new page
      setCurrentPage(
        <Component
          key={isFirstPageRef.current ? 'first-page' : nanoid()}
          {...pageProps}
          onReady={(pageHandle?: RefObject<PageHandle>) => {
            pageHandleRef.current = pageHandle?.current || null
            // animate in
            const pageTransition = pageHandleRef.current?.animateIn?.()
            const navTransition = navHandleRef.current?.animateIn?.()
            if (!flags.pageTransitions) {
              pageTransition?.progress(1)
              navTransition?.progress(1)
            }
            // restore scroll
            clearTimeout(scrollRestorationTimeoutRef.current)
            scrollRestorationTimeoutRef.current = setTimeout(() => {
              if (localState().app.isNavigatingBack) {
                const scrollHistory = [...localState().app.scrollHistory]
                const lastScrollHistory = scrollHistory.pop()
                localState().app.setScrollHistory(scrollHistory)
                if (lastScrollHistory && lastScrollHistory.pathname === pathnameRef.current) {
                  gsap.set(window, { scrollTo: { x: 0, y: lastScrollHistory.value, autoKill: false } })
                }
              } else {
                gsap.set(window, { scrollTo: { x: 0, y: 0, autoKill: false } })
              }
              clearTimeout(scrollRestorationTimeoutRef.current)
              scrollRestorationTimeoutRef.current = setTimeout(() => {
                localState().app.setIsNavigatingBack(false)
              }, 400)
            }, 100)
          }}
        />
      )
      isFirstPageRef.current = false
    })

    return () => {
      transitionTimeline.kill()
    }
  }, [Component, pageProps, flags.pageTransitions, introComplete])

  return (
    <div className={classNames('Layout', css.root, fontVariables)}>
      <Head {...pageProps.head} />

      <Nav content={pageProps.common.nav} handleRef={navHandleRef} />
      <div className={css.content}>{currentPage}</div>
      <Footer content={pageProps.common.footer} />

      {!introComplete ? <ScreenIntro onComplete={handleIntroComplete} /> : null}
      <ScreenRotate content={pageProps.common.screenRotate} />
      <ScreenNoScript content={pageProps.common.screenNoScript} />

      <CookieBanner content={pageProps.common.cookieBanner} />

      <AppAdmin />
    </div>
  )
}

export default memo(Layout)
