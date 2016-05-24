import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Header from './Header';
import DevTools from '../../DevTools';
import { UPDATE_SUCCESS } from '../../route/actions';
import './App.scss';

export default class App extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor() {
    super(...arguments);
    const { store } = this.context;
    this.state = {
      showSnackbar: false,
      snackbarMessage: 'Words'
    };
    store.subscribe(() => {
      const action = store.getState().lastAction;
      switch (action.type) {
        case UPDATE_SUCCESS:
          this.flash(`Route "${action.route.name}" saved`);
      }
    });
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
