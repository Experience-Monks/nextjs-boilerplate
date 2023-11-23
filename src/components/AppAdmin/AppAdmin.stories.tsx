import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './AppAdmin.view'

import { View } from './AppAdmin.view'

export default { title: 'components/AppAdmin' }

export const Default: StoryFn<ViewProps> = (args) => {
  return <View {...args} />
}

Default.args = {
  env: 'storybook',
  date: '2021-01-01 15:03',
  commit: 'bae8179',
  version: '123'
}

Default.argTypes = {}
