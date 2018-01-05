import { reducer } from '../reducers/login.reducer';
import * as fromLogin from '../reducers/login.reducer';

describe('LoginReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromLogin.initialState);
    });
  });

});