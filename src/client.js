import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { getMuiTheme, MuiThemeProvider } from  'material-ui/styles';

import InsertCssProvider from './InsertCssProvider';
import { reducer, routes } from './app';

const store = createStore(
  reducer,
  window.__REDUX_STATE__,
  compose(
    applyMiddleware(thunk),
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
