import path from 'path';
import webpack from 'webpack';
import config from './config';

const base = {
  entry: [
    path.resolve(__dirname, 'src', 'client')
  ],
  output: {
    path: path.resolve(__dirname, 'dist', 'client'),
    filename: 'app.js',
    publicPath: 'http://localhost:8080/dist/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.resolve(__dirname, 'src')
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
      'route-api': path.resolve(__dirname, 'src', 'route', 'api.browser')
    }
  }
};

const develop = {
  ...base,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    ...base.entry
  ],
  devServer: {
    hot: true,
    noInfo: true,
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  debug: true
};

const build = {
  ...base
};

const STRATEGY = config.get('env') === 'development' ? 'develop' : 'build';

export default STRATEGY === 'develop' ? develop : build;
