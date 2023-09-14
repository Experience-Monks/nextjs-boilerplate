import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import { AwsRum, AwsRumConfig } from 'aws-rum-web'
import { gsap } from 'gsap'
import 'normalize.css'

import '@/styles/global.scss'

import { PageProps } from '@/data/types'

import setBodyClasses from '@/utils/set-body-classes'

import useCookieBanner from '@/hooks/use-cookie-banner'

import Layout from '@/components/Layout/Layout'

import gsapInit from '@/motion/init-gsap'
import { store } from '@/redux'

require('default-passive-events')
require('focus-visible')
gsapInit()

// This default export is required in a new `pages/_app.js` file.
const App: FC<AppProps<PageProps>> = (props) => {
  const { cookieConsent } = useCookieBanner()
  let awsRum: AwsRum

  try {
    const config: AwsRumConfig = {
      sessionSampleRate: 1,
      guestRoleArn: 'arn:aws:iam::319077079874:role/RUM-Monitor-us-east-2-319077079874-9590424274961-Unauth',
      identityPoolId: 'us-east-2:22b9cadb-77d7-4345-9b6c-88d161a3ea82',
      endpoint: 'https://dataplane.rum.us-east-2.amazonaws.com',
      telemetries: ['performance', 'errors', 'http'],
      allowCookies: cookieConsent?.preference,
      enableXRay: false,
      disableAutoPageView: true
    }

    const APPLICATION_ID = 'c1d58c9f-d7f1-4f63-944c-9a939f3562e9'
    const APPLICATION_VERSION = '1.0.0'
    const APPLICATION_REGION = 'us-east-2'

    awsRum = new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config)
  } catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
  }

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
