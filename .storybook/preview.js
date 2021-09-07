import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 11.2

import '../src/styles/global.scss';

import { store } from '../src/redux';

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  )
];

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
