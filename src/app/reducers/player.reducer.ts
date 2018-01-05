import * as PlayerActions from '@app/actions/player.actions';

import { Player } from '@app/model/player';

export interface State {
  // me: Player | null,
  players: Player[],
  loaded: boolean,
  loading: boolean
  // errors: any[]
}


const newState = (state, newData) => {
  return Object.assign({}, state, newData);
}

export const initialState: State = {
  // me: {
  //   "_links": {
  //     "self": {
  //       "href": "/players/1"
  //     },
  //     "game": {
  //       "href": "/sessions/1"
  //     },
  //     "admin": {
  //       "href": "/sessions/1"
  //     }
  //   },
  //   "teamId": null,
  //   "position": {
  //     "x": 0,
  //     "y": 0
  //   },
  //   "privateId" : 1,
  //   "currentDice": 0,
  //   "numberOfCards": 0,
  //   "name": "spieler1"
  // },
  players: [],
  loaded: false,
  loading: false,
  // errors: []
}

export function reducer(state = initialState, action: PlayerActions.Actions): State {
  console.debug('PLAYER', action);
  switch (action.type) {

    case PlayerActions.LOAD_ALL: {
      return newState(state, { loaded: false, loading: true });
    }

    case PlayerActions.LOAD_ALL_SUCCESS: {
      return newState(state, { players: (<PlayerActions.LoadAllSuccessAction>action).payload , loaded: true, loading: false });
    }
    default: {
      return state;
    }
  }
}

export const getPlayers = (state:State) => state.players;
