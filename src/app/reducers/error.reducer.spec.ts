import { reducer } from '../reducers/error.reducer';
import * as fromError from '../reducers/error.reducer';

describe('ErrorReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromError.initialState);
    });
  });

});