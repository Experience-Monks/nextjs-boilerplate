import { Story } from '@storybook/react';

import Footer, { FooterProps } from './Footer';

export default { title: 'components/Footer' };

export const Default: Story<FooterProps> = (args) => <Footer {...args} />;

Default.args = {};

Default.argTypes = {};
