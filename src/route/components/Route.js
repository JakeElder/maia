import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import serialize from 'form-serialize';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { expandRoute, contractRoute, stageRoute } from '../actions';
import './Route.scss';

function mapStateToProps(state, ownProps) {
  return {
    isExpanded: state.expandedRoutes.indexOf(ownProps.route.id) > -1
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
    route.id = parseInt(route.id);
    return route;
  }

  handleUpdate() {
    const { dispatch } = this.props;
    dispatch(stageRoute(this.getRouteFromForm()));
  }

  render() {
    const { id, name, pattern, target } = this.props.route;
    const { dispatch, isExpanded } = this.props;
    const disabled = false;
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    return (
      <div className="Route">
        <h2 className="Route--heading">
          <div className="Route--heading-label">
            { isExpanded
              ?
              <ArrowUp
                style={{ marginRight: 6 }}
                onClick={() => { dispatch(contractRoute(id)) }}
              />
              :
              <ArrowDown
                style={{ marginRight: 6 }}
                onClick={() => { dispatch(expandRoute(id)) }}
              />
            }
            {name}
          </div>
          <div className="Route--heading-info">
            <span className="Route--pattern">{pattern}</span>
            <span className="Route--seperator"> => </span>
            <span className="Route--target">{target}</span>
          </div>
        </h2>
        <pre className={this.bodyClassName}>
          <form onChange={this.handleUpdate} method="post" action={`/routes/${id}`} ref="form">
            <input type="hidden" name="id" value={id} />
            <div className="Route--row">
              <TextField
                disabled={disabled}
                defaultValue={name}
                id='name'
                name='name'
                floatingLabelText="Name"
                onKeyDown={this.handleUpdate}
              />
            </div>
            <div className="Route--row">
              <TextField
                disabled={disabled}
                defaultValue={pattern}
                id='pattern'
                name='pattern'
                floatingLabelText="pattern"
                onKeyDown={this.handleUpdate}
              />
              <TextField
                disabled={disabled}
                defaultValue={target}
                id='target'
                name='target'
                floatingLabelText="target"
                onKeyDown={this.handleUpdate}
              />
            </div>
            <div className="Route--row">
              <div className="Route--methods">
                {methods.map((method, idx) => {
                  return <Checkbox
                    name={`methods[${idx}]`}
                    key={method}
                    label={method}
                    defaultValue={method}
                    defaultChecked={this.props.route.methods.indexOf(method) > -1}
                  />
                })}
              </div>
            </div>
          </form>
        </pre>
      </div>
    );
  }
}
