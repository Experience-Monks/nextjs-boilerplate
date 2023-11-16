import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './BaseButton.view'

import { View } from './BaseButton.view'

export default { title: 'components/BaseButton' }

export const Button: StoryFn<ViewProps> = (args) => (
  <View {...args}>
    <span>I&apos;m a button since I don&apos;t have an href prop</span>
  </View>
)

export const Link: StoryFn<ViewProps> = (args) => (
  <View {...args} href="/">
    I&apos;m a link cause I have an href prop!
    <br />
    Next.js routing navigation
    <br />
    will happen automatically.
    <br />
    If the href starts with &quot;/&quot;.
  </View>
)
