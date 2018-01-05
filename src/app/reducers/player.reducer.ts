import * as PlayerActions from '@app/actions/player.actions';

import { Player } from '@app/model/player';

export interface State {
  players: Player[],
  loaded: boolean,
  loading: boolean
}


const newState = (state, newData) => {
  return Object.assign({}, state, newData);
}

export const initialState: State = {
  players: [],
  loaded: false,
  loading: false,
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
