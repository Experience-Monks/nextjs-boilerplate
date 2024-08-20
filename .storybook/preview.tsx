/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StoryContext, StoryFn } from '@storybook/react'

import { useEffect } from 'react'
import { gsap } from 'gsap'

import './storybook.scss'
import '@/styles/global.scss'

import { FeatureFlagService } from '@/services/feature-flags.service'

import { fontVariables } from '@/utils/fonts'
import { setBodyClasses } from '@/utils/set-body-classes'

import { useFeatureFlags } from '@/hooks/use-feature-flags'

import { initGsap, initRive } from '@/motion/core/init'
import { TransitionPresence } from '@/motion/transition/transition.presence'

export const parameters = {
  options: {
    storySort: {
      order: ['intro', ['Readme', 'Copy', 'Typography', 'Colors', 'Effects', 'SVG'], 'pages', 'screens', 'components']
    }
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/iu,
      date: /Date$/u
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

initGsap()
initRive()
setBodyClasses()

// register all gsap effects
const req = require.context('../src/motion/effects', true, /^.\/.*ts$/u)
req
  .keys()
  .filter((key) => !key.includes('.d.ts'))
  .forEach((key) => {
    gsap.registerEffect(req(key).default)
  })

export const globalTypes = {
  // add feature flags to the global toolbar
  ...Object.entries(FeatureFlagService.getAll())
    // add only the flags relevant inside storybook
    .filter(([key]) => ['dynamicResponsiveness'].includes(key))
    .reduce(
      (acc, [key, value]) => {
        acc[key] = {
          description: key,
          defaultValue: value,
          toolbar: {
            title: key,
            items: [
              { value: false, title: 'OFF' },
              { value: true, title: 'ON' }
            ]
          }
        }
        return acc
      },
      {} as { [key: string]: any }
    )
}

document.querySelector('#storybook-root')?.classList.add(fontVariables)

export const decorators = [
  (Story: StoryFn, context: StoryContext) => {
    require('focus-visible')

    const { flags, setFlag } = useFeatureFlags()

    useEffect(() => {
      Object.keys(flags).forEach((key) => {
        if (context.globals[key]) setFlag(key as keyof typeof flags, context.globals[key])
      })
    }, [flags, setFlag, context.globals])

    useEffect(() => {
      if (context.globals.dynamicResponsiveness) document.documentElement.classList.add('dynamic')
      else document.documentElement.classList.remove('dynamic')
    }, [context.globals.dynamicResponsiveness])

    return <Story />
  },
  (Story: StoryFn) => {
    return (
      <TransitionPresence>
        <Story />
      </TransitionPresence>
    )
  }
]
