import path from 'path';
import webpack from 'webpack';
import externals from 'webpack-node-externals';
import config from './config';

const base = {
  target: 'node',
  entry: [
    path.resolve(__dirname, 'src', 'server')
  ],
  output: {
    path: path.resolve(__dirname, 'dist', 'server'),
    filename: 'server.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'config')
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
  node: {
    __dirname: true
  },
  resolve: {
    alias: {
      'route-api': path.resolve(__dirname, 'src', 'route', 'api.server')
    }
  }
};

const develop = {
  ...base,
  devtool: 'source-map',
  entry: [
    'webpack/hot/poll?1000',
    ...base.entry,
  ],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: externals({ whitelist: ['webpack/hot/poll?1000'] })
};

const build = {
  ...base,
  externals: externals()
};

const STRATEGY = config.get('env') === 'development' ? 'develop' : 'build';

export default STRATEGY === 'develop' ? develop : build;
