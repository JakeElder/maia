import * as api from './api';

export const EXPAND_ROUTE = 'route/EXPAND';
export const CONTRACT_ROUTE = 'route/CONTRACT';

export const STAGE_ROUTE = 'route/STAGE';
export const UNSTAGE_ROUTE = 'route/UNSTAGE';

export const UPDATE_REQUEST = 'route/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'route/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'route/UPDATE_FAILURE';


export function expandRoute(id) {
  return {
    type: EXPAND_ROUTE,
    id
  };
};

export function contractRoute(id) {
  return {
    type: CONTRACT_ROUTE,
    id
  };
};

export function stageRoute(route) {
  return {
    type: STAGE_ROUTE,
    route
  }
}

export function unstageRoute(id) {
  return {
    type: UNSTAGE_ROUTE,
    id
  }
}

export function updateRequest(route) {
  return {
    type: UPDATE_REQUEST,
    route
  }
}

export function updateSuccess(route) {
  return {
    type: UPDATE_SUCCESS,
    route
  }
}

export function updateFailure(route) {
  return {
    type: UPDATE_FAILURE,
    route
  }
}

export const update = route => dispatch => {
  dispatch(updateRequest(route));
  return api.update(route.id, route).then(
    () => dispatch(updateSuccess(route)),
    () => dispatch(updateFailure(route))
  );
}
