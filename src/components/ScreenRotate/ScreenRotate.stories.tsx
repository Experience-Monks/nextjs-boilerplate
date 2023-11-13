import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './ScreenRotate'

import content from '@/data/content.json'

import { View } from './ScreenRotate'

export default { title: 'components/ScreenRotate' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: content.common.screenRotate
}

Default.argTypes = {}
