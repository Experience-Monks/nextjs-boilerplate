// Export a function. Accept the base config as the only param.
const path = require('path');
const webpack = require('webpack');

const introPath = path.resolve(__dirname, './intro');
const srcPath = path.resolve(__dirname, '../src');

module.exports.webpackFinal = async (config) => {
  config.resolve.alias['@'] = srcPath;

  const sassRule = config.module.rules.find((rule) => rule.test.test('.scss'));
  sassRule.exclude = [introPath];

  const imageRule = config.module.rules.find((rule) => rule.test.test('.svg'));
  imageRule.exclude = /\.svg$/;

  config.module.rules.push(
    {
      test: /\.scss$/,
      include: introPath,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { url: true, importLoaders: 1, modules: { mode: 'local' } } },
        {
          loader: 'sass-loader',
          options: { implementation: require('sass'), sassOptions: { includePaths: ['src/styles'] } }
        }
      ]
    },
    { test: /\.svg$/, use: [{ loader: '@svgr/webpack' }] }
  );

  config.plugins.push(new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }));

  if (process.env.NODE_ENV === 'production') {
    newConfig.output.publicPath = '/storybook/';
  }

  return config;
};

module.exports.managerWebpack = async (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.output.publicPath = '/storybook/';
  }
  return config;
};
