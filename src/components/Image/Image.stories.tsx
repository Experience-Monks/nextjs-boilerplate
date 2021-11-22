import Image, { Props } from './Image';

export default { title: 'components/Image' };

export const Default = (args: Props) => <Image src={args.src} alt={args.alt} loadingType={args.loadingType} />;

Default.args = { src: 'three-logo.jpeg', alt: '', loadingType: undefined };

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
