import type { FC, ReactNode, RefObject } from 'react'
import type { AppProps } from 'next/app'
import type { NavHandle } from '@/components/Nav'
import type { PageHandle, PageProps } from '@/data/types'

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { nanoid } from 'nanoid'

import css from './Layout.module.scss'

import { localState } from '@/store'

import { getScrollTop } from '@/utils/basic-functions'
import { fontVariables } from '@/utils/fonts'

import { useFeatureFlags } from '@/hooks/use-feature-flags'
import { useRefs } from '@/hooks/use-refs'

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
  pageHandle: PageHandle | null
  isFirstPage: boolean
  scrollRestorationTimeout: NodeJS.Timeout
}

export const Layout: FC<AppProps<PageProps>> = memo(({ Component, pageProps }) => {
  const refs = useRefs<LayoutRefs>({
    pathname: useRef('/'),
    isFirstPage: useRef(true)
  })

  const router = useRouter()

  const { flags } = useFeatureFlags()

  const [currentPage, setCurrentPage] = useState<ReactNode>(<Component key="first-page" {...pageProps} />)
  const [introComplete, setIntroComplete] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  //
  // Update pathname ref
  //
  useEffect(() => {
    refs.pathname.current = router.asPath
      .split('#')[0]
      .split('?')[0]
      .replace(/^\/..-..\/?/u, '')
  }, [refs, router.asPath])

  //
  // Navigation utils
  //
  useEffect(() => {
    const navigateTo = (href: string) => {
      const to = href.split('/').filter(Boolean).join('/').replace(/\/$/u, '')
      const from = router.asPath.split('/').filter(Boolean).join('/').replace(/\/$/u, '')
      if (to === from) router.replace(href, '', { scroll: false }).catch(console.log)
      else router.push(href, '', { scroll: false }).catch(console.log)
    }
    const navigateBack = () => {
      if (localState().navigation.hasNavigated) {
        router.back()
      } else if (window.location.hash) {
        setTimeout(() => {
          navigateTo(window.location.pathname)
        })
      } else {
        navigateTo('/')
      }
    }
    localState().navigation.setNavigateTo(navigateTo)
    localState().navigation.setNavigateBack(navigateBack)
    // detect first navigation
    const onFirstNavigation = () => {
      localState().navigation.setHasNavigated(true)
      router.events.off('routeChangeComplete', onFirstNavigation)
      router.events.off('hashChangeComplete', onFirstNavigation)
    }
    if (!localState().navigation.hasNavigated) {
      router.events.on('routeChangeComplete', onFirstNavigation)
      router.events.on('hashChangeComplete', onFirstNavigation)
    }
    // handle scroll history
    const onBeforeHistoryChange = () => {
      if (!localState().navigation.isNavigatingBack) {
        const scrollHistory = [
          ...localState().navigation.scrollHistory,
          { pathname: refs.pathname.current, value: getScrollTop() }
        ]
        localState().navigation.setScrollHistory(scrollHistory)
      }
    }
    router.beforePopState(() => {
      localState().navigation.setIsNavigatingBack(true)
      return true
    })
    router.events.on('beforeHistoryChange', onBeforeHistoryChange)
    return () => {
      router.events.off('beforeHistoryChange', onBeforeHistoryChange)
    }
  }, [refs, router])

  //
  // Page transitions
  //
  useEffect(() => {
    if (!introComplete) return

    const transitionTimeline = gsap.timeline()

    // if the current page has an animateOut(), do it
    if (flags.pageTransitions && refs.pageHandle.current?.animateOut) {
      transitionTimeline.add(refs.pageHandle.current.animateOut())
    }

    // after the out animation, set the new page
    transitionTimeline.add(() => {
      // reset scroll
      gsap.set(window, { scrollTo: { x: 0, y: 0, autoKill: false } })
      // update app.pathname
      localState().navigation.setPathname(refs.pathname.current)
      // set new page
      setCurrentPage(
        <Component
          key={refs.isFirstPage.current ? 'first-page' : nanoid()}
          {...pageProps}
          onReady={(pageHandle?: RefObject<PageHandle>) => {
            refs.pageHandle.current = pageHandle?.current || null
            // animate in
            const pageTransition = refs.pageHandle.current?.animateIn?.()
            const navTransition = refs.navHandle.current?.animateIn?.()
            if (!flags.pageTransitions) {
              pageTransition?.progress(1)
              navTransition?.progress(1)
            }
            // restore scroll
            clearTimeout(refs.scrollRestorationTimeout.current)
            refs.scrollRestorationTimeout.current = setTimeout(() => {
              if (localState().navigation.isNavigatingBack) {
                const scrollHistory = [...localState().navigation.scrollHistory]
                const lastScrollHistory = scrollHistory.pop()
                localState().navigation.setScrollHistory(scrollHistory)
                if (lastScrollHistory && lastScrollHistory.pathname === refs.pathname.current) {
                  gsap.set(window, { scrollTo: { x: 0, y: lastScrollHistory.value, autoKill: false } })
                }
              } else {
                gsap.set(window, { scrollTo: { x: 0, y: 0, autoKill: false } })
              }
              clearTimeout(refs.scrollRestorationTimeout.current)
              refs.scrollRestorationTimeout.current = setTimeout(() => {
                localState().navigation.setIsNavigatingBack(false)
              }, 400)
            }, 100)
          }}
        />
      )
      refs.isFirstPage.current = false
    })

    return () => {
      transitionTimeline.kill()
    }
  }, [refs, Component, pageProps, flags.pageTransitions, introComplete])

  return (
    <div className={classNames('Layout', css.root, fontVariables)}>
      <Head {...pageProps.content.head} />

      <Nav content={pageProps.content.common.nav} handleRef={refs.navHandle} />
      <div className={css.content}>{currentPage}</div>
      <Footer content={pageProps.content.common.footer} />

      {!introComplete ? <ScreenIntro onComplete={handleIntroComplete} /> : null}
      <ScreenRotate content={pageProps.content.common.screenRotate} />
      <ScreenNoScript content={pageProps.content.common.screenNoScript} />

      <CookieBanner content={pageProps.content.common.cookieBanner} />

      <AppAdmin />
    </div>
  )
})

Layout.displayName = 'Layout'
