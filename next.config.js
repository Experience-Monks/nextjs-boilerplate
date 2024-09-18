/** @type {import('next').NextConfig} */

const path = require('node:path')
const withVideos = require('next-videos')

const nextConfig = {
  output: process.env.OUTPUT,
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
  trailingSlash: true,
  reactStrictMode: false,
  sassOptions: { includePaths: [path.join(__dirname, 'src/styles')] },
  webpack(config) {
    config.module.rules.push(
      { test: /\.svg$/iu, use: [{ loader: '@svgr/webpack' }] },
      { test: /\.(glb|gltf|bin|fbx|hdr|exr|woff2|riv|wasm)$/iu, type: 'asset/resource' },
      { test: /\.(glsl|hlsl|vert|frag)$/iu, type: 'asset/source' }
    )
    return config
  }
}

const nextPlugins = [withVideos]

if (process.env.BUNDLE_ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: true })
  nextPlugins.push(withBundleAnalyzer)
}

const finalConfig = nextPlugins.reduce((config, plugin) => {
  if (typeof plugin === 'function') return plugin(config)
  return plugin[0]({ ...config, ...plugin[1] })
}, nextConfig)

module.exports = finalConfig
