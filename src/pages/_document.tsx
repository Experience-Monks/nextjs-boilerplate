import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

import config from '@/data/config.json'

import copy from '@/utils/copy'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        {config.supportsNoJs && (
          // If config.supportsNoJs is set to true and JS is available, we hide the page immediately
          // to prevent static content flash. Otherwise the static page will be shown by default.
          <script
            data-cfasync="false"
            dangerouslySetInnerHTML={{
              __html: copy.sanitize(
                `if (typeof window !== 'undefined') {
                  document.documentElement.style.opacity = 0
                  document.documentElement.style.visibility = 'hidden'
                }`
              )
            }}
          />
        )}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
