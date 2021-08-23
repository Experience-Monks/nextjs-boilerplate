import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 11.2

import '../src/styles/global.scss';

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
