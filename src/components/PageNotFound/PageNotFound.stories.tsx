import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './PageNotFound.view'

import { CmsService } from '@/services/cms.service'

import { View } from './PageNotFound.view'

export default { title: 'pages/PageNotFound.view' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: CmsService.getPageContent('notFound')
}

Default.argTypes = {}
