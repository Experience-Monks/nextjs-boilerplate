import { Story } from '@storybook/react';

import BaseButton, { BaseButtonProps } from './BaseButton';

export default { title: 'components/BaseButton' };

export const Button: Story<BaseButtonProps> = (args) => (
  <BaseButton {...args}>
    <span>I&apos;m a button since I don&apos;t have an href prop</span>
  </BaseButton>
);

export const Link: Story<BaseButtonProps> = (args) => (
  <BaseButton {...args} href="/">
    I&apos;m a link cause I have an href prop!
    <br />
    Next.js routing navigation
    <br />
    will happen automatically.
    <br />
    If the href starts with &quot;/&quot;.
  </BaseButton>
);
