const path = require('path');
const welcomeStory = '../src/components/storybook/Intro.stories.mdx';

module.exports = {
  core: {
    builder: 'webpack5'
  },
  typescript: {
    reactDocgen: false
  },
  stories: [welcomeStory, '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook-addon-next-router'
    // 'storybook-jira-addon', TODO: // add this addon later on - currently is breaking the storybook build
  ],
  presets: [path.resolve(__dirname, './next-preset.js')]
};
