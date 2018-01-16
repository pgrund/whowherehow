import * as PlayerActions from '@app/actions/player.actions';
import * as NotifyActions from '@app/actions/notification.actions';

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

export function reducer(state = initialState, action: PlayerActions.Actions | NotifyActions.Actions): State {
  console.debug('PLAYER', action);
  switch (action.type) {

    case PlayerActions.LOAD_ALL: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }

    case PlayerActions.LOAD_ALL_SUCCESS: {
      return {
        ...state,
        players: (<PlayerActions.LoadAllSuccessAction>action).payload ,
        loaded: true,
        loading: false
      };
    }

    case NotifyActions.NOTIFY_PLAYER_DROPPED_SESSION: {
      let updatedPlayer = (<NotifyActions.NotifyPlayerDroppedSessionAction>action).payload;
      return {
        ...state,
        players: state.players.filter(p => p.name != updatedPlayer.name).concat(updatedPlayer)
      }
    }

    default: {
      return state;
    }
  }
}

export const getPlayers = (state:State) => state.players;
