import express from 'express';

import hi from './hi';
import api from './api';
import * as db from './database';

const server = express();

server.use('/', hi);
server.use('/api', api);

db.awaitConnection.then(
  () => server.listen(3000, error => {
    if (error) { throw error; }
    console.log('Listening at http://localhost:3000');
  }),
  error => { throw error; }
);
