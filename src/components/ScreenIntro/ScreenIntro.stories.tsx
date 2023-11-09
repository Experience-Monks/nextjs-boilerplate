import { action } from '@storybook/addon-actions'
import { StoryFn } from '@storybook/react'

import { View, ViewProps } from './ScreenIntro'

export default { title: 'components/ScreenIntro' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} onComplete={action('onComplete')} />
}

Default.args = {}

Default.argTypes = {}
