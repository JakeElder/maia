import _ from 'lodash';
import { EXPAND_ROUTE, CONTRACT_ROUTE } from './actions';

export function routes(state = [], action) {
  switch(action.type) {
    default:
      return state;
  }
};

export function expandedRoutes(state = [], action) {
  switch(action.type) {
    case EXPAND_ROUTE:
      return _.uniq([...state, action.id]);
    case CONTRACT_ROUTE:
      return _.without([...state], action.id);
    default:
      return state;
  }
};
