import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Route from './Route';
import './Routes.scss';

function mapStateToProps(state) {
  return {
    routes: state.routes.map((route) => {
      return _.find(state.stagedRoutes, { id: route.id }) || route;
    })
  }
}

@DragDropContext(HTML5Backend)
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
                <Route order={route.order} route={route} />
              </li>
            );
          })}
        </ol>
      </section>
    );
  }
}
