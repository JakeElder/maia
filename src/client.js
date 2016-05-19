import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import app from './app';

const store = createStore(app.reducer, window.__REDUX_STATE__);
const App = (
  <Provider store={store}>
    <Router history={browserHistory}>
      {app.routes}
    </Router>
  </Provider>
);
render(App, document.getElementById('root'));
