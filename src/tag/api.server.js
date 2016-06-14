import Promise from 'bluebird';
import findIndex from 'lodash.findindex';
import sortBy from 'lodash.sortby';
import uuid from 'uuid';

import { client as redis } from '../database';
import config from '../../config'

export const TAG_QUALIFIER = `${config.get('db:name')}:tag:`;
export const makeTagKey = routeId => `${TAG_QUALIFIER}${routeId}`;

export function all() {
  return redis.keysAsync(`${TAG_QUALIFIER}*`).then(keys =>
    Promise.all(keys.map(key => redis.hgetallAsync(key)))
  );
}

export function create(tag) {
  return new Promise((resolve, reject) => {
    const id = uuid.v4();
    redis.hmset(makeTagKey(id), { ...tag, id }, (err, tag) => {
      if (err) { return reject(err); }
      resolve(id);
    });
  })
}

export function update(id, tag) {
  return new Promise((resolve, reject) => {
    const id = tag.id;
    redis.hmset(makeTagKey(id), tag, (err, tag) => {
      if (err) { return reject(err); }
      resolve();
    });
  });
}

export function deleteAll() {
  return redis.keysAsync(`${TAG_QUALIFIER}*`).then(keys =>
    Promise.all(keys.map(key => redis.delAsync(key)))
  );
}

