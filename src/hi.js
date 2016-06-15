import React from 'react';
import Promise from 'bluebird';
import express from 'express';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import path from 'path';

import * as Route from 'route-api';
import * as Tag from 'tag-api';
import { routes, reducer } from './app';
import { UNTAGGED, TAGGED_WITH } from './group/constants';
import ContextProvider from './ContextProvider';
import config from '../config';

const scriptUrl = config.get('env') === 'development' ? 
  'http://localhost:8080/dist/app.js' :
  '/app.js';

const hi = express();

if (config.get('env') !== 'development') {
  hi.get('/app.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'client', 'app.js'));
  });
}

hi.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirect, props) => {

    if (error) { return res.status(500).send(error.message); }
    if (!props) { return res.status(404).send('Not Found'); }
      
    Promise.all([Route.all(), Tag.all()]).spread((routes, tags) => {
      const state = {
        routes,
        tags,
        groups: [
          { id: 'untagged', name: 'Untagged', type: UNTAGGED, showMembers: true },
          ...tags.map(tag => ({ ...tag, type: TAGGED_WITH, showMembers: true }))
        ]
      }
      const store = createStore(reducer, state);
      const ua = req.headers['user-agent'];
      const appHtml = renderToString(
        <ContextProvider isServer={true} store={store} userAgent={ua}>
          <RouterContext {...props} />
        </ContextProvider>
      );

      res.send(`
        <!doctype html>
        <html>
        <head>
          <title>Maia</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
          <style>${ContextProvider.styles.join(' ')}</style>
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script>window.__REDUX_STATE__ = ${JSON.stringify(store.getState())}</script>
          <script src="${scriptUrl}"></script>
        </body>
        </html>
      `);
    });

  });
});

export default hi;
