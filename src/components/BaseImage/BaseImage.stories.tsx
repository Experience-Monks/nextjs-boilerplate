import { action } from '@storybook/addon-actions'
import { StoryFn } from '@storybook/react'

import BaseImage, { BaseImageProps } from './BaseImage'

export default { title: 'components/BaseImage' }

export const Default: StoryFn<BaseImageProps> = (args) => <BaseImage {...args} />

Default.args = {
  data: require('@/assets/images/three-logo.jpeg').default,
  onLoad: action('onLoad')
}

Default.argTypes = {}
