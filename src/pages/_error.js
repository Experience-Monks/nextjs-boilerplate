import React from 'react';
import Head from 'next/head';
import { type Context } from 'next';

import Nav from '../components/Nav/Nav';
import { ReactComponent as Cross } from '../assets/svgs/cross.svg';

type PageError = { statusCode?: number };

function Error({ statusCode }: PageError): React$Element<any> {
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
}

Error.getInitialProps = ({ res, err }: Context): PageError => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
