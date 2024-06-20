// Export a function. Accept the base config as the only param.
import type { Configuration, RuleSetRule } from 'webpack'

import path from 'node:path'
import webpack from 'webpack'

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
      if ((rule.test as RegExp)?.test('.svg')) rule.exclude = /\.svg$/iu
    })
    rules.push(
      {
        test: /\.scss$/iu,
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
      { test: /\.svg$/iu, use: ['@svgr/webpack'] },
      { test: /\.(glb|gltf|bin|fbx|hdr|exr|woff2|riv|wasm)$/iu, type: 'asset/resource' },
      { test: /\.(glsl|hlsl|vert|frag)$/iu, type: 'asset/source' }
    )
  }

  config.plugins?.push(new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }))

  return config
}
