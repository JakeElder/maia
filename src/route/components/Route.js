import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import url from 'url';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { expandRoute, contractRoute } from '../actions';
import './Route.scss';

function mapStateToProps(state, ownProps) {
  return {
    isExpanded: state.expandedRoutes.indexOf(ownProps.id) > -1
  };
}

@connect(mapStateToProps)
export default class Route extends Component {
  get bodyClassName() {
    return classnames('Route--body', {
      'is-expanded': this.props.isExpanded
    });
  }

  render() {
    const { dispatch, id, label, pattern, target, isExpanded } = this.props;
    return (
      <div className="Route">
        <h2 className="Route--heading">
          <div className="Route--heading-label">
            { isExpanded
              ?
              <ArrowUp
                style={{ marginRight: 6 }}
                onClick={() => { dispatch(contractRoute(id)) }} />
              :
              <ArrowDown
                style={{ marginRight: 6 }}
                onClick={() => { dispatch(expandRoute(id)) }} />
            }
            {label}
          </div>
          <div className="Route--heading-info">
            <span className="Route--pattern">{pattern}</span>
            <span className="Route--seperator"> => </span>
            <span className="Route--target">{url.format(target)}</span>
          </div>
        </h2>
        <pre className={this.bodyClassName}>
          {JSON.stringify(this.props, null, '\t')}
        </pre>
      </div>
    );
  }
}
