import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Route from './Route';
import './Routes.scss';

@connect(state => ({ routes: state.routes }))
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
