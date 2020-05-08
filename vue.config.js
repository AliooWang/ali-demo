/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
// const mockMiddleware = require('quick-mock-middleware')

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '//red-wine.wonmore.com/'
  //   : '/',
  publicPath: './',
  lintOnSave: process.env.NODE_ENV !== 'production' ? true : 'error',
  assetsDir: '.',
  productionSourceMap: process.env.sm === '1',
  crossorigin: 'anonymous',
  devServer: {
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/scss/_variables.scss')
      ]
    }
  },
  configureWebpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      scss: path.resolve(__dirname, 'src/scss'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      lib: path.resolve(__dirname, 'src/lib')
    }
  },
  // chainWebpack: config => {
  //   config.module.rule('eslint').use('eslint-loader').tap(option => {
  //     // option.emitWarning = true
  //     option.failOnError = true
  //     option.failOnWarning = true
  //     return option
  //   })
  // }
}
