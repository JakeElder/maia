import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import { draftNew } from '../../route/actions';
import { DRAFTING_NEW } from '../../route/constants';

@connect(state => ({ addButtonEnabled: state.currentAction !== DRAFTING_NEW }))
export default class Header extends Component {
  render() {
    const { dispatch, addButtonEnabled } = this.props;
    const addButton = <RaisedButton
      disabled={!addButtonEnabled}
      style={{ marginTop: 6 }}
      label="Add Route"
      onMouseUp={() => { dispatch(draftNew()) }}
    />
    return (
      <header>
        <AppBar
          title="Maia"
          showMenuIconButton={false}
          iconElementRight={addButton}
          style={{ boxShadow: 'none', borderBottom: '1px solid #2da7b7' }}
        />
      </header>
    );
  }
}
