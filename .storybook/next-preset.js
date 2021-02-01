// Export a function. Accept the base config as the only param.
const path = require('path');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])]
      }
    };

    const fileLoaderRule = newConfig.module.rules.find((rule) => rule.test.test('.svg'));
    fileLoaderRule.exclude = /src\/.*\.svg$/;

    newConfig.resolve.modules.push(srcPath);

    newConfig.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent
            }
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: ['src/styles']
            }
          }
        }
      ]
    });

    newConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // Return the altered config
    return newConfig;
  }
};
