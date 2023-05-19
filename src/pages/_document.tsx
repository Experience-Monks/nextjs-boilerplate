import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

import config from '@/data/config.json'

import sanitizer from '@/utils/sanitizer'

// if JS is available we hide the page immediately to prevent static content flash.
const hideStaticHtmlScript = `
  if (typeof window !== 'undefined') document.documentElement.classList.add('hide-static-html');
`

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        {config.hideStaticHtml && (
          <script data-cfasync="false" dangerouslySetInnerHTML={{ __html: sanitizer(hideStaticHtmlScript) }} />
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
