const { useBabelRc, override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  addWebpackModuleRule({
    test: /\.(tsx|ts)$/,
    exclude: /node_modules/,
    use: [
      { loader: 'babel-loader' },
      {
        loader: '@linaria/webpack-loader',
        options: {
          sourceMap: process.env.NODE_ENV !== 'production',
          cacheDirectory: '.src/.linaria_cache',
        },
      },
    ],
  })
);
