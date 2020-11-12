// const Koa = require('koa');
// const static = require('koa-static');
const path = require('path');
const webpack = require('webpack');
const PassThrough = require('stream').PassThrough;
// const proxy = require('koa-server-http-proxy');
const express = require('express');
const proxy = require('http-proxy-middleware');
const ejs = require('ejs');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../config/webpack.config.server.js');
const paths = require('../config/paths.js');

const port = parseInt(process.env.PORT, 10) || 8000;

// const app = new Koa();
const app = express();

const complier = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(complier, {
  publicPath: webpackConfig.output.publicPath,
});

const hotMiddleware = webpackHotMiddleware(complier, {});

app.use(devMiddleware);
app.use(hotMiddleware);

// const devMiddleware = (c, opts) => {
//     const middleware = webpackDevMiddleware(c, opts);
//     return async (ctx, next) => {
//         await middleware(ctx.req, {
//             end: content => {
//                 ctx.body = content;
//             },
//             setHeader: (name, value) => {
//                 ctx.set(name, value);
//             }
//         }, next);
//     }
// }

// const hotMiddleware = (c, opts) => {
//     const middleware = webpackHotMiddleware(c, opts);
//     return async (ctx, next) => {
//         const stream = new PassThrough();
//         ctx.body = stream;
//         await middleware(ctx.req, {
//             write: stream.write.bind(stream),
//             writeHead: (status, headers) => {
//                 ctx.status = status;
//                 ctx.set(headers);
//             }
//         }, next)
//     }
// }

// app.use(devMiddleware(complier, {}));
// app.use(hotMiddleware(complier, {}));

const proxyPath = require(paths.appPackageJson).proxy;
if (proxyPath) {
  app.use(
    '/',
    proxy({
      target: proxyPath,
    }),
  );
}

const readFile = (fs, name) => {
  return fs.readFileSync(path.join(webpackConfig.output.path, name), 'utf-8');
};

app.get('*', (req, res, next) => {
  const html = readFile(devMiddleware.fileSystem, 'index.html');
  res.send(html);
});

app.listen(port, function() {
  console.log('listening');
});
