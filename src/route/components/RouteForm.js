import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import serialize from 'form-serialize';
import RaisedButton from 'material-ui/RaisedButton';

import { METHODS } from '../constants';
import { routeize } from '../model';
import s from './RouteForm.css';

@withStyles(s)
export default class RouteForm extends Component {
  get formControls() {
    const { hideControls, disabled, onReset, resetEnabled, submitEnabled } = this.props;

    let style = {};
    if (hideControls) {
      style = {
        visibility: 'hidden',
        position: 'absolute'
      };
    }

    return <div className={s.controls} style={style}>
      <RaisedButton
        onMouseUp={onReset}
        disabled={!resetEnabled}
        style={{ marginRight: 10 }}
        label="Reset"
      />
      <RaisedButton
        primary={true}
        disabled={!submitEnabled}
        label="Submit"
        type="submit"
      />
    </div>
  }

  get route() {
    return routeize(serialize(this.refs.form, { hash: true }));
  }

  submit() {
    const { onSubmit } = this.props;
    return onSubmit(this.route);
  }

  render() {
    const { id, name, pattern, target, order } = this.props.route;
    const { onChange, onSubmit, editable } = this.props;

    return (
      <form
        ref="form"
        onSubmit={(e) => { e.preventDefault(); onSubmit(this.route); }}
        onChange={() => { onChange(this.route); }}
        autoComplete="off"
      >
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="order" value={order} />
        <div className="Route--row">
          <TextField
            disabled={!editable}
            value={name}
            id="name"
            name="name"
            floatingLabelText="Name"
          />
        </div>
        <div className="Route--row">
          <TextField
            disabled={!editable}
            value={pattern}
            id="pattern"
            name="pattern"
            floatingLabelText="pattern"
          />
          <TextField
            disabled={!editable}
            value={target}
            id="target"
            name="target"
            floatingLabelText="target"
          />
        </div>
        <div className="Route--row">
          <div className="Route--methods">
            {METHODS.map((method, idx) => {
              return <Checkbox
                disabled={!editable}
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
    );
  }
}
