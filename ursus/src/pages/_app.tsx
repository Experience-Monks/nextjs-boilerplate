import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import 'normalize.css';
import '@/utils/why-did-you-render';

import '@/styles/global.scss';

import Layout from '@/components/Layout/Layout';

import { store } from '@/redux';

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  require('default-passive-events');
  require('focus-visible');
}

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }: AppProps) {
  const { isUnsupported, ...componentProps } = pageProps;

  if (isUnsupported) {
    return <Component {...componentProps} />;
  }

  return (
    <Provider store={store}>
      <Layout>
        <Component {...componentProps} />
      </Layout>
    </Provider>
  );
}

export default App;
