import React from 'react';
import express from 'express';
import { match, RouterContext } from 'react-router';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import * as Route from 'route-api';
import { routes, reducer } from './app';
import DevTools from './DevTools';
import * as reduxSync from './redux-universal-sync';

const getInitialState = () => {
  const syncedState = reduxSync.getSyncedState();
  return Route.all().then(routes =>
    syncedState ? { ...syncedState, routes } : { routes }
  );
}

const hi = express();

hi.use(reduxSync.expressMiddleware);

hi.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirect, props) => {

    if (error) { return res.status(500).send(error.message); }
    if (!props) { return res.status(404).send('Not Found'); }
      
    getInitialState().then((state) => {
      const store = createStore(
          reducer,
          state,
          compose(applyMiddleware(reduxSync.reduxMiddleware), DevTools.instrument())
      );
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
          <script src="http://localhost:8080/dist/app.js"></script>
        </body>
        </html>
      `);
    });

  });
});

export default hi;
