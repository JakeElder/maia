import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { DragSource, DropTarget } from 'react-dnd';

import RouteForm from './RouteForm';
import { expandRoute, contractRoute, stageRoute, unstageRoute, update, move, commitMove } from '../actions';
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

const cardSource = {
  beginDrag(props) {
    return {
      id: props.route.id,
      order: props.order
    };
  },

  endDrag(props) {
    const { id, order } = props.originalRoute;
    props.dispatch(commitMove(id, order));
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragItem = monitor.getItem();
    const hoverItemOrder = props.order;

    // Don't replace items with themselves
    if (dragItem.order === hoverItemOrder) { return; }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragItem.order < hoverItemOrder && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragItem.order > hoverItemOrder && hoverClientY > hoverMiddleY) {
      return;
    }

    // Actually perform the move action
    props.dispatch(move(dragItem.id, hoverItemOrder));

    dragItem.order = hoverItemOrder;
  }
};

@connect(mapStateToProps)
@DropTarget('route', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('route', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
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

  handleChange(resultingRoute) {
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
      return <div className="Route--toggle-icon">
        <ArrowUp
          style={{ marginRight: 6 }}
          onClick={() => { dispatch(contractRoute(id)) }}
        />
      </div>

    } else {
      return <div className="Route--toggle-icon">
        <ArrowDown
          style={{ marginRight: 6 }}
          onClick={() => { dispatch(expandRoute(id)) }}
        />
      </div>
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
    const {
      dispatch,
      isModified,
      isUpdating,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = this.props;
    const style = { opacity: isDragging ? 0 : 1 };

    return connectDragSource(connectDropTarget(
      <div className="Route" style={style}>
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
            onSubmit={(route) => { dispatch(update(route)) }}
            resetEnabled={isModified && !isUpdating}
            submitEnabled={isModified && !isUpdating}
            editable={!isUpdating}
          />
        </div>
      </div>
    ));
  }
}
