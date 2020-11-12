const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.prod');
const paths = require('./paths.js');

module.exports = merge([
  webpackConfig,
  {
    output: {
      path: paths.appBuildRelease,
      publicPath: paths.publicUrl
    },
    devtool: 'source-map'
  }
]);
