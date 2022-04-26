const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  publicPath: process.env.PUBLIC_PATH,
  css: {
    extract: {
      filename: 'freePage2/[name].[contenthash:8].css',
      chunkFilename: 'freePage2/[name].[contenthash:8].css',
      ignoreOrder: process.env.NODE_ENV === 'production' ? true : false,
    },
    loaderOptions: {
      less: {
        globalVars: {
          primaryColor: '#1989fa',
          tipColor: '#ee0a24',
          distance: '10px',
        },
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            selectorBlackList: [/-px$/],
          }),
        ],
      },
    },
  },
  configureWebpack: (config) => {
    config.externals = {
      utils: 'utils',
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'dev') {
      config
        .mode('production')
        // .devtool('#source-map')
        .output.filename('freePage2/[name].[contenthash:8].js')
        .chunkFilename('freePage2/[name].[contenthash:8].js')
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('url-loader')
        .loader('file-loader')
        .options({
          name: 'freePage2/[name].[hash:8].[ext]',
        })
      config.module
        .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'freePage2/[name].[hash:8].[ext]',
        })
    }
  },
  devServer: {
    port: 3006,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://test.uequan.net/jc/bxb-broker/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/openapi': {
        target: 'https://test.uequan.net/',
        changeOrigin: true,
        pathRewrite: { '^/openapi': '/openapi' },
      },
    },
  },
}
