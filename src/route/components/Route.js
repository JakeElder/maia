import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import classnames from 'classnames';
import serialize from 'form-serialize';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import RaisedButton from 'material-ui/RaisedButton';
import { expandRoute, contractRoute, stageRoute, unstageRoute, update } from '../actions';
import './Route.scss';

function mapStateToProps(state, ownProps) {
  const originalRoute = _.find(state.routes, { id: ownProps.route.id });
  return {
    originalRoute,
    isUpdating: originalRoute.isUpdating,
    isExpanded: _.includes(state.expandedRoutes, ownProps.route.id),
    isModified: _.some(state.stagedRoutes, { id: ownProps.route.id })
  };
}

@connect(mapStateToProps)
export default class Route extends Component {
  constructor() {
    super(...arguments);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  get bodyClassName() {
    return classnames('Route--body', {
      'is-expanded': this.props.isExpanded
    });
  }

  getRouteFromForm() {
    const route = serialize(this.refs.form, { hash: true });
    if (!route.methods) { route.methods = []; }
    return route;
  }

  handleUpdate() {
    const { dispatch, isModified, originalRoute } = this.props;
    const resultingRoute = this.getRouteFromForm();
    if (isModified && _.isEqual(resultingRoute, originalRoute)) {
        dispatch(unstageRoute(this.props.route.id));
        return;
    }
    dispatch(stageRoute(this.getRouteFromForm()));
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

  get formControls() {
    const { id } = this.props.route;
    const { dispatch, isModified, isUpdating } = this.props;
    const disabled = isUpdating || !isModified;

    return <div className="Route--form-controls">
      <RaisedButton
        onMouseUp={() => { dispatch(unstageRoute(id)) }}
        disabled={disabled}
        style={{ marginRight: 10 }}
        label="Reset"
      />
      <RaisedButton
        onMouseUp={() => { dispatch(update(this.props.route)) }}
        primary={true}
        disabled={disabled}
        label="Save"
      />
    </div>
  }

  render() {
    const { id, name, pattern, target } = this.props.route;
    const { isModified, isUpdating } = this.props;
    const disabled = isUpdating;
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
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
        <pre className={this.bodyClassName}>
          <form method="post" action={`/routes/${id}`} ref="form" autoComplete="off">
            <input type="hidden" name="id" value={id} />
            <div className="Route--row">
              <TextField
                disabled={disabled}
                value={name}
                id='name'
                name='name'
                floatingLabelText="Name"
                onChange={this.handleUpdate}
              />
            </div>
            <div className="Route--row">
              <TextField
                disabled={disabled}
                value={pattern}
                id='pattern'
                name='pattern'
                floatingLabelText="pattern"
                onChange={this.handleUpdate}
              />
              <TextField
                disabled={disabled}
                value={target}
                id='target'
                name='target'
                floatingLabelText="target"
                onChange={this.handleUpdate}
              />
            </div>
            <div className="Route--row">
              <div className="Route--methods">
                {methods.map((method, idx) => {
                  return <Checkbox
                    disabled={disabled}
                    onCheck={this.handleUpdate}
                    name={`methods[${idx}]`}
                    key={method}
                    label={method}
                    value={method}
                    checked={this.props.route.methods.indexOf(method) > -1}
                  />
                })}
              </div>
            </div>
            {this.formControls}
          </form>
        </pre>
      </div>
    );
  }
}
