/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  sassOptions: { includePaths: [path.join(__dirname, 'src/styles')] },
  webpack(config) {
    config.module.rules.push({ test: /\.svg$/i, use: [{ loader: '@svgr/webpack' }] })
    return config
  }
}

module.exports = nextConfig
