import { StoryFn } from '@storybook/react'

import Footer, { FooterProps } from './Footer'

export default { title: 'components/Footer' }

export const Default: StoryFn<FooterProps> = (args) => <Footer {...args} />

Default.args = {}

Default.argTypes = {}
