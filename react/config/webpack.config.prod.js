const webpack = require('webpack');
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const paths = require('./paths.js');
const pkg = require(paths.appPackageJson);

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module.less$/;
const cssRegex = /\.css$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('autoprefixer')({
            // 添加内核前缀
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
          }),
          require('postcss-discard-duplicates')(), // 去除css中的重复规则
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
          })
        ],
        sourceMap: true
      }
    }
  ];
  if (preProcessor) {
    if (typeof preProcessor === 'string') {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true
        }
      });
    } else {
      loaders.push({
        loader: require.resolve(preProcessor.loader),
        options: Object.assign(preProcessor.options, { sourceMap: true })
      });
    }
  }
  loaders.push({
    loader: require.resolve('sass-resources-loader'),
    options: {
      resources: [path.resolve(__dirname, '../src/styles/variables.less')]
    }
  });
  return loaders;
};

module.exports = {
  mode: 'production',
  entry: {
    [pkg.name]: paths.appIndexJs
  },
  output: {
    path: paths.appBuild,
    // filename: '[name].[chunkhash:8].js',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          safe: true,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: /\/node_modules\//,
          name: 'vendor',
          filename: '[name].js',
          priority: -10
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        style: {
          name: 'style',
          test: /\.(?:le|c)ss$/,
          enforce: true
        }
      }
    }
    // runtimeChunk: {
    //     name: 'manifest'
    // }
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules, paths.appSrc],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfig })]
  },
  // devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: cssRegex,
        use: getStyleLoaders({
          importLoaders: 2
        })
      },
      {
        test: /\.jsx?/,
        loader: 'source-map-loader',
        enforce: 'pre',
        include: paths.appSrc
      },
      {
        oneOf: [
          {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2
              },
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true
                }
              }
            )
          },
          {
            test: lessModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true
              },
              'less-loader'
            )
          },
          {
            test: /\.jsx?/,
            include: paths.appSrc,
            loader: 'babel-loader',
            options: {
              compact: true,
              presets: [
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    loose: true,
                    modules: false
                  }
                ]
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ['@babel/plugin-transform-runtime', { corejs: false }],
                '@babel/plugin-transform-object-assign',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-syntax-dynamic-import'
              ]
            }
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
                        style: true
                      })
                    ]
                  })
                }
              }
            ]
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
              name: 'assets/img/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.json$/,
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new HtmlWebpackPlugin({
    //     template: paths.appHtml
    // }),
    // new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: paths.appSrc,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint
    }),
    new MiniCssExtractPlugin({
      // filename: '[name].[contenthash:8].css',
      filename: '[name].css'
    }),

    new CleanWebpackPlugin()
    // new BundleAnalyzerPlugin()
  ]
};
