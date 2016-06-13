import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { browseAll, stageDraft, unstageDraft, create } from '../actions';
import { DRAFTING_NEW } from '../constants';
import { routeize } from '../model';
import { RouteFormControls, RouteForm } from './RouteForm';

@connect(state => ({
  isOpen: state.currentAction === DRAFTING_NEW,
  route: state.draftRoute,
  creatingRoute: state.creatingRoute,
  routeBeingDrafted: state.routeBeingDrafted
}))
export default class NewRoute extends Component {
  constructor() {
    super(...arguments);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(resultingRoute) {
    const { dispatch } = this.props;
    if (isEqual(routeize({}), resultingRoute)) {
      dispatch(unstageDraft());
      return;
    }
    dispatch(stageDraft(resultingRoute));
  }

  render() {
    const { dispatch, isOpen, creatingRoute, routeBeingDrafted } = this.props;
    const resetEnabled = routeBeingDrafted && !creatingRoute;
    const submitEnabled = routeBeingDrafted && !creatingRoute;
    const formId = 'route-form';

    const actions = <RouteFormControls
      onReset={() => dispatch(unstageDraft())}
      resetEnabled={resetEnabled}
      submitEnabled={submitEnabled}
      form={formId}
    />

    return (
      <Dialog
        title="Add New Route"
        modal={false}
        open={isOpen}
        onRequestClose={() => { dispatch(browseAll()); }}
        autoScrollBodyContent={true}
        actions={actions}
      >
        <RouteForm
          onChange={this.handleChange}
          onSubmit={(route) => { dispatch(create(route)); }}
          elId={formId}
          route={this.props.route}
          hideControls={true}
          editable={!creatingRoute}
        />
      </Dialog>
    );
  }
}
