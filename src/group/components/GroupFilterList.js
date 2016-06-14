import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';

import { showMembers, hideMembers } from '../actions';

@connect((state) => ({ groups: state.groups }))
export default class GroupFilterList extends Component {
  handleChange(event) {
    const id = parseInt(event.target.id.replace('group_', ''), 10);
    const { dispatch } = this.props;
    dispatch(event.target.checked ? showMembers(id) : hideMembers(id));
  }

  render() {
    const { groups } = this.props;
    return (
      <form onChange={this.handleChange.bind(this)}>
        <ul>
          {groups.map((group, idx) =>
            <li key={idx}>
              <Toggle
                id={`group_${group.id}`}
                label={group.name}
                toggled={group.showMembers}
                style={{ marginBottom: 16 }}
                labelStyle={{ color: 'inherit' }}
              />
            </li>
          )}
        </ul>
      </form>
    );
  }
}

