import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './PageHome.view'

import { CmsService } from '@/services/cms.service'

import { View } from './PageHome.view'

export default { title: 'pages/PageHome' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: CmsService.getPageContent('home')
}

Default.argTypes = {}
