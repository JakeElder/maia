import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    noInfo: true,
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '..', 'src', 'client')
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'app.js',
    publicPath: 'http://localhost:8080/dist/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.resolve(__dirname, '..', 'src')
    }, {
      test: /\.css$/,
      loaders: [
        'isomorphic-style',
        'css?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]'
      ]
    }]
  },
  resolve: {
    alias: {
      'route-api': path.resolve(__dirname, '..', 'src', 'route', 'api.browser')
    }
  },
  debug: true
};
