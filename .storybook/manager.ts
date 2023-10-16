import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Experience.Monks NextJS Boilerplate',
    brandUrl: 'https://media.monks.com/solutions/experience',
    brandImage: '/common/favicons/favicon-32x32.png'
  })
})
