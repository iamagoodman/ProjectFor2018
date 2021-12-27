const autoprefixer = require('autoprefixer');
// const pkg = require('./package.json');
module.exports = {
    outputDir: 'dist',
    // baseUrl:process.env.NODE_ENV==='production' ?'/' :'/',
    // pages: {
    //
    // },
    publicPath:
        process.env.NODE_ENV === 'development'
            ? '/'
            : `https://portal-static.tongdun.cn/static-public/broker_product/tkbwyl_month/0.0.2/`,

    css: {
        extract: {
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].css'
        },
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer()
                ]
            },
            scss: {
                additionalData: `@import "./src/style/global.scss";`
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
        // proxy:  'https://apitest.tongbb.net/'
        proxy: {
            '/api': {
                target: 'https://apitest.tongbb.net/'
            }
        }
    }
};
