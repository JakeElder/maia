import { combineReducers } from 'redux';
import {
  routes,
  expandedRoutes,
  stagedRoutes,
  creatingRoute,
  updatingRoutes,
  currentAction,
  draftRoute,
  routeBeingDrafted
} from '../route/reducers';

export default combineReducers({
  routes,
  expandedRoutes,
  stagedRoutes,
  creatingRoute,
  updatingRoutes,
  currentAction,
  draftRoute,
  routeBeingDrafted,
  lastAction: (state = null, action) => action
});
