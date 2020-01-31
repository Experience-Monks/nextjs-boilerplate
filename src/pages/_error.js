import Head from 'next/head';

import Nav from '../components/Nav/Nav';

function Error({ statusCode }) {
  return (
    <section className="Error">
      <Head>
        <title>404 | Jam3 generator</title>
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>

      <Nav />

      <h1>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</h1>
    </section>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
