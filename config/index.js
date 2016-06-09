import path from 'path';
import nconf from 'nconf';

nconf.defaults({ 'env': process.env.NODE_ENV || 'development' })

nconf.env('__');

if (nconf.get('env') === 'test') {
  nconf.file('test', path.resolve(__dirname, 'test.json'));
}

nconf.file('default', path.resolve(__dirname, 'default.json'));

export default nconf;
