import { showMembers, hideMembers } from '../actions';
import { groups } from '../reducers';

jest.unmock('../actions');
jest.unmock('../reducers');

describe('groups', () => {
  it('updates the showMembers key on SHOW_MEMBERS', () => {
    const state = [
      { id: 1, showMembers: false },
      { id: 2, showMembers: false }
    ];
    expect(groups(state, showMembers(1))).toEqual([
      { id: 1, showMembers: true },
      { id: 2, showMembers: false }
    ]);
  });

  it('updates the showMembers key on HIDE_MEMBERS', () => {
    const state = [
      { id: 1, showMembers: true },
      { id: 2, showMembers: true }
    ];
    expect(groups(state, hideMembers(1))).toEqual([
      { id: 1, showMembers: false },
      { id: 2, showMembers: true }
    ]);
  });
});
