import * as login from '@app/actions/login.actions';

import { Player } from '@app/model/player';

import { environment } from '@env/environment';

export interface State {
  authToken: number;
  me: Player;
}

export const initialState: State =  environment.production ? {
  authToken: -1 ,
  me: null
} :
{
  authToken: 1,
  me :{
    teamId: null,
     position: { x: 0, y: 0 },
     currentDice: 0,
     numberOfCards: 0,
     name: 'spieler1',
     privateId: 1 ,
     _links: {
       self: {href: '/players/1'},
       admin: {href: '/sessions/1'},
       game: {href: '/sessions/1'},
     }
  }
};

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
