import React from 'react';
import express from 'express';
import { match, RouterContext } from 'react-router';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { renderToString } from 'react-dom/server';
import { Provider as StoreProvider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import path from 'path';

import * as Route from 'route-api';
import { routes, reducer } from './app';
import InsertCssProvider from './InsertCssProvider';
import * as reduxSync from './redux-universal-sync';
import config from '../config';

const scriptUrl = config.get('env') === 'development' ? 
  'http://localhost:8080/dist/app.js' :
  '/app.js';

const getInitialState = () => {
  const syncedState = reduxSync.getSyncedState();
  return Route.all().then(routes =>
    syncedState ? { ...syncedState, routes } : { routes }
  );
}

const hi = express();

hi.use(reduxSync.expressMiddleware);

if (config.get('env') !== 'development') {
  hi.get('/app.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'client', 'app.js'));
  });
}

hi.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirect, props) => {

    if (error) { return res.status(500).send(error.message); }
    if (!props) { return res.status(404).send('Not Found'); }
      
    getInitialState().then((state) => {
      const store = createStore(
          reducer,
          state,
          compose(applyMiddleware(reduxSync.reduxMiddleware))
      );
      const muiTheme = getMuiTheme({}, {
        userAgent: req.headers['user-agent']
      });
      const appHtml = renderToString(
        <InsertCssProvider isServer={true}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <StoreProvider store={store}>
              <RouterContext {...props} />
            </StoreProvider>
          </MuiThemeProvider>
        </InsertCssProvider>
      );
      res.send(`
        <!doctype html>
        <html>
        <head>
          <title>Maia</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
          <style>${InsertCssProvider.styles.join(' ')}</style>
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script src="${scriptUrl}"></script>
        </body>
        </html>
      `);
    });

  });
});

export default hi;
