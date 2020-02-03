const path = require('path');

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.BUILD_ENV || process.env.NODE_ENV}`)
});

// const fetch = require('isomorphic-unfetch');
const withPlugins = require('next-compose-plugins');
const { PHASE_PRODUCTION_BUILD } = require('next-server/constants');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const optimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true'
});

const withOfflineSW = {
  transformManifest: manifest => ['/'].concat(manifest)
};

const withSassConfig = {
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[local]_[hash:base64:5]' // [path]___[local]___[hash:base64:5]
  },
  [PHASE_PRODUCTION_BUILD]: {
    cssLoaderOptions: {
      localIdentName: '[hash:base64:8]'
    }
  }
};

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
  env: {
    WEBSITE_SITE_URL: process.env.WEBSITE_SITE_URL,
    BUNDLE_ANALYZE: process.env.BUNDLE_ANALYZE === 'true',
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    CUSTOM_ENV: process.env.CUSTOM_ENV
  },
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

    return config;
  }
  // // NOTE: remove comment if you need some special handle of static HTML
  // async exportPathMap() {
  // NOTE: code below is to demonstrate how to generate with dynamic pages.
  //       reference https://github.com/zeit/next.js/blob/canary/examples/with-static-export/next.config.js
  // const response = await fetch('URL TO RECEIVE POST LIST');
  // const postList = await response.json();
  // const dynamicPages = postList.reduce(
  //   (dynamicPages, post) =>
  //     Object.assign({}, dynamicPages, {
  //       [`/PAGE_NAME/PAGE_ID`]: { page: '/PAGE_NAME/[PAGE_ID]' }
  //     }),
  //   {}
  // );

  //   const staticPages = {
  //     '/': { page: '/' }
  //   };

  //   // combine the map of dynamicPages with the staticPages
  //   return Object.assign({}, staticPages, dynamicPages);
  // }
};

module.exports = withPlugins(
  [
    [withSass, withSassConfig],
    [withCSS],
    [withFonts],
    [withOffline, withOfflineSW],
    [optimizedImages, optimizedImagesConfig],
    [withBundleAnalyzer]
  ],
  nextJSConfig
);
