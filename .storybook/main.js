const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js)'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-knobs'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      loaders: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: {
              mode: 'local',
              localIdentName: '[local]',
              context: path.resolve(__dirname, 'src')
            }
          }
        },
        require.resolve('sass-loader')
      ]
    });

    return config;
  }
};
