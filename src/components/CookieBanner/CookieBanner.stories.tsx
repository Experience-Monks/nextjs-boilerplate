import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './CookieBanner'

import { action } from '@storybook/addon-actions'

import content from '@/data/content.json'

import { View } from './CookieBanner'

export default { title: 'components/CookieBanner' }

export const Default: StoryFn<ViewProps> = (args) => (
  <View {...args} cookieConsent={null} setCookieConsent={action('setCookieConsent')} />
)

Default.args = {
  content: content.common.cookieBanner
}

Default.argTypes = {}
