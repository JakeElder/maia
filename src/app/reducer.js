import { combineReducers } from 'redux';
import { routes, expandedRoutes, stagedRoutes } from '../route/reducers';

export default combineReducers({ routes, expandedRoutes, stagedRoutes });
