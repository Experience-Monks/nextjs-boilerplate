import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './ScreenIntro.view'

import { action } from '@storybook/addon-actions'

import { View } from './ScreenIntro.view'

export default { title: 'components/ScreenIntro' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} onComplete={action('onComplete')} />
}

Default.args = {}

Default.argTypes = {}
