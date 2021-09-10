import { storiesOf } from '@storybook/react';
import { device } from '@jam3/detect';
import Component from './RotateScreen';

storiesOf('Components/RotateScreen', module).add('Default', () =>
  device.phone ? <Component /> : <p>Please enable mobile device simulator</p>
);
