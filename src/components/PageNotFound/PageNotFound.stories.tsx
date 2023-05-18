import { StoryFn } from '@storybook/react'

import PageNotFound, { PageNotFoundProps } from './PageNotFound'

export default { title: 'components/PageNotFound' }

export const Default: StoryFn<PageNotFoundProps> = (args) => <PageNotFound {...args} />

Default.args = {}

Default.argTypes = {}
