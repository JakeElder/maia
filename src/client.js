import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { getMuiTheme, MuiThemeProvider } from  'material-ui/styles';

import InsertCssProvider from './InsertCssProvider';
import { getSyncedState, reduxMiddleware as syncMiddleware } from './redux-universal-sync';
import { reducer, routes } from './app';

const store = createStore(
  reducer,
  getSyncedState(),
  compose(
    applyMiddleware(syncMiddleware, thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const App = (
  <InsertCssProvider>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <StoreProvider store={store}>
        <Router history={browserHistory}>{routes}</Router>
      </StoreProvider>
    </MuiThemeProvider>
  </InsertCssProvider>
);

render(App, document.getElementById('root'));
