import express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { getMuiTheme, MuiThemeProvider } from  'material-ui/styles';
import DevTools from './DevTools';

import app from './app';
import route from './route';

const server = express();

server.get('*', (req, res) => {
  match({ routes: app.routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      route.api.all().then((routes) => {
        try {
          const store = createStore(app.reducer, { routes: routes }, DevTools.instrument());
          const muiTheme = getMuiTheme({}, {
            userAgent: req.headers['user-agent']
          });
          const appHtml = renderToString(
            <MuiThemeProvider muiTheme={muiTheme}>
              <Provider store={store}>
                <RouterContext {...props} />
              </Provider>
            </MuiThemeProvider>
          );
          const jsonState = JSON.stringify(store.getState());
          res.send(`
            <!doctype html>
            <html>
            <head>
              <title>Maia</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
            </head>
            <body>
              <div id="root">${appHtml}</div>
              <script>window.__REDUX_STATE__ = ${jsonState}</script>
              <script src="http://localhost:8080/dist/app.js"></script>
            </body>
            </html>
          `);
        } catch (err) {
          console.error(err);
        }
      });
    } else {
      res.status(404).send('Not Found')
    }
  });
});

server.listen(3000, (err) => {
  if (err) { return console.log(err); }
  console.log('Listening at http://localhost:3000');
});
