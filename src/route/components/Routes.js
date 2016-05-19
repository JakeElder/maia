import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({ routes: state.routes }))
export default class Routes extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  }

  render() {
    const { routes } = this.props;
    return (
      <ol>
        {routes.map(route => <li key={route.id}>{route.label}</li>)}
      </ol>
    );
  }
}
