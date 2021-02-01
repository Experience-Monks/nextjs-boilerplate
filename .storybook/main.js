const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js)'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-knobs'],
  presets: [path.resolve(__dirname, './next-preset.js')]
};
