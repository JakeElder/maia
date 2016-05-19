import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Routes from '../route/components/Routes';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Routes} />
  </Route>
);
