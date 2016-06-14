import { combineReducers } from 'redux';
import { groups } from '../group/reducers';
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
  groups,
  lastAction: (state = null, action) => action
});
