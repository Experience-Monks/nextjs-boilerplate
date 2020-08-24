const path = require('path');

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.BUILD_ENV || process.env.NODE_ENV}`)
});

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true'
});

const optimizedImagesConfig = {
  inlineImageLimit: 1,
  imagesFolder: 'images',
  imagesName: '[name]-[hash:base64:8].[ext]',
  handleImages: ['jpeg', 'png', 'webp', 'gif'],
  optimizeImages: true,
  optimizeImagesInDev: false,
  mozjpeg: {
    quality: 80
  },
  optipng: {
    optimizationLevel: 3
  },
  pngquant: false,
  gifsicle: {
    interlaced: true,
    optimizationLevel: 3
  },
  svgo: {
    // enable/disable svgo plugins here
  },
  webp: {
    preset: 'default',
    quality: 75
  }
};

const nextJSConfig = {
  trailingSlash: true,
  compress: false, // NOTE: enable this when doing SSR
  devIndicators: {
    autoPrerender: false
  },
  experimental: {
    modern: true
  },
  webpack: function (config, options) {
    return config;
  }
};

module.exports = withPlugins([[optimizedImages, optimizedImagesConfig], [withBundleAnalyzer]], nextJSConfig);
