import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import findIndex from 'lodash.findindex';

const isServer = typeof window === 'undefined';

let data = [{
  'id': 1,
  'name': 'Test route',
  'methods': ['GET', 'POST'],
  'pattern': '/test(.*)',
  'target': 'http://example.com/$1'
}, {
  'id': 2,
  'name': 'Another Test route',
  'methods': ['GET', 'POST', 'PUT', 'DELETE'],
  'pattern': '/test(.*)',
  'target': 'http://another-example.com/$1'
}];

export function all() {
  return Promise.resolve(data);
}

export function update(id, route) {
  if (isServer) {
    data.splice(findIndex(data, { id }), 1, route);
    return Promise.resolve();
  } else {
    return fetch(`/routes/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(route)
    });
  }
}
