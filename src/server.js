import express from 'express';
import { Server } from 'http';

import hi from './hi';
import api from './api';
import socket from './socket';
import * as db from './database';

const app = express();
const server = new Server(app);

app.use('/', hi);
app.use('/api', api);
socket.attach(server);

db.awaitConnection.then(
  () => server.listen(3000, error => {
    if (error) { throw error; }
    console.log('Listening at http://localhost:3000');
  }),
  error => { throw error; }
);
