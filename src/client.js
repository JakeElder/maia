import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';

import ContextProvider from './ContextProvider';
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
  <ContextProvider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </ContextProvider>
);

render(App, document.getElementById('root'));
