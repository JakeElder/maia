import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../config/webpack.config.dev';

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Maia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="root"></div>
        <script src="/dist/default.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, (err) => {
  if (err) { return console.log(err); }
  console.log('Listening at http://localhost:3000');
});

