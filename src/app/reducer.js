import { combineReducers } from 'redux';
import {
  routes,
  expandedRoutes,
  stagedRoutes,
  creatingRoute,
  updatingRoutes,
  currentAction,
  draftRoute,
  routeBeingDrafted,
  stagedMove
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
  stagedMove,
  lastAction: (state = null, action) => action
});
