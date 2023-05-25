import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import 'normalize.css'

import '@/styles/global.scss'

import { PageProps } from '@/data/types'

import gsapInit from '@/utils/gsap-init'
import setBodyClasses from '@/utils/set-body-classes'

import Layout from '@/components/Layout/Layout'

import { store } from '@/redux'

require('default-passive-events')
require('focus-visible')
gsapInit()

// This default export is required in a new `pages/_app.js` file.
const App: FC<AppProps<PageProps>> = (props) => {
  useEffect(() => {
    // Body class names
    setBodyClasses()

    // Disable automatic scroll restoration
    window.history.scrollRestoration = 'manual'

    // Fix https://github.com/vercel/next.js/issues/17464
    document.querySelectorAll('head > link[rel="stylesheet"]').forEach((node) => {
      node.removeAttribute('data-n-g')
      node.removeAttribute('data-n-p')
    })

    new MutationObserver((mutations) => {
      mutations.forEach(({ target }) => {
        const t = target as Element
        if (t.nodeName === 'STYLE' && t.getAttribute('media') === 'x') t.removeAttribute('media')
      })
    }).observe(document.head, { subtree: true, attributeFilter: ['media'] })
  }, [])

  /** NOTE: this is where dev tools and helper modules can be placed */
  // useEffect(() => {}, [])

  return <Provider store={store}>{props.pageProps.noLayout ? <props.Component /> : <Layout {...props} />}</Provider>
}

export default App
