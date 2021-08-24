import { storiesOf } from '@storybook/react';
import Component from './Footer';

storiesOf('Components/Footer', module)
  .addParameters({
    jira: {
      id: 'SON-145'
    }
  })
  .add('Default', () => <Component />);
