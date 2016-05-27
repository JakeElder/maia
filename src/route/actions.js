import * as api from 'route-api';

export const EXPAND_ROUTE = 'route/EXPAND';
export const CONTRACT_ROUTE = 'route/CONTRACT';

export const STAGE_ROUTE = 'route/STAGE';
export const UNSTAGE_ROUTE = 'route/UNSTAGE';

export const UPDATE_REQUEST = 'route/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'route/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'route/UPDATE_FAILURE';


export const expandRoute = id => ({ type: EXPAND_ROUTE, id });
export const contractRoute = id => ({ type: CONTRACT_ROUTE, id });

export const stageRoute = route => ({ type: STAGE_ROUTE, route });
export const unstageRoute = id => ({ type: UNSTAGE_ROUTE, id });

export const updateRequest = route => ({ type: UPDATE_REQUEST, route });
export const updateSuccess = route => ({ type: UPDATE_SUCCESS, route });
export const updateFailure = route => ({ type: UPDATE_FAILURE, route });


export const update = route => dispatch => {
  dispatch(updateRequest(route));
  return api.update(route.id, route).then(
    () => dispatch(updateSuccess(route)),
    () => dispatch(updateFailure(route))
  );
}
