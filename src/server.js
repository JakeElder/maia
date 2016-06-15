import express from 'express';
import { Server } from 'http';

import hi from './hi';
import api from './api';
import socket from './socket';
import * as db from './database';

import fs from 'fs';
import path from 'path';
import * as Route from 'route-api';
import * as Tag from 'tag-api';
import routes from 'json!../seed.json';

const app = express();
const server = new Server(app);

app.use('/', hi);
app.use('/api', api);
socket.attach(server);

const maybeSeedAllTheThings = () => {
  if (process.env.SEED_ALL_THE_THINGS !== 'true') { return Promise.resolve(); }

  return Promise.all([
    Tag.create({ name: 'Just Cause', id: '63788d4a-c628-401d-9029-a53bb5a0f245' }),
    Tag.create({ name: 'Triad Wars', id: 'ae9a286f-4a7c-49c4-8ce9-7de5d6ba5c59' }),
    Tag.create({ name: 'Hitman', id: '99ed03c6-1a56-4e9a-95c4-fb8d9aad8543' }),
    Tag.create({ name: 'Preprod', id: 'b5135a80-41cf-4ba5-b58e-f22f73627446' }),
    Tag.create({ name: 'Stage', id: '55f0e41b-da6f-4751-8bab-c15708b46894' }),
    Tag.create({ name: 'Augaware', id: '79461030-dacf-4138-b1f8-ed3c058178c2' }),
    Tag.create({ name: 'Tomb Raider', id: '7ae01bfd-21c0-4d1a-8a34-44d5c10aea10' })
  ])
  .then(() => Route.deleteAll())
  .then(() => Promise.all(routes.map(route => Route.create(route))))
  .then(() => console.log('seeded'));
}

db.awaitConnection
  .then(maybeSeedAllTheThings)
  .then(
    () => {
      server.listen(3000, error => {
        if (error) { throw error; }
        console.log('Listening at http://localhost:3000');
      })
    },
    error => { throw error; }
  );
