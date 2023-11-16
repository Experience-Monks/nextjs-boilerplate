import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './BaseImage.view'

import { action } from '@storybook/addon-actions'

import { View } from './BaseImage.view'

export default { title: 'components/BaseImage' }

export const Default: StoryFn<ViewProps> = (args) => <View {...args} />

Default.args = {
  data: require('@/assets/images/test.png').default,
  onLoad: action('onLoad')
}

Default.argTypes = {}
