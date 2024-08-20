import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './PageUnsupported.view'

import { CmsService } from '@/services/cms.service'

import { View } from './PageUnsupported.view'

export default { title: 'pages/PageUnsupported' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: CmsService.getPageContent('unsupported')
}

Default.argTypes = {}
