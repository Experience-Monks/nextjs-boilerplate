import { Story } from '@storybook/react';

import PageUnsupported, { PageUnsupportedProps } from './PageUnsupported';

export default { title: 'components/PageUnsupported' };

export const Default: Story<PageUnsupportedProps> = (args) => <PageUnsupported {...args} />;

Default.args = {};

Default.argTypes = {};
