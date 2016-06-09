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

  insertCss(styles) {
    if (this.props.isServer) {
      ContextProvider.styles.push(styles._getCss())
    } else {
      styles._insertCss();
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
