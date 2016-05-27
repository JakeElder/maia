import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import findIndex from 'lodash.findindex';
import sortBy from 'lodash.sortby';
import { client as redis } from '../database';
import config from '../config'

export const ROUTE_QUALIFIER = `${config.get('db:name')}:routes:`;

export const makeRouteKey = routeId => `${ROUTE_QUALIFIER}${routeId}`;

export function all() {
  return redis.keysAsync(`${ROUTE_QUALIFIER}*`).then(keys =>
    Promise.all(keys.map(key => redis.hgetallAsync(key)))
  ).then(routes => {
    routes = routes.map(route => ({
      ...route,
      order: parseInt(route.order, 10),
      methods: JSON.parse(route.methods)
    }));
    return sortBy(routes, 'order');
  });
}

export function update(id, route) {
  return Promise.reject();
}
