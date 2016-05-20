import React, { Component, PropTypes } from 'react';
import Header from './Header';
import DevTools from '../../DevTools';
import './App.scss';

export default class App extends Component {
  render() {
    const { routes } = this.props;
    return (
      <div>
        <DevTools />
        <Header />
        {this.props.children}
      </div>
    );
  }
};
