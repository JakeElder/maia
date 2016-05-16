import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/default'
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'default.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.resolve(__dirname, '..', 'src')
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  }
};
