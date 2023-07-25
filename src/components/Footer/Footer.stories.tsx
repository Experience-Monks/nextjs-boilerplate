import { StoryFn } from '@storybook/react'

import content from '@/data/content.json'

import { View, ViewProps } from './Footer'

export default { title: 'components/Footer' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: content.common.footer
}

Default.argTypes = {}
