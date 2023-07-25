import { StoryFn } from '@storybook/react'

import content from '@/data/content.json'

import { View, ViewProps } from './ScreenRotate'

export default { title: 'components/ScreenRotate' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: content.common.screenRotate
}

Default.argTypes = {}
