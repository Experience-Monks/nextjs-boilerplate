const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
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
              localIdentName: '[local]_[hash:base64:5]',
              context: path.resolve(__dirname, 'src'),
              hashPrefix: 'jam3'
            }
          }
        },
        require.resolve('sass-loader')
      ]
    });

    // Return the altered config
    return config;
  }
};
