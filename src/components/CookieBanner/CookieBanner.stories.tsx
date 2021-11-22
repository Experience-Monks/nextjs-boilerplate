import CookieBanner, { Props } from './CookieBanner';

export default { title: 'components/CookieBanner' };

export const Default = (args: Props) => <CookieBanner {...args} />;

Default.args = { onAccept: () => console.log('accept'), onReject: () => console.log('reject') };

Default.argTypes = {};

Default.parameters = {
  jira: {
    id: 'SON-145'
  }
};

export const WithChildren = (args: Props) => (
  <CookieBanner {...args}>
    We use cookies on this website to improve your experience. Learn more on our{' '}
    <a href="https://www.jam3.com/privacy" target="_blank'">
      Privacy Policy
    </a>
    .
  </CookieBanner>
);

WithChildren.args = { onAccept: () => console.log('accept'), onReject: () => console.log('reject') };

WithChildren.argTypes = {};

WithChildren.parameters = {
  jira: {
    id: 'SON-145'
  }
};
