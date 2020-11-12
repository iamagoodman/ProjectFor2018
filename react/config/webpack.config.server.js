const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const paths = require('./paths.js');
const pkg = require(paths.appPackageJson);

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module.less$/;
const cssRegex = /\.css$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: require.resolve('style-loader'),
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('autoprefixer')({
            // 添加内核前缀
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8'],
          }),
          require('postcss-discard-duplicates')(), // 去除css中的重复规则
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: true,
      },
    },
  ];
  if (preProcessor) {
    if (typeof preProcessor === 'string') {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      });
    } else {
      loaders.push({
        loader: require.resolve(preProcessor.loader),
        options: Object.assign(preProcessor.options, { sourceMap: true }),
      });
    }
  }
  loaders.push({
    loader: require.resolve('sass-resources-loader'),
    options: {
      resources: [path.resolve(__dirname, '../src/styles/variables.less')],
    },
  });
  return loaders;
};

module.exports = {
  mode: 'development',
  entry: {
    [pkg.name]: ['webpack-hot-middleware/client?noInfo=true&reload=true', paths.appIndexJs],
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: function(module) {
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
            );
          },
          name: 'vendor',
          priority: 1,
        },
        common: {
          chunks: 'async',
          name: 'common',
          test: function(module) {
            if (
              module.resource &&
              (/\.less$/.test(module.resource) || /\.css$/.test(module.resource))
            ) {
              return false;
            }
            return true;
          },
          minChunks: 2,
          priority: -1,
          reuseExistingChunk: true,
        },
        style: {
          chunks: 'all',
          name: 'style',
          test: /\.(?:le|c)ss$/,
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules, paths.appSrc],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfig })],
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'source-map-loader',
        enforce: 'pre',
        include: paths.appSrc,
      },
      {
        oneOf: [
          {
            test: cssRegex,
            use: getStyleLoaders({
              importLoaders: 2,
            }),
          },
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
              },
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true,
                },
              },
            ),
          },
          {
            test: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true,
              },
              'less-loader',
            ),
          },
          {
            test: /\.jsx?/,
            include: paths.appSrc,
            loader: 'babel-loader',
            options: {
              compact: true,
            },
          },
          {
            test: /\.tsx?$/,
            include: paths.appSrc,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  getCustomTransformers: () => ({
                    before: [
                      tsImportPluginFactory({
                        libraryDirectory: 'es',
                        libraryName: 'antd',
                        style: true,
                      }),
                    ],
                  }),
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.json$/,
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: paths.appSrc,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint,
    }),
  ],
};
