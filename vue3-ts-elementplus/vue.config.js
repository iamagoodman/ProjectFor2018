const autoprefixer = require('autoprefixer');
// const pkg = require('./package.json');
const path = require('path');
// const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  outputDir: 'dist',
  publicPath:
    process.env.NODE_ENV === 'development'
      ? '/'
      : 'https://quntta.could.com/file/',

  css: {
    extract: {
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].css'
    },
    loaderOptions: {
      postcss: {
        plugins: [autoprefixer()]
      },
      scss: {
        additionalData:
          '@import "./src/styles/reset.scss";@import "./src/styles/global.scss";'
      }
    }
  },
  configureWebpack: (config) => {
    // if (process.env.NODE_ENV === 'development') {
    //     config.devtool = 'source-map';
    // } else if (process.env.NODE_ENV === 'production') {
    //     config.devtool = 'none';
    // }
    config.externals = {
      memory: 'memory'
    };
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .options({
        inline: true,
        fallback: false
      })
      .end();

    if (process.env.NODE_ENV === 'production') {
      config
        .mode('production')
        .devtool(false)
        .output.filename('[name].[contenthash:8].js')
        .chunkFilename('[name].[contenthash:8].js');
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('url-loader')
        .loader('file-loader')
        .options({
          name: '[name].[hash:8].[ext]'
        });
      config.module
        .rule('svg')
        .test(/\.(svg)(\?.*)?$/)
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: '[name].[hash:8].[ext]'
        });
    }
  },
  devServer: {
    port: 8080,
    // proxy: 'http://localhost:8000/'
    proxy: {
      '/api': {
        target: 'http://localhost:8090/',
        changeorigin: true,
        pathRewrite: {
          ['^' + '/api']: '' // 将'/my_test_proxy' 重写为''
        }
      }
    }
  }
};
