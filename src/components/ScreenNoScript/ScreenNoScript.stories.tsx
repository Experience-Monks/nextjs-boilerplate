import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './ScreenNoScript'

import content from '@/data/content.json'

import { View } from './ScreenNoScript'

export default { title: 'components/ScreenNoScript' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: content.common.screenNoScript
}

Default.argTypes = {}
