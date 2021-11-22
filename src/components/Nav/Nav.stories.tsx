import Component from './Nav';

export default { title: 'components/Nav' };

export const Default = (args: {}) => <Component {...args} />;

Default.args = {};

Default.argTypes = {};

Default.parameters = {
  jira: {
    id: 'SON-145'
  }
};
