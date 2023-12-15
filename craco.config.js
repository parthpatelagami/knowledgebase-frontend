const path = require('path')
const webpack = require('webpack')
const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco")

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ['node_modules', 'src/assets']
        }
      }
    },
    postcss: {
      plugins: [require('postcss-rtl')()]
    }
  },
  eslint: {
    enable: true /* (default value) */,
    mode: "extends" /* (default value) */ || "file",
    configure: { /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */ },
    configure: (eslintConfig, { env, paths }) => { return eslintConfig },
    pluginOptions: { /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */ },
    pluginOptions: (eslintOptions, { env, paths }) => { return eslintOptions }
  },
  babel: {
    presets: [],
    plugins: [],
    loaderOptions: { /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */ },
    loaderOptions: (babelLoaderOptions, { env, paths }) => { return babelLoaderOptions }
  },
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/@core/assets'),
      '@components': path.resolve(__dirname, 'src/@core/components'),
      '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@styles': path.resolve(__dirname, 'src/@core/scss'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@utils': path.resolve(__dirname, 'src/utility/Utils'),
      '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
      '@constants': path.resolve(__dirname, 'src/utility/Constants')
    },
    configure: {
      resolve: {
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          buffer: require.resolve('buffer'),
          util: require.resolve('util')
        },
      },
    },
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          process: 'process/browser.js',
        })
      ]
    },
  }
}
