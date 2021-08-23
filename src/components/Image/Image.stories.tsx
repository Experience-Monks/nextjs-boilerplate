import { storiesOf } from '@storybook/react';
import Component from './Image';

storiesOf('Components/Image', module).add('Default', () => (
  <Component imageObj={{ file: 'threeLogo.jpeg', alt: '' }} />
));
