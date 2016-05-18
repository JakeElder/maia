import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.scss';

export default class App extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  render() {
    const { routes } = this.context.store.getState();
    return (
      <div>
        <h1>Maia</h1>
        <ol>
          {routes.map((route) => {
            return <li>{route.label}</li>;
          })}
        </ol>
      </div>
    );
  }
};
