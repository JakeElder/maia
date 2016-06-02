import sio from 'socket.io';
import * as Route from './route/api.server';

const io = sio();

io.on('connection', socket =>
  Route.all().then(routes => socket.emit('routes', routes))
);

export default io;
