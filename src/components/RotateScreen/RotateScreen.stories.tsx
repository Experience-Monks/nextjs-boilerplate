import { Story } from '@storybook/react';

import RotateScreen, { RotateScreenProps } from './RotateScreen';

export default { title: 'components/RotateScreen' };

export const Default: Story<RotateScreenProps> = (args) => <RotateScreen {...args} />;

Default.args = {};

Default.argTypes = {};
