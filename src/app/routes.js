import React from 'react';
import { Route, IndexRoute } from 'react-router';
import components from './components';

const { App } = components;

export default (
  <div>
    <Route path="/" component={App}></Route>
  </div>
);
