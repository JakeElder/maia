import React, { Component, PropTypes, Children } from 'react';
import { getMuiTheme } from 'material-ui/styles';
import storeShape from 'react-redux/lib/utils/storeShape';

export default class ContextProvider extends Component {
  static childContextTypes = {
    store: storeShape.isRequired,
    insertCss: PropTypes.func.isRequired,
    muiTheme: PropTypes.object.isRequired
  }

  static styles = [];

  constructor(props, context) {
    super(props, context);
    this.insertCss = this.insertCss.bind(this);
    this.muiTheme = this.getMuiTheme();
  }

  getMuiTheme() {
    if (this.props.userAgent) {
      return getMuiTheme({}, { userAgent: this.props.userAgent });
    } else {
      return getMuiTheme();
    }
  }

  insertCss(style) {
    if (this.props.isServer) {
      if (ContextProvider.styles.indexOf(style._getCss()) !== -1) {
        return;
      }
      ContextProvider.styles.push(style._getCss());
    } else {
      style._insertCss();
    }
  }

  getChildContext() {
    return {
      store: this.props.store,
      muiTheme: this.muiTheme,
      insertCss: this.insertCss
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}
