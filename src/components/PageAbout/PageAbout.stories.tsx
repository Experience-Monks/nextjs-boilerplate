import { Story } from '@storybook/react';

import PageAbout, { PageAboutProps } from './PageAbout';

export default { title: 'components/PageAbout' };

export const Default: Story<PageAboutProps> = (args) => <PageAbout {...args} />;

Default.args = {};

Default.argTypes = {};
