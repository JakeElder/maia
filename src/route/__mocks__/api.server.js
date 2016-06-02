import EventEmitter from 'events';
import bindAll from 'lodash.bindall';

const pubsub = bindAll(new EventEmitter(), ['on', 'emit']);
export const on = pubsub.on;
export const emit = pubsub.emit;

let routes = [];

export const __setRoutes = nextRoutes => { routes = nextRoutes; }
export const all = () => Promise.resolve(routes);
