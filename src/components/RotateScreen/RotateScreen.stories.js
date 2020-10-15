import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './RotateScreen';

import detect from '../../utils/detect';

storiesOf('RotateScreen', module).add('Default', () =>
  detect.device.isPhone ? <Component /> : <p>Please enable mobile device simulator</p>
);
