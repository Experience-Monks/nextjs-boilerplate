import { StoryFn } from '@storybook/react'

import content from '@/data/content.json'

import { View, ViewProps } from './PageUnsupported'

export default { title: 'pages/PageUnsupported' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: content.pageUnsupported,
  common: content.common
}

Default.argTypes = {}
