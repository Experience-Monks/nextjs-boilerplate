import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './Footer.view'

import { CmsService } from '@/services/cms.service'

import { View } from './Footer.view'

export default { title: 'components/Footer' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: CmsService.getPageContent('home').common.footer
}

Default.argTypes = {}
