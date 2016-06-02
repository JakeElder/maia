import sio from 'socket.io';
import * as Route from './route/api.server';

const io = sio();

Route.on('change', () => {
  Route.all().then(routes => io.emit('routes', routes));
});

io.on('connection', socket => {
  Route.all().then(routes => socket.emit('routes', routes));
});

export default io;
