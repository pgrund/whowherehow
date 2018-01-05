import * as login from '@app/actions/login.actions';
import * as error from '@app/actions/error.actions';

import { Player } from '@app/model/player';

export interface State {
  authToken: number;
  me: Player;
}

export const initialState: State = {
  authToken: -1,
  me: null
}

export function reducer(state = initialState, action: login.Actions): State {
  console.debug('LOGIN', action);
  switch (action.type) {
    case login.LOGIN_SUCCESS:
      return {
        ...state,
        me : (<login.LoginSuccessAction>action).payload,
        authToken: (<login.LoginSuccessAction>action).payload.privateId
      };
    case login.LOGOUT_SUCCESS:
      return {
        ...state,
        me : null,
        authToken: -1
      };

    default: {
      return state;
    }
  }
}

export const isAuthenticated = (state: State) => state.authToken >= 0;
export const getMyInfo = (state: State) => state.me;
