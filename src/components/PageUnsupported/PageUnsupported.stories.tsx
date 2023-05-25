import { StoryFn } from '@storybook/react'

import PageUnsupported, { PageUnsupportedProps } from './PageUnsupported'

export default { title: 'components/PageUnsupported' }

export const Default: StoryFn<PageUnsupportedProps> = (args) => <PageUnsupported {...args} />

Default.args = {}

Default.argTypes = {}
