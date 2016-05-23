// TODO: Move in to npm module. Make less terrible

import cookie from 'cookie';
import browserCookies from 'browser-cookies';

let state = false;
const isNode = typeof window === 'undefined';

export const expressMiddleware = (req, res, next) => {
  const innerState = cookie.parse(req.get('Cookie') || '').rs_state;
  try {
    state = JSON.parse(innerState);
  } catch(e) {}

  const originalSend = res.send;
  res.send = function(body) {
    res.cookie('rs_state', JSON.stringify(state));
    return originalSend.call(this, body);
  };
  next();
};

export const getSyncedState = () => {
  if (isNode) { return state; }
  return JSON.parse(browserCookies.get('rs_state'));
}

export const reduxMiddleware = ({ getState }) => {
  if (isNode) { state = getState(); }
  return next => action => {
    next(action);
    if (!isNode) {
      browserCookies.set('rs_state', JSON.stringify(getState()));
    } else {
      state = getState();
    }
  }
}
