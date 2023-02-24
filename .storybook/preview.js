import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import '../src/styles/global.scss';

import { store } from '../src/redux';
import gsapInit from '../src/utils/gsap-init';
import setBodyClasses from '../src/utils/set-body-classes';

gsapInit();
setBodyClasses();

export const decorators = [
  (Story) => {
    require('default-passive-events');
    require('focus-visible');
    return Story();
  },
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  )
];

export const parameters = {
  options: {
    storySort: {
      order: ['intro', ['Readme', 'Copy', 'Typography', 'Colors', 'Effects', 'SVG'], 'pages', 'screens', 'components']
    }
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: 'medium',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'medium', value: '#7f7f7f' },
      { name: 'dark', value: '#333333' },
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998' },
      { name: 'pinterest', value: '#bd081c' },
      { name: 'xbox', value: '#52b043' },
      { name: 'starbucks', value: '#00704a' },
      { name: 'tmoble', value: '#e20074' }
    ]
  },
  viewport: {
    // defaultViewport: 'phone',
    viewports: {
      phone: {
        name: 'Phone (media-mobile)',
        styles: {
          height: '560px',
          width: '375px'
        },
        type: 'mobile'
      },
      tabletPortrait: {
        name: 'Tablet Portrait (media-tablet)',
        styles: {
          height: '910px',
          width: '768px'
        },
        type: 'tablet'
      },
      tabletLandscape: {
        name: 'Tablet Landscape (media-desktopSm)',
        styles: {
          height: '655px',
          width: '1024px'
        },
        type: 'tablet'
      },
      desktop: {
        name: 'Desktop (media-desktopMd)',
        styles: {
          height: '810px',
          width: '1440px'
        },
        type: 'tablet'
      }
    }
  },
  nextRouter: {
    Provider: RouterContext.Provider
  }
};
