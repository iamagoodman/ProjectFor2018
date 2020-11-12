const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const publicPath = '/';
const releasePath = '/td/resources/insurance';
const releaseBuildPath = '/work/tbb-broker-web/core/src/main/resources/static';
const pkg = require('../package.json');
const publicUrl = `${publicPath}${pkg.name}/`;

module.exports = {
  appIndexJs: resolveApp('src/index.tsx'),
  appHtml: resolveApp('public/index.html'),
  appProdHtml: resolveApp('public/index_prod.html'),
  appSrc: resolveApp('src'),
  appPublic: resolveApp('public'),
  appPackageJson: resolveApp('package.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  appTsLint: resolveApp('tslint.json'),
  appNodeModules: resolveApp('node_modules'),
  appBuild: path.join(__dirname, `../dist`),
  appBuildRelease: path.join(releaseBuildPath, `${pkg.name}`),
  publicUrl,
  releasePath,
};
