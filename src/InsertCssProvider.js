import React, { Component, PropTypes } from 'react';

export default class InsertCssProvider extends Component {
  static propTypes = {
    cssArray: PropTypes.array,
    isServer: PropTypes.bool
  }

  static defaultProps = {
    isServer: false
  }

  static childContextTypes = {
    insertCss: React.PropTypes.func
  }

  static styles = [];

  getChildContext() {
    return {
      insertCss: (styles) => {
        if (this.props.isServer) {
          InsertCssProvider.styles.push(styles._getCss())
        } else {
          styles._insertCss();
        }
      }
    }
  }

  render() {
    return this.props.children;
  }
}

