import { Story } from '@storybook/react';

import Image, { ImageProps } from './Image';

export default { title: 'components/Image' };

export const Default: Story<ImageProps> = (args) => <Image {...args} />;

Default.args = {
  src: 'three-logo.jpeg',
  alt: '',
  loadingType: undefined
};

Default.argTypes = {
  loadingType: {
    options: ['lazy', 'eager'],
    control: { type: 'select' }
  }
};
