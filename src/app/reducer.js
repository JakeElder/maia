import { combineReducers } from 'redux';
import { groups } from '../group/reducers';
import { tags } from '../tag/reducers';
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
  tags,
  lastAction: (state = null, action) => action
});
