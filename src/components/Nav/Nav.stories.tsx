import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './Nav';

storiesOf('Nav', module).add('default', () => {
  return <Component />;
});
