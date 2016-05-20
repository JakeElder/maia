import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Route from './Route';
import './Routes.scss';

function mapStateToProps(state) {
  return {
    routes: state.routes.map((route) => {
      return _.find(state.stagedRoutes, { id: route.id }) || route;
    })
  }
}

@connect(mapStateToProps)
export default class Routes extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  }

  render() {
    const { routes, dispatch } = this.props;
    return (
      <section className="Routes">
        <ol className="RouteList">
          {routes.map((route) => {
            return (
              <li className="RouteList--route" key={route.id}>
                <Route route={route} />
              </li>
            );
          })}
        </ol>
      </section>
    );
  }
}
