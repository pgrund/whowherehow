import { reducer } from '../reducers/notification.reducer';
import * as fromError from '../reducers/notification.reducer';

describe('NotificationReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(fromError.initialState);
    });
  });

});
