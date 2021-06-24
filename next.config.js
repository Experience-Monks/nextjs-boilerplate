const path = require('path');

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.CI_ENV || process.env.NODE_ENV}`)
});

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const optimizedImagesConfig = {
  inlineImageLimit: 1,
  imagesFolder: 'images',
  imagesName: '[name]-[hash:base64:8].[ext]',
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
  svgo: {
    // enable/disable svgo plugins here
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

const nextJSConfig = {
  trailingSlash: true,
  compress: false, // NOTE: enable this when doing SSR
  productionBrowserSourceMaps: process.env.CI_ENV !== 'prod',
  devIndicators: {
    autoPrerender: false
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  },
  webpack: function (config, options) {
    const moduleSassRule = config.module.rules[2].oneOf.find(
      (rule) => rule.test.toString() === /\.module\.(scss|sass)$/.toString()
    );

    if (moduleSassRule) {
      const cssLoader = moduleSassRule.use.find(({ loader }) => loader.includes('css-loader'));
      if (cssLoader) cssLoader.options.modules.mode = 'local';
    }

    if (options.dev) {
      config.module.rules.push({
        test: /.\/src\/.*\/.*.js$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader'
          }
        ]
      });
    }

    return config;
  }
};

const nextPlugins = [[optimizedImages, optimizedImagesConfig]];
if (process.env.BUNDLE_ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true
  });
  nextPlugins.push(withBundleAnalyzer);
}

module.exports = withPlugins(nextPlugins, nextJSConfig);
