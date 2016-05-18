import { combineReducers } from 'redux';
import route from '../route';

export default combineReducers({
  routes: route.reducers.routes
});
