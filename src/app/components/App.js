import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Header from './Header';
import NewRoute from '../../route/components/NewRoute';
import DevTools from '../../DevTools';
import { UPDATE_SUCCESS, CREATE_SUCCESS } from '../../route/actions';
import './App.scss';

export default class App extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor() {
    super(...arguments);
    this.state = {
      showSnackbar: false,
      snackbarMessage: ''
    };
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      const action = store.getState().lastAction;
      switch (action.type) {
        case CREATE_SUCCESS:
          this.flash(`Route "${action.route.name}" created`);
        case UPDATE_SUCCESS:
          this.flash(`Route "${action.route.name}" updated`);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  flash(message) {
    this.setState({
      snackbarMessage: message,
      showSnackbar: true
    });
  }

  render() {
    const { routes } = this.props;
    return (
      <div>
        <DevTools />
        <Header />
        <NewRoute />
        {this.props.children}
        <Snackbar
          open={this.state.showSnackbar}
          message={this.state.snackbarMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
};
