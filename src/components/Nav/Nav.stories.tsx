import { Story } from '@storybook/react';

import Nav, { NavProps } from './Nav';

export default { title: 'components/Nav' };

export const Default: Story<NavProps> = (args) => <Nav {...args} />;

Default.args = {};

Default.argTypes = {};
