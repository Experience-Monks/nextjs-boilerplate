import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './Footer'

import content from '@/data/content.json'

import { View } from './Footer'

export default { title: 'components/Footer' }

export const Default: StoryFn<ViewProps> = (args) => <View {...args} />

Default.args = {
  content: content.common.footer
}

Default.argTypes = {}
