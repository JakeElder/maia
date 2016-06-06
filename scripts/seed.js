import uuid from 'uuid';
import * as db from '../src/database';
import * as Route from '../src/route/api.server';

const routes = [{
  id: '4c95e83f-e9e2-4a40-8a14-e6951bf230e1',
  order: 0,
  name: 'Test Route',
  methods: JSON.stringify(['GET', 'POST']),
  pattern: '/test(.*)',
  target: 'http://example.com/$1'
}, {
  id: '11dc3c19-9553-4dd2-9f09-554b51d7c71b',
  order: 1,
  name: 'Another Test Route',
  methods: JSON.stringify(['GET', 'POST', 'PUT', 'DELETE']),
  pattern: '/another-test(.*)',
  target: 'http://another-example.com/$1'
}, {
  id: 'c5c3ace7-97a9-4431-98b7-8e7d42cc1b32',
  order: 2,
  name: 'Some Website Feature',
  methods: JSON.stringify(['PUT', 'DELETE']),
  pattern: '/some-endpoint(.*)',
  target: 'http://stuffs.com/api/$1'
}, {
  id: 'eeabf846-b641-4cb6-a40c-c4936a0dd4ba',
  order: 3,
  name: 'Data for a thing',
  methods: JSON.stringify(['PUT', 'GET']),
  pattern: '/place(.*)',
  target: 'http://micro-service.com/api/$1'
}];

db.awaitConnection.then(() => {
  Route.deleteAll().then(() =>
    Promise.all(routes.map(route => Route.create(route)))
  ).then(() => {
    db.client.quit()
    console.log('done');
  });
});
