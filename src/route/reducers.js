import _ from 'lodash';
import {
  EXPAND_ROUTE,
  CONTRACT_ROUTE,
  STAGE_ROUTE,
  UNSTAGE_ROUTE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS
} from './actions';

export function routes(state = [], action) {
  switch(action.type) {
    case UPDATE_REQUEST:
      return state.map(route => {
        if (route.id === action.route.id) { route.isUpdating = true; }
        return route;
      });
    case UPDATE_SUCCESS:
      return state.map(route => {
        return route.id === action.route.id ? action.route : route;
      });
    default:
      return state;
  }
}

export function expandedRoutes(state = [], action) {
  switch(action.type) {
    case EXPAND_ROUTE:
      return _.uniq([...state, action.id]);
    case CONTRACT_ROUTE:
      return _.without([...state], action.id);
    default:
      return state;
  }
}

export function stagedRoutes(state = [], action) {
  switch(action.type) {
    case STAGE_ROUTE:
      return [..._.filter(state, route => route.id !== action.route.id), action.route];
    case UNSTAGE_ROUTE:
      return [..._.filter(state, route => route.id !== action.id)];
    case UPDATE_SUCCESS:
      return [..._.filter(state, route => route.id !== action.route.id)];
    default:
      return state;
  }
}
