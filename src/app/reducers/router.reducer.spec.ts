import { reducer } from '../reducers/router.reducer';
import * as fromRouter from '../reducers/router.reducer';

describe('RouterReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromRouter.initialState);
    });
  });

});