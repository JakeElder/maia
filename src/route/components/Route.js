import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

import RouteForm from './RouteForm';
import { expandRoute, contractRoute, stageRoute, unstageRoute, update } from '../actions';
import './Route.scss';

function mapStateToProps(state, ownProps) {
  const originalRoute = _.find(state.routes, { id: ownProps.route.id });
  return {
    originalRoute,
    isUpdating: _.includes(state.updatingRoutes, originalRoute.id),
    isExpanded: _.includes(state.expandedRoutes, originalRoute.id),
    isModified: _.some(state.stagedRoutes, { id: originalRoute.id })
  };
}

@connect(mapStateToProps)
export default class Route extends Component {
  constructor() {
    super(...arguments);
    this.handleChange = this.handleChange.bind(this);
  }

  get bodyClassName() {
    return classnames('Route--body', {
      'is-expanded': this.props.isExpanded
    });
  }

  handleChange(event, resultingRoute) {
    const { dispatch, isModified, originalRoute } = this.props;
    if (isModified && _.isEqual(resultingRoute, originalRoute)) {
      dispatch(unstageRoute(this.props.route.id));
      return;
    }
    dispatch(stageRoute(resultingRoute));
  }

  get toggleIcon() {
    const { id } = this.props.route;
    const { dispatch, isExpanded } = this.props;
    if (isExpanded) {
      return <ArrowUp
        style={{ marginRight: 6 }}
        onClick={() => { dispatch(contractRoute(id)) }}
      />
    } else {
      return <ArrowDown
        style={{ marginRight: 6 }}
        onClick={() => { dispatch(expandRoute(id)) }}
      />
    }
  }

  get modifiedStateIndicator() {
    const { isModified, isUpdating } = this.props;
    if (isUpdating) {
      return <span className="Route--modified-label">posting</span>;
    }
    if (isModified) {
      return <span className="Route--modified-label">modified</span>;
    }
    return <span className="Route--modified-label">👌</span>;
  }

  render() {
    const { id, name, pattern, target } = this.props.route;
    const { dispatch, isModified, isUpdating } = this.props;

    return (
      <div className="Route">
        <h2 className="Route--heading">
          <div className="Route--heading-label">
            { this.toggleIcon }
            { this.modifiedStateIndicator }
            {name}
          </div>
          <div className="Route--heading-info">
            <span className="Route--pattern">{pattern}</span>
            <span className="Route--seperator"> => </span>
            <span className="Route--target">{target}</span>
          </div>
        </h2>
        <div className={this.bodyClassName}>
          <RouteForm
            route={this.props.route}
            onChange={this.handleChange}
            onReset={() => { dispatch(unstageRoute(id)) }}
            onSubmit={() => { dispatch(update(this.props.route)) }}
            resetEnabled={isModified && !isUpdating}
            submitEnabled={isModified && !isUpdating}
            editable={!isUpdating}
          />
        </div>
      </div>
    );
  }
}
