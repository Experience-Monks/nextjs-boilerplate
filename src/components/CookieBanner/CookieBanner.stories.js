import React from 'react';
import { storiesOf } from '@storybook/react';
import CookieBanner from './CookieBanner';

storiesOf('CookieBanner', module)
  .add('Default', () => <CookieBanner onAccept={() => console.log('accept')} onReject={() => console.log('reject')} />)
  .add('With children', () => (
    <CookieBanner onAccept={() => console.log('accept')} onReject={() => console.log('reject')}>
      We use cookies on this website to improve your experience. Learn more on our{' '}
      <a href="https://www.jam3.com/privacy" target="_blank'">
        Privacy Policy
      </a>
      .
    </CookieBanner>
  ));
