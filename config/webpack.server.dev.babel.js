import path from 'path';
import webpack from 'webpack';
import externals from 'webpack-node-externals';

export default {
  devtool: 'source-map',
  target: 'node',
  entry: [
    'webpack/hot/poll?1000',
    path.resolve(__dirname, '..', 'src', 'server')
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'server'),
    filename: 'server.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, '..', 'src'),
      ],
      loader: 'babel'
    }, {
      test: /\.css$/,
      loaders: [
        'isomorphic-style',
        'css?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]'
      ]
    }]
  },
  externals: externals({ whitelist: ['webpack/hot/poll?1000'] }),
  node: {
    __dirname: true
  },
  resolve: {
    alias: {
      'route-api': path.resolve(__dirname, '..', 'src', 'route', 'api.server')
    }
  }
};

