import 'normalize.css'

import type { FC } from 'react'
import type { AppProps } from 'next/app'
import type { PageProps } from '@/data/types'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'

import '@/styles/global.scss'

import { localStore } from '@/store'

import { AnalyticsService } from '@/services/analytics'
import { AWSRumService } from '@/services/aws-rum'

import { setBodyClasses } from '@/utils/set-body-classes'

import { useFeatureFlags } from '@/hooks/use-feature-flags'

import { initGsap, initRive } from '@/motion/core/init'

import { Layout } from '@/components/Layout/Layout'

require('focus-visible')

initRive()
initGsap()

// This default export is required in a new `pages/_app.js` file.
const App: FC<AppProps<PageProps>> = (props) => {
  const router = useRouter()

  const { flags } = useFeatureFlags()

  const cookieConsent = localStore(({ consent }) => consent.cookieConsent)

  useEffect(() => {
    history.scrollRestoration = 'manual'

    // Initialize AWS RUM
    AWSRumService.start()

    // Body class names
    setBodyClasses()

    // Fix https://github.com/vercel/next.js/issues/17464
    document.querySelectorAll<HTMLElement>('head > link[rel="stylesheet"]').forEach((node) => {
      delete node.dataset.nG
      delete node.dataset.nP
    })

    // FOUC prevention step 2/2: Make sure the page us un-hidden once application kicks in
    gsap.set(document.documentElement, { autoAlpha: 1 })

    new MutationObserver((mutations) => {
      mutations.forEach(({ target }) => {
        const t = target as Element
        if (t.nodeName === 'STYLE' && t.getAttribute('media') === 'x') t.removeAttribute('media')
      })
    }).observe(document.head, { subtree: true, attributeFilter: ['media'] })
  }, [])

  useEffect(() => {
    if (cookieConsent?.statistics) {
      AnalyticsService.start()
      AWSRumService.allowCookies()
    }
  }, [cookieConsent])

  useEffect(() => {
    const handleRouteChange = (pathname: string) => {
      AWSRumService.recordPageView(pathname)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  useEffect(() => {
    if (flags.dynamicResponsiveness) document.documentElement.classList.add('dynamic')
    else document.documentElement.classList.remove('dynamic')
  }, [flags.dynamicResponsiveness])

  return props.pageProps.noLayout ? <props.Component {...props.pageProps} /> : <Layout {...props} />
}

export default App
