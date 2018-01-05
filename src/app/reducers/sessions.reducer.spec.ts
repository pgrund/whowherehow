import { reducer } from '../reducers/sessions.reducer';
import * as fromSessions from '../reducers/sessions.reducer';

describe('SessionsReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromSessions.initialState);
    });
  });

});