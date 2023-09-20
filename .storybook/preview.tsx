import { Provider } from 'react-redux'

import { StoryFn } from '@storybook/react'

import { store } from '@/redux'

import '@/styles/global.scss'
import gsapInit from '@/motion/init-gsap'
import setBodyClasses from '@/utils/set-body-classes'

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
    viewports: {
      responsive: {
        name: 'Responsive'
      },
      phone: {
        name: 'Phone',
        type: 'mobile',
        styles: { height: '560px', width: '375px' }
      },
      tablet: {
        name: 'Tablet',
        type: 'tablet',
        styles: { height: '910px', width: '768px' }
      },
      desktop: {
        name: 'Desktop',
        type: 'tablet',
        styles: { height: '810px', width: '1440px' }
      }
    }
  }
}

gsapInit()
setBodyClasses()

export const decorators = [
  (Story: StoryFn) => {
    require('default-passive-events')
    require('focus-visible')
    return <Story />
  },
  (Story: StoryFn) => {
    return (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  }
]
