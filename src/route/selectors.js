import _ from 'lodash';
import { createSelector } from 'reselect';
import { UNTAGGED, TAGGED_WITH } from '../group/constants';

const getShowUntagged = state =>
  _.find(state.groups, { type: UNTAGGED }).showMembers;

const getShownTags = state =>
  _.filter(state.groups, { type: TAGGED_WITH, showMembers: true }).map(group => group.id)

const getRoutes = state => state.routes;

export const getVisibleRoutes = createSelector(
  [getShowUntagged, getShownTags, getRoutes],
  (showUntagged, shownTags, routes) => routes.filter(route => {
    if (showUntagged && route.tags.length === 0) { return true; }
    if (_.some(route.tags, tag => _.includes(shownTags, tag))) { return true; }
    return false;
  })
);
