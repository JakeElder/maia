import redis from 'redis';
import Promise from 'bluebird';
import config from '../config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

export const client = redis.createClient(config.get('db:url'));

export const awaitConnection = new Promise((resolve, reject) => {
  client.on('connect', resolve);
  client.on('error', reject);
});
