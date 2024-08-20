import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './PageAbout.view'

import { CmsService } from '@/services/cms.service'

import { View } from './PageAbout.view'

export default { title: 'pages/PageAbout' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: CmsService.getPageContent('about')
}

Default.argTypes = {}
