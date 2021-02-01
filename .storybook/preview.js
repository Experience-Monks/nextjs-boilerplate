import '../src/styles/global.scss';

import { withNextRouter } from 'storybook-addon-next-router';
import { addDecorator } from '@storybook/react';

addDecorator(withNextRouter());
