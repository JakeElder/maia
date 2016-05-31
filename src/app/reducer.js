import { combineReducers } from 'redux';
import { routes, expandedRoutes, stagedRoutes, updatingRoutes } from '../route/reducers';

export default combineReducers({
  routes,
  expandedRoutes,
  stagedRoutes,
  updatingRoutes,
  lastAction: (state = null, action) => action
});
