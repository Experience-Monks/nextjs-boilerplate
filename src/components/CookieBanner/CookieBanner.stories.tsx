import { action } from '@storybook/addon-actions'
import { StoryFn } from '@storybook/react'

import content from '@/data/content.json'

import { View, ViewProps } from './CookieBanner'

export default { title: 'components/CookieBanner' }

export const Default: StoryFn<ViewProps> = (args) => (
  <View {...args} cookieConsent={null} setCookieConsent={action('setCookieConsent')} />
)

Default.args = {
  content: content.common.cookieBanner
}

Default.argTypes = {}
