import http from 'http';
import sioClient from 'socket.io-client';
import enableDestroy from 'server-destroy';

import * as Route from '../route/api.server';
import sioServer from '../socket';

jest.unmock('../socket');
jest.mock('../route/api.server');

const startServer = () => {
  const httpServer = http.createServer();
  enableDestroy(httpServer);
  sioServer.attach(httpServer);
  return new Promise((resolve, reject) => {
    httpServer.listen(0, (error) => {
      if (error) { reject(error); }
      resolve({
        server: httpServer,
        url: `ws://localhost:${httpServer.address().port}`
      });
    });
  });
};

const killServer = server => {
  return new Promise(resolve => server.destroy(resolve));
};

describe('socket', () => {
  it('returns a list of routes when a connection is established', () => {
    return startServer().then(({ server, url }) => {
      Route.__setRoutes([ 1, 2 ]);
      const client = sioClient(url);
      return new Promise(resolve => {
        client.on('routes', routes => {
          expect(routes).toEqual([ 1, 2 ]);
          resolve(server);
        });
      });
    }).then(killServer);
  });

  it('re emits all routes when a change occurs', () => {
    return startServer().then(({ server, url }) => {
      const client = sioClient(url);
      client.on('connect', () => {
        // Client is now connected
        // Simulate change so we can check routes are emitted twice
        Route.emit('change');
      });
      return new Promise(resolve => {
        let callCount = 0;
        client.on('routes', routes => {
          callCount++;
          if (callCount === 2) {
            // We're only interested to see if the event is emitted twice
            resolve(server);
          }
        });
      });
    }).then(killServer);
  });
});
