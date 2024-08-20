import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './ScreenRotate.view'

import { CmsService } from '@/services/cms.service'

import { View } from './ScreenRotate.view'

export default { title: 'components/ScreenRotate' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: CmsService.getPageContent('home').common.screenRotate
}

Default.argTypes = {}
