const { fixBabelImports, override } = require('customize-cra');

const isDev = process.env.REACT_APP_ENV === 'development';

module.exports = override(
  isDev && addBabelPlugin('react-hot-loader/babel'),
  isDev && addWebpackAlias({ 'react-dom': '@hot-loader/react-dom' }),
  fixBabelImports('core', {
    libraryName: '@material-ui/core',
    libraryDirectory: 'esm',
    camel2DashComponentName: false,
  }),
  fixBabelImports('icons', {
    libraryName: '@material-ui/icons',
    libraryDirectory: 'esm',
    camel2DashComponentName: false,
  }),
);
