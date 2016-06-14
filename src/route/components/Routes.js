import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Route from './Route';

function mapStateToProps(state) {
  return {
    routes: state.routes.map((route) => {
      return _.find(state.stagedRoutes, { id: route.id }) || route;
    }),
    stagedMove: state.stagedMove
  }
}

@DragDropContext(HTML5Backend)
@connect(mapStateToProps)
export default class Routes extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  }

  render() {
    const { routes, stagedMove } = this.props;
    if (stagedMove) {
      let index = _.findIndex(routes, { id: stagedMove.id });
      let movedRoute = routes.splice(index, 1)[0];
      routes.splice(stagedMove.order, 0, movedRoute);
    }
    return (
      <section>
        <ol>
          {routes.map((route, index) => {
            return (
              <li key={route.id}>
                <Route index={index} route={route} />
              </li>
            );
          })}
        </ol>
      </section>
    );
  }
}
