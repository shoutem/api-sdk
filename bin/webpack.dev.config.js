var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js',
  ],
  module: {
    loaders: [{
      test: /\.(js)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  output: {
    library: ['shoutem', 'api'],
    libraryTarget: 'var',
    path: path.resolve('./build/script'),
    filename: 'lib.js',
    publicPath: '/server/build/script',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
  },
  devtool: 'eval-source-map',
};
