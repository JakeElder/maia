import omit from 'lodash.omit';
import { TAG_QUALIFIER, makeTagKey, all, create, update } from '../api.server';
import * as db from '../../database';

jest.unmock('../api.server');
jest.unmock('../../database');

const tags = [{
  id: '4c95e83f-ee92-4a40-8a14-e69b11230fe1',
  name: 'Hitman'
}, {
  id: '11dc3319-9553-4dd2-9f99-554b5d17c71b',
  name: 'Staging'
}];

const clearTags = () => {
  return db.awaitConnection.then(() => {
    return new Promise((resolve, reject) => {
      db.client.keys(`${TAG_QUALIFIER}*`, (err, keys) => {
        db.client.del(...keys, resolve);
      });
    });
  });
};

beforeAll(done => clearTags().then(done)); 

describe('all', () => {
  it('returns all tags in the database', () => {
    tags.forEach((tag) => {
      db.client.hmset(makeTagKey(tag.id), tag);
    });
    return all().then((retrievedTags) => {
      expect(tags).toEqual(retrievedTags);
    });
  });
});

describe('create', () => {
  it('adds a new tag to the database', () => {
    const tag = omit(tags[0], 'id');
    return create(tag).then((id) => {
      return new Promise((resolve, reject) => {
        db.client.hgetall(makeTagKey(id), (err, tag) => {
          expect(tag).toEqual({ ...tags[0], id });
          resolve();
        });
      });
    });
  });
});

describe('update', () => {
  it('updates a tag', () => {
    const tag = tags[0];
    db.client.hmset(makeTagKey(tag.id), tag);
    tag.name = 'New name';
    return update(tag.id, tag).then(() => {
      return new Promise((resolve, reject) => {
        db.client.hgetall(makeTagKey(tag.id), (err, retrievedTag) => {
          expect(retrievedTag).toEqual(tag);
          resolve();
        });
      })
    });
  });
});

afterAll(() => db.client.quit());

