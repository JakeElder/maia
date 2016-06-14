import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { DragSource, DropTarget } from 'react-dnd';

import { RouteForm } from './RouteForm';
import { expandRoute, contractRoute, stageRoute, unstageRoute, update, stageMove, move } from '../actions';
import s from './Route.css';

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
      index: props.index
    };
  },

  endDrag(props, monitor) {
    const { id, index } = monitor.getItem();
    props.dispatch(move(id, index));
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragItem = monitor.getItem();
    const hoverItemIndex = props.index;

    // Don't replace items with themselves
    if (dragItem.index === hoverItemIndex) { return; }

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
    if (dragItem.index < hoverItemIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragItem.index > hoverItemIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Actually perform the move action
    props.dispatch(stageMove(dragItem.id, hoverItemIndex));

    dragItem.index = hoverItemIndex;
  }
};

@withStyles(s)
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
    return this.props.isExpanded ? s.expandedBody : s.body;
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
      return <div className={s.toggleIcon}>
        <ArrowUp
          onClick={() => { dispatch(contractRoute(id)) }}
        />
      </div>

    } else {
      return <div className={s.toggleIcon}>
        <ArrowDown
          onClick={() => { dispatch(expandRoute(id)) }}
        />
      </div>
    }
  }

  get modifiedStateIndicator() {
    const { isModified, isUpdating } = this.props;
    if (isUpdating) {
      return <span className={s.modifiedLabel}>posting</span>;
    }
    if (isModified) {
      return <span className={s.modifiedLabel}>modified</span>;
    }
    return <span className={s.modifiedLabel}>👌</span>;
  }

  get body() {
    if (!this.props.isExpanded) { return; }

    const { id } = this.props.route;
    const { dispatch, isModified, isUpdating } = this.props;

    return <div className={this.bodyClassName}>
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
  }

  render() {
    const { id, name, pattern, target } = this.props.route;
    const { connectDragSource, connectDropTarget, isDragging } = this.props;
    const style = { opacity: isDragging ? 0 : 1 };

    return connectDragSource(connectDropTarget(
      <div className={s.root} style={style}>
        <h2 className={s.heading}>
          { this.toggleIcon }
          <div className={s.headingCopy}>
            <div className={s.headingLabel}>
              {name}
            </div>
            <div className={s.headingInfo}>
              <span className={s.pattern}>{pattern}</span>
              <span className={s.seperator}> => </span>
              <span className={s.target}>{target}</span>
            </div>
          </div>
        </h2>
        { this.body }
      </div>
    ));
  }
}
