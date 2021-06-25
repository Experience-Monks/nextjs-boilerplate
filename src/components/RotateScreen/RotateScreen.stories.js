import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './RotateScreen';

import { device } from '../../utils/detect';

storiesOf('RotateScreen', module).add('Default', () =>
  device.phone ? <Component /> : <p>Please enable mobile device simulator</p>
);
