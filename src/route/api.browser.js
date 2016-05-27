import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import findIndex from 'lodash.findindex';

export function update(id, route) {
  return fetch(`/routes/${id}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(route)
  });
}
