import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Sidebar.css';

@withStyles(s)
export default class Sidebar extends Component {
  render() {
    return (
      <div className={s.root}>
        {this.props.children}
      </div>
    );
  }
}
