import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import findIndex from 'lodash.findindex';
import sortBy from 'lodash.sortby';
import uuid from 'uuid';
import EventEmitter from 'events';
import bindAll from 'lodash.bindall';

import { client as redis } from '../database';
import config from '../../config'

export const ROUTE_QUALIFIER = `${config.get('db:name')}:routes:`;
export const makeRouteKey = routeId => `${ROUTE_QUALIFIER}${routeId}`;

const pubsub = bindAll(new EventEmitter(), ['on', 'emit']);
export const on = pubsub.on;
export const emit = pubsub.emit;

export function all() {
  return redis.keysAsync(`${ROUTE_QUALIFIER}*`).then(keys =>
    Promise.all(keys.map(key => redis.hgetallAsync(key)))
  ).then(routes => {
    routes = routes.map(route => ({
      ...route,
      order: parseInt(route.order, 10),
      methods: JSON.parse(route.methods || '[]')
    }));
    return sortBy(routes, 'order');
  });
}

export function first() {
  return all().then(routes => routes[0]);
}

export function create(route) {
  return new Promise((resolve, reject) => {
    const id = uuid.v4();
    route.methods = JSON.stringify(route.methods || []);
    redis.hmset(makeRouteKey(id), { ...route, id, order: -1 }, (err, route) => {
      if (err) { return reject(err); }
      reorder().then(
        () => { resolve(id); emit('change') },
        reject
      );
    });
  })
}

export function update(id, route, silent = false) {
  return new Promise((resolve, reject) => {
    const id = route.id;
    route.methods = JSON.stringify(route.methods || []);
    redis.hmset(makeRouteKey(id), route, (err, route) => {
      if (err) { return reject(err); }
      if (!silent) { emit('change'); }
      resolve();
    });
  });
}

function reorder() {
  return all().then(routes =>
    routes.map((route, index) => ({ ...route, order: index }))
  ).then(routes => {
    return Promise.all(
      routes.map(route => update(route.id, route, true))
    )
  });
}

export function move(id, newPosition) {
  return new Promise((resolve, reject) => {
    all().then(routes => {
      let index = findIndex(routes, { id });
      let movedRoute = routes.splice(index, 1)[0];
      routes.splice(newPosition, 0, movedRoute);
      return routes.map((route, index) => ({ ...route, order: index }));
    }).then(routes =>
      Promise.all(routes.map(route => update(route.id, route, true)))
    ).then(
      () => { emit('change'); resolve() },
      err => reject(err)
    )
  });
}

export function deleteAll() {
  return redis.keysAsync(`${ROUTE_QUALIFIER}*`).then(keys =>
    Promise.all(keys.map(key => redis.delAsync(key)))
  );
}
