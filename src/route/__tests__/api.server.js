import Promise from 'bluebird';
import omit from 'lodash.omit';
import { ROUTE_QUALIFIER, makeRouteKey, all, create } from '../api.server';
import config from '../../config';
import * as db from '../../database';

jest.unmock('../api.server');
jest.unmock('../../database');

const routes = [{
  id: '4c95e83f-e9e2-4a40-8a14-e6951bf230e1',
  order: 1,
  name: 'Test Route',
  methods: JSON.stringify(['GET', 'POST']),
  pattern: '/test(.*)',
  target: 'http://example.com/$1'
}, {
  id: '11dc3c19-9553-4dd2-9f09-554b51d7c71b',
  order: 2,
  name: 'Another Test Route',
  methods: JSON.stringify(['GET', 'POST', 'PUT', 'DELETE']),
  pattern: '/another-test(.*)',
  target: 'http://another-example.com/$1'
}];

const stringifiedRoutes = routes.map(route =>
  ({ ...route, methods: JSON.stringify(route.methods) }) 
);

const clearRoutes = () => {
  return db.awaitConnection.then(() => {
    return new Promise((resolve, reject) => {
      db.client.keys(`${ROUTE_QUALIFIER}*`, (err, keys) => {
        keys.forEach(key => db.client.del(key, resolve));
      });
    });
  });
};

beforeAll(done => clearRoutes().then(done)); 

describe('all', () => {
  it('returns all routes in the database', () => {
    stringifiedRoutes.forEach((route) => {
      db.client.hmset(makeRouteKey(route.id), route);
    });
    return all().then((retrievedRoutes) => {
      expect(routes).toEqual(retrievedRoutes);
    });
  });
});

describe('create', () => {
  it('adds a new route to the database', () => {
    const route = omit(routes[0], 'id');
    return create(route).then((id) => {
      return new Promise((resolve, reject) => {
        db.client.hgetall(makeRouteKey(id), (err, retrievedRoute) => {
          expect({
            ...retrievedRoute,
            order: parseInt(retrievedRoute.order, 10)
          }).toEqual({ id, ...route });
          resolve();
        });
      });
    });
  });
});

afterAll(() => db.client.quit());
