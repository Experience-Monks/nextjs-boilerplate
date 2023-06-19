import { StoryFn } from '@storybook/react'

import content from '@/data/content.json'

import { View, ViewProps } from './ScreenNoScript'

export default { title: 'components/ScreenNoScript' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: content.common.screenNoScript
}

Default.argTypes = {}
