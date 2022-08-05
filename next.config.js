const path = require('path');
const optimizedImages = require('next-optimized-images');

/**
 * @type {import('next').NextConfig}
 */
const nextJSConfig = {
  trailingSlash: true,
  compress: false, // NOTE: enable this when doing SSR
  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production',
  images: {
    loader: 'custom',
    disableStaticImages: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  },
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
  },
  webpack: function (config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack'
        }
      ]
    });

    return config;
  }
};

const optimizedImagesConfig = {
  inlineImageLimit: 1,
  imagesName: '[name]-[hash].[ext]',
  handleImages: ['jpeg', 'png', 'webp', 'gif'],
  optimizeImages: process.env.OPTIMIZE_IMAGES === 'true',
  optimizeImagesInDev: process.env.OPTIMIZE_IMAGES === 'true',
  mozjpeg: {
    quality: 85
  },
  optipng: {
    optimizationLevel: 3
  },
  pngquant: false,
  gifsicle: {
    interlaced: true,
    optimizationLevel: 3
  },
  webp: {
    preset: 'default',
    quality: 85
  },
  // if using sizes attr, optimization goes through `responsive-loader` using `sharp`
  responsive: {
    disable: process.env.OPTIMIZE_IMAGES !== 'true',
    adapter: require('responsive-loader/sharp'),
    quality: 85
  }
};

module.exports = (phase, { defaultConfig }) => {
  const nextPlugins = [];

  if (process.env.BUNDLE_ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer');

    nextPlugins.push(
      withBundleAnalyzer({
        enabled: true
      })
    );
  }

  return nextPlugins.reduce((acc, next) => next(acc), optimizedImages({ ...optimizedImagesConfig, ...nextJSConfig }));
};
