import { StoryFn } from '@storybook/react'

import PageAbout, { PageAboutProps } from './PageAbout'

export default { title: 'components/PageAbout' }

export const Default: StoryFn<PageAboutProps> = (args) => <PageAbout {...args} />

Default.args = {}

Default.argTypes = {}
