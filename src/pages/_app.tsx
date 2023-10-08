import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'
import 'normalize.css'

import '@/styles/global.scss'

import { PageProps } from '@/data/types'

import AWSRumService from '@/services/aws-rum'

import setBodyClasses from '@/utils/set-body-classes'

import Layout from '@/components/Layout/Layout'

import gsapInit from '@/motion/init-gsap'
import { store } from '@/redux'

require('default-passive-events')
require('focus-visible')
gsapInit()

// This default export is required in a new `pages/_app.js` file.
const App: FC<AppProps<PageProps>> = (props) => {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ALLOW_AWS_RUM === 'true') AWSRumService.RecordPageView(router.pathname)
  }, [router])

  useEffect(() => {
    // Body class names
    setBodyClasses()

    // Fix https://github.com/vercel/next.js/issues/17464
    document.querySelectorAll('head > link[rel="stylesheet"]').forEach((node) => {
      node.removeAttribute('data-n-g')
      node.removeAttribute('data-n-p')
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

  /** NOTE: this is where dev tools and helper modules can be placed */
  // useEffect(() => {}, [])

  return (
    <Provider store={store}>
      {props.pageProps.noLayout ? <props.Component {...props.pageProps} /> : <Layout {...props} />}
    </Provider>
  )
}

export default App
