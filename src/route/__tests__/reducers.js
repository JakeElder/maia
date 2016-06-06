import { move } from '../actions';
import { routes } from '../reducers';

jest.unmock('../actions');
jest.unmock('../reducers');

describe('routes', () => {
  it('Re orders the routes on MOVE', () => {
    const state = [
      { order: 0, id: 1 },
      { order: 1, id: 2 },
      { order: 2, id: 3 }
    ];
    expect(routes(state, move(1, 2))).toEqual([
      { order: 0, id: 2 },
      { order: 1, id: 3 },
      { order: 2, id: 1 }
    ]);
    expect(routes(state, move(3, 0))).toEqual([
      { order: 0, id: 3 },
      { order: 1, id: 1 },
      { order: 2, id: 2 }
    ]);
  });
});
