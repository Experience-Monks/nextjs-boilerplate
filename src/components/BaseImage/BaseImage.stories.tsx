import type { StoryFn } from '@storybook/react'
import type { BaseImageProps } from './BaseImage'

import { action } from '@storybook/addon-actions'

import BaseImage from './BaseImage'

export default { title: 'components/BaseImage' }

export const Default: StoryFn<BaseImageProps> = (args) => <BaseImage {...args} />

Default.args = {
  data: require('@/assets/images/x-logo.png').default,
  onLoad: action('onLoad')
}

Default.argTypes = {}
