import { SHOW_MEMBERS, HIDE_MEMBERS } from './actions';

export const groups = (state = [], action) => {
  switch(action.type) {
    case SHOW_MEMBERS:
      return state.map((group) => group.id === action.id ?
        { ...group, showMembers: true } :
        group
      );
    case HIDE_MEMBERS:
      return state.map((group) => group.id === action.id ?
        { ...group, showMembers: false } :
        group
      );
    default:
      return state;
  }
}
