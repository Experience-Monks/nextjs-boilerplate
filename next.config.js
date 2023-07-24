/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  output: process.env.OUTPUT,
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
  trailingSlash: true,
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  },
  webpack(config) {
    config.module.rules.push({ test: /\.svg$/i, use: [{ loader: '@svgr/webpack' }] })
    return config
  }
}

const nextPlugins = []

if (process.env.BUNDLE_ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: true })
  nextPlugins.push(withBundleAnalyzer)
}

const finalConfig = nextPlugins.reduce((config, plugin) => {
  if (typeof plugin === 'function') return plugin(config)
  return plugin[0]({ ...config, ...plugin[1] })
}, nextConfig)

module.exports = finalConfig
