import _ from 'lodash';
import { routeize } from './model';
import { DRAFTING_NEW, BROWSING_ALL } from './constants';
import {
  EXPAND_ROUTE,
  CONTRACT_ROUTE,
  STAGE_ROUTE,
  UNSTAGE_ROUTE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  DRAFT_NEW,
  BROWSE_ALL,
  STAGE_DRAFT,
  UNSTAGE_DRAFT,
  MOVE
} from './actions';

export function routes(state = [], action) {
  switch(action.type) {
    case CREATE_SUCCESS:
      return [action.route, ...state.map(route => ({ ...route, order: route.order + 1 }))];
    case UPDATE_SUCCESS:
      return state.map(route => {
        return route.id === action.route.id ? action.route : route;
      });
    case MOVE:
      let index = _.findIndex(state, { id: action.id });
      let nextState = [...state];
      let movedRoute = nextState.splice(index, 1)[0];
      nextState.splice(action.newOrder, 0, movedRoute);
      return nextState.map((route, index) => ({ ...route, order: index }));
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
export function creatingRoute(state = false, action) {
  switch(action.type) {
    case CREATE_REQUEST:
      return true;
    case CREATE_SUCCESS:
    case CREATE_FAILURE:
      return false;
    default:
      return state;
  }
}

export function updatingRoutes(state = [], action) {
  switch(action.type) {
    case UPDATE_REQUEST:
      return _.uniq([...state, action.route.id]);
    case UPDATE_SUCCESS:
      return _.without([...state], action.route.id);
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

export function currentAction(state = BROWSING_ALL, action) {
  switch(action.type) {
    case DRAFT_NEW:
      return DRAFTING_NEW;
    case BROWSE_ALL:
    case CREATE_SUCCESS:
      return BROWSING_ALL;
    default:
      return state;
  }
}

export function draftRoute(state = routeize({}), action) {
  switch(action.type) {
    case STAGE_DRAFT:
      return action.route;
    case UNSTAGE_DRAFT:
    case CREATE_SUCCESS:
      return routeize({});
    default:
      return state;
  }
}

export function routeBeingDrafted(state = false, action) {
  switch(action.type) {
    case STAGE_DRAFT:
      return true;
    case UNSTAGE_DRAFT:
    case CREATE_SUCCESS:
      return false;
    default:
      return state;
  }
}
