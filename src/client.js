import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { getMuiTheme, MuiThemeProvider } from  'material-ui/styles';
import { getSyncedState, reduxMiddleware as syncMiddleware } from './redux-universal-sync';
import DevTools from './DevTools';

import app from './app';

const store = createStore(
  app.reducer,
  getSyncedState(),
  compose(applyMiddleware(syncMiddleware, thunk), DevTools.instrument())
);

const App = (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <Router history={browserHistory}>
        {app.routes}
      </Router>
    </Provider>
  </MuiThemeProvider>
);

render(App, document.getElementById('root'));
