import type { DocumentContext } from 'next/document'

import Document, { Head, Html, Main, NextScript } from 'next/document'

import { copy } from '@/utils/copy'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        {/* FOUC prevention step 1/2: hide the page immediately. */}
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
