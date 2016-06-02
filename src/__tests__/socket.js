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
});
