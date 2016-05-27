import uuid from 'uuid';
import * as db from '../src/database';

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

db.awaitConnection.then(() => {
  db.client.keys('*', (err, keys) => {
    keys.forEach(key => db.client.del(key));
  })
  routes.forEach((route) => {
    db.client.hmset(`maia:routes:${route.id}`, route);
  });
  console.log('done');
  db.client.quit();
});
