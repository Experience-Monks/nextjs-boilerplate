import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'Experience.Monks NextJS Boilerplate',
    brandUrl: 'https://media.monks.com/solutions/experience',
    brandImage: '/common/favicons/favicon-32x32.png'
  })
})
