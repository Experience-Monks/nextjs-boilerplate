import React from 'react';
/* $FlowFixMe "Html" export is not defined in "next/document" */
import Document, { Html, Head, Main, NextScript, type DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): React$Element<any> {
    return (
      <Html lang="en">
        <Head></Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
