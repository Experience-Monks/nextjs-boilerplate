import { StoryFn } from '@storybook/react'

import CookieBanner, { CookieBannerProps } from './CookieBanner'

export default { title: 'components/CookieBanner' }

export const Default: StoryFn<CookieBannerProps> = (args) => <CookieBanner {...args} />

Default.args = {
  onAccept: () => console.log('accept'),
  onReject: () => console.log('reject')
}

Default.argTypes = {}

export const WithChildren: StoryFn<CookieBannerProps> = (args) => (
  <CookieBanner {...args}>
    We use cookies on this website to improve your experience. Learn more on our{' '}
    <a href="https://www.jam3.com/privacy" target="_blank'">
      Privacy Policy
    </a>
    .
  </CookieBanner>
)

WithChildren.args = { ...Default.args }

Default.argTypes = {}
