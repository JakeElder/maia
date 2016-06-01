import fetch from 'isomorphic-fetch';

export const create = route => fetch('/route', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(route)
}).then(res => res.json()).then(res => res.id);

export const update = (id, route) => fetch(`/routes/${id}`, {
  method: 'put',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(route)
});
