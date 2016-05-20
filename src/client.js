import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { getMuiTheme, MuiThemeProvider } from  'material-ui/styles';
import DevTools from './DevTools';

import app from './app';

const store = createStore(app.reducer, window.__REDUX_STATE__, DevTools.instrument());
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
