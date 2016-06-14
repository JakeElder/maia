#!/usr/bin/env babel-node

import uuid from 'uuid';
import fs from 'fs';
import * as db from '../src/database';
import * as Route from '../src/route/api.server';
import * as Tag from '../src/tag/api.server';

const routes = JSON.parse(fs.readFileSync(process.argv[2]));

db.awaitConnection.then(() => {
  // Tag.create({ name: 'Just Cause' });
  // Tag.create({ name: 'Triad Wars' });
  // Tag.create({ name: 'Hitman' });
  // Tag.create({ name: 'Preprod' });
  // Tag.create({ name: 'Stage' });
  // Tag.create({ name: 'Production' });
  // Tag.create({ name: 'Augaware' });
  // Tag.create({ name: 'Tomb Raider' });

  Route.deleteAll().then(() =>
    Promise.all(routes.map(route => Route.create(route)))
  ).then(() => {
    db.client.quit()
    console.log('done');
  });
});
