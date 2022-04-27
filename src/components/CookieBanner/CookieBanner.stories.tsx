import { Story } from '@storybook/react';

import CookieBanner, { CookieBannerProps } from './CookieBanner';

export default { title: 'components/CookieBanner' };

export const Default: Story<CookieBannerProps> = (args) => <CookieBanner {...args} />;

Default.args = {};

Default.argTypes = {};
