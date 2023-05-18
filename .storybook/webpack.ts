// Export a function. Accept the base config as the only param.
import path from 'path'
import webpack, { Configuration, RuleSetRule } from 'webpack'

const generatedPath = path.resolve(__dirname, '../.generated')
const introPath = path.resolve(__dirname, './intro')
const srcPath = path.resolve(__dirname, '../src')

export const webpackFinal = async (config: Configuration) => {
  if (config.resolve?.alias) {
    const alias = config.resolve.alias as { [key: string]: string }
    alias['@'] = srcPath
    alias['#'] = generatedPath
  }

  if (config.module?.rules) {
    const rules = config.module.rules as RuleSetRule[]
    rules.forEach((rule) => {
      if ((rule.test as RegExp)?.test('.scss')) rule.exclude = [introPath]
      if ((rule.test as RegExp)?.test('.svg')) rule.exclude = /\.svg$/
    })
    rules.push(
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
      { test: /\.svg$/i, use: ['@svgr/webpack'] }
    )
  }

  config.plugins?.push(new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }))

  // if (process.env.NODE_ENV === 'production') config.output.publicPath = '/storybook/'

  return config
}
