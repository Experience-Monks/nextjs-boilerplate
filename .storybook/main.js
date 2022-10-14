const { webpackFinal, managerWebpack } = require('./webpack');

module.exports = {
  core: { builder: 'webpack5' },
  typescript: { reactDocgen: false },
  stories: ['./**/*.stories.@(js|jsx|ts|tsx|mdx)', '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook-addon-next',
    {
      name: '@storybook/addon-docs',
      options: { transcludeMarkdown: true }
    }
  ],
  staticDirs: ['../', '../public'],
  webpackFinal,
  managerWebpack
};
