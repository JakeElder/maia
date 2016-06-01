import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { getMuiTheme, MuiThemeProvider } from  'material-ui/styles';

import DevTools from './DevTools';
import { getSyncedState, reduxMiddleware as syncMiddleware } from './redux-universal-sync';
import { reducer, routes } from './app';

const store = createStore(
  reducer,
  getSyncedState(),
  compose(applyMiddleware(syncMiddleware, thunk), DevTools.instrument())
);

const App = (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>
  </MuiThemeProvider>
);

render(App, document.getElementById('root'));
