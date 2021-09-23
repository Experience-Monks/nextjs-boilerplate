import Image, { Props } from './Image';

export default { title: 'components/Image' };

export const Default = (args: Props) => <Image {...args} />;

Default.args = { imageObj: { file: 'threeLogo.jpeg', alt: '' }, loadingType: undefined };

Default.argTypes = {
  loadingType: {
    options: ['lazy', 'eager'],
    control: { type: 'select' }
  }
};

Default.parameters = {
  jira: {
    id: 'SON-145'
  }
};
