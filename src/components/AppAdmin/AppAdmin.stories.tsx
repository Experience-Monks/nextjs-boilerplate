import { StoryFn } from '@storybook/react'

import { View, ViewProps } from './AppAdmin'

export default { title: 'components/AppAdmin' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {}

Default.argTypes = {}
