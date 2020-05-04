// Custom error page adapted from https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-error-page
import React from 'react';
import Head from 'next/head';
import { NextPageContext, NextPage } from 'next';

import Nav from '../components/Nav/Nav';
import { ReactComponent as Cross } from '../assets/svgs/cross.svg';

const Error: NextPage<{ statusCode: number }> = ({ statusCode }) => {
  return (
    <section className="Error">
      <Head>
        <title>404 | Jam3 generator</title>
      </Head>

      <Nav />

      <Cross />
      <h1>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</h1>
    </section>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  return { statusCode: res?.statusCode ?? err?.statusCode ?? 404 };
};

export default Error;
