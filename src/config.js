import path from 'path';
import nconf from 'nconf';

nconf.env('__');

if (process.env.NODE_ENV === 'test') {
  nconf.file('test', path.resolve(__dirname, '..', 'config', 'test.json'));
}

nconf.file('default', path.resolve(__dirname, '..', 'config', 'default.json'));

export default nconf;
