import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './PageUnsupported'

import content from '@/data/content.json'

import { View } from './PageUnsupported'

export default { title: 'pages/PageUnsupported' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  content: content.pageUnsupported,
  common: content.common
}

Default.argTypes = {}
