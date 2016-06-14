export const SHOW_MEMBERS = 'group/SHOW_MEMBERS';
export const HIDE_MEMBERS = 'group/HIDE_MEMBERS';

export const showMembers = (id) => ({ type: SHOW_MEMBERS, id });
export const hideMembers = (id) => ({ type: HIDE_MEMBERS, id });
