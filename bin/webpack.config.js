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
    }]
  },
  output: {
    library: ['shoutem', 'sdk'],
    libraryTarget: 'var',
    path: path.resolve('./build/script'),
    filename: 'lib.js',
    publicPath: '/server/build/script',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [
   /*new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
    }),*/
  ],
  devtool: 'eval-source-map'
};