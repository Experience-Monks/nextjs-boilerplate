import { StoryFn } from '@storybook/react'

import PageHome, { PageHomeProps } from './PageHome'

export default { title: 'components/PageHome' }

export const Default: StoryFn<PageHomeProps> = (args) => <PageHome {...args} />

Default.args = {}

Default.argTypes = {}
