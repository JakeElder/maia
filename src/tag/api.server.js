import Promise from 'bluebird';
import findIndex from 'lodash.findindex';
import sortBy from 'lodash.sortby';
import uuid from 'uuid';

import { client as redis } from '../database';
import config from '../../config'

export const TAG_QUALIFIER = `${config.get('db:name')}:tag:`;
export const makeTagKey = tagId => `${TAG_QUALIFIER}${tagId}`;

export function all() {
  return redis.keysAsync(`${TAG_QUALIFIER}*`).then(keys => {
    const multi = redis.multi();
    for (let key of keys) { multi.hgetall(key) }
    return multi.execAsync();
  });
}

export function create(tag) {
  return new Promise((resolve, reject) => {
    if (!tag.id) { tag.id = uuid.v4(); }
    redis.hmset(makeTagKey(tag.id), tag, (err, ret) => {
      if (ret !== 'OK') { return reject(); }
      return resolve(tag.id);
    });
  });
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

