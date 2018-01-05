import { reducer } from '../reducers/player.reducer';
import * as fromPlayer from '../reducers/player.reducer';

describe('PlayerReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromPlayer.initialState);
    });
  });

});