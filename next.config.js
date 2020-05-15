const path = require('path');

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.BUILD_ENV || process.env.NODE_ENV}`)
});

const withPlugins = require('next-compose-plugins');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const optimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
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
  exportTrailingSlash: true,
  // compress: true, // NOTE: enable this when doing SSR
  devIndicators: {
    autoPrerender: false
  },
  experimental: {
    modern: true
  },
  webpack: function(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: `@svgr/webpack`,
          options: {
            prettier: true,
            svgo: true,
            svgoConfig: {
              removeViewBox: true,
              cleanupIDs: true
            }
          }
        },
        'url-loader'
      ]
    });

    if (config.mode === 'production') {
      if (Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer.push(
          new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }]
            }
          })
        );
      }
    }

    return config;
  }
};

module.exports = withPlugins(
  [[withFonts], [optimizedImages, optimizedImagesConfig], [withBundleAnalyzer]],
  nextJSConfig
);
