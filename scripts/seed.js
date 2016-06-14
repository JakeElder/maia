#!/usr/bin/env babel-node

import uuid from 'uuid';
import fs from 'fs';
import * as db from '../src/database';
import * as Route from '../src/route/api.server';

const routes = JSON.parse(fs.readFileSync(process.argv[2]));

db.awaitConnection.then(() => {
  Route.deleteAll().then(() =>
    Promise.all(routes.map(route => Route.create(route)))
  ).then(() => {
    db.client.quit()
    console.log('done');
  });
});
