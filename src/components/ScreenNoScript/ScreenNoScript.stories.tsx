import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './ScreenNoScript.view'

import { CmsService } from '@/services/cms.service'

import { View } from './ScreenNoScript.view'

export default { title: 'components/ScreenNoScript' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: CmsService.getPageContent('home').common.screenNoScript
}

Default.argTypes = {}
