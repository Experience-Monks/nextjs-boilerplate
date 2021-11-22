import { device } from '@jam3/detect';
import Component, { Props } from './RotateScreen';

export default { title: 'components/RotateScreen' };

export const Default = (args: Props) =>
  device.phone ? <Component {...args} /> : <p>Please enable mobile device simulator</p>;

Default.args = {};

Default.argTypes = {};

Default.parameters = {
  jira: {
    id: 'SON-145'
  }
};
