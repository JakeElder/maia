import * as api from 'route-api';

export const EXPAND_ROUTE = 'route/EXPAND';
export const CONTRACT_ROUTE = 'route/CONTRACT';

export const STAGE_ROUTE = 'route/STAGE';
export const UNSTAGE_ROUTE = 'route/UNSTAGE';

export const CREATE_REQUEST = 'route/CREATE_REQUEST';
export const CREATE_SUCCESS = 'route/CREATE_SUCCESS';
export const CREATE_FAILURE = 'route/CREATE_FAILURE';

export const UPDATE_REQUEST = 'route/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'route/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'route/UPDATE_FAILURE';

export const DRAFT_NEW = 'route/DRAFT_NEW';
export const BROWSE_ALL = 'route/BROWSE_ALL';

export const STAGE_DRAFT = 'route/STAGE_DRAFT';
export const UNSTAGE_DRAFT = 'route/UNSTAGE_DRAFT';


export const expandRoute = id => ({ type: EXPAND_ROUTE, id });
export const contractRoute = id => ({ type: CONTRACT_ROUTE, id });

export const stageRoute = route => ({ type: STAGE_ROUTE, route });
export const unstageRoute = id => ({ type: UNSTAGE_ROUTE, id });

export const createRequest = route => ({ type: CREATE_REQUEST, route });
export const createSuccess = route => ({ type: CREATE_SUCCESS, route });
export const createFailure = route => ({ type: CREATE_FAILURE, route });

export const updateRequest = route => ({ type: UPDATE_REQUEST, route });
export const updateSuccess = route => ({ type: UPDATE_SUCCESS, route });
export const updateFailure = route => ({ type: UPDATE_FAILURE, route });

export const draftNew = () => ({ type: DRAFT_NEW });
export const browseAll = () => ({ type: BROWSE_ALL });

export const stageDraft = route => ({ type: STAGE_DRAFT, route });
export const unstageDraft = () => ({ type: UNSTAGE_DRAFT });


export const create = route => dispatch => {
  dispatch(createRequest(route));
  return api.create(route).then(
    id => dispatch(createSuccess({ ...route, id })),
    () => dispatch(createFailure(route))
  );
}

export const update = route => dispatch => {
  dispatch(updateRequest(route));
  return api.update(route.id, route).then(
    () => dispatch(updateSuccess(route)),
    () => dispatch(updateFailure(route))
  );
}
