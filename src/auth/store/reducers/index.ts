import { createSelector } from '@ngrx/store';
import * as fromActions from '../actions';

import { Player } from '@shared/models/player';

import { environment } from '@env/environment';
import { createFeatureSelector } from '@ngrx/store';

export interface AuthState {
  authToken: number;
  me: Player;
}

export const initialState: AuthState = environment.production
  ? {
      authToken: null,
      me: null
    }
  : {
      authToken: 1,
      me: {
        teamId: null,
        position: { x: 0, y: 0 },
        currentDice: 0,
        numberOfCards: 0,
        name: 'spieler1',
        privateId: 1,
        _links: {
          self: { href: '/players/1' },
          admin: { href: '/sessions/1' },
          game: { href: '/sessions/1' }
        }
      }
    };

export function reducer(
  state = initialState,
  action: fromActions.LoginActions
): AuthState {
  switch (action.type) {
    case fromActions.RE_LOGIN:
      document.cookie = 'privateId=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      return state;
    case fromActions.LOGIN_SUCCESS:
      return {
        ...state,
        me: (<fromActions.LoginSuccessAction>action).payload,
        authToken: (<fromActions.LoginSuccessAction>action).payload.privateId
      };
    case fromActions.LOGOUT_SUCCESS:
      document.cookie = 'privateId=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      return {
        ...state,
        me: null,
        authToken: -1
      };

    default: {
      return state;
    }
  }
}

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const isAuthenticated = createSelector(
  getAuthState,
  (state: AuthState) => {
    console.log(state.authToken, state.authToken >= 0);
    return state ? state.authToken >= 0 : false;
  }
);
export const getMyInfo = createSelector(getAuthState, (state: AuthState) => {
  console.log('getMyinfo', state);
  return state ? state.me : null;
});
