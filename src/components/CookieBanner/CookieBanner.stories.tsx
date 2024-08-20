import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './CookieBanner.view'

import { action } from '@storybook/addon-actions'

import { CmsService } from '@/services/cms.service'

import { View } from './CookieBanner.view'

export default { title: 'components/CookieBanner' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} cookieConsent={null} setCookieConsent={action('setCookieConsent')} />
}

Default.args = {
  content: CmsService.getPageContent('home').common.cookieBanner
}

Default.argTypes = {}
