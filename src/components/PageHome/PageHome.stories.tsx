import { Story } from '@storybook/react';

import PageHome, { PageHomeProps } from './PageHome';

export default { title: 'components/PageHome' };

export const Default: Story<PageHomeProps> = (args) => <PageHome {...args} />;

Default.args = {};

Default.argTypes = {};
