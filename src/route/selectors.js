import _ from 'lodash';
import { createSelector } from 'reselect';
import { UNTAGGED } from '../group/constants';

const getShowUntagged = state =>
  _.find(state.groups, { type: UNTAGGED }).showMembers;

const getRoutes = state => state.routes;

export const getVisibleRoutes = createSelector(
  [getShowUntagged, getRoutes],
  (showUntagged, routes) =>
    showUntagged ?
      routes :
      routes.filter(route => route.tags.length > 0)
);
