import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import findIndex from 'lodash.findindex';
import sortBy from 'lodash.sortby';
import uuid from 'uuid';
import EventEmitter from 'events';
import bindAll from 'lodash.bindall';

import { client as redis } from '../database';
import config from '../config'

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

export function create(route) {
  return new Promise((resolve, reject) => {
    const id = uuid.v4();
    route.methods = JSON.stringify(route.methods || []);
    redis.hmset(makeRouteKey(id), { ...route, id }, (err, route) => {
      if (err) { return reject(err); }
      emit('change');
      resolve(id);
    });
  });
}

export function update(id, route) {
  return new Promise((resolve, reject) => {
    const id = route.id;
    route.methods = JSON.stringify(route.methods || []);
    redis.hmset(makeRouteKey(id), route, (err, route) => {
      if (err) { return reject(err); }
      emit('change');
      resolve();
    });
  });
}
