import * as PlayerActions from '../actions/player.actions';

import { Player } from '@shared/models/player';

export interface PlayerState {
  entities: { [id: string]: Player };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PlayerState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: PlayerActions.PlayerActions
): PlayerState {
  switch (action.type) {
    case PlayerActions.LOAD_PLAYERS: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }

    case PlayerActions.LOAD_PLAYERS_SUCCESS: {
      const players = action.payload;
      const entities = players.reduce(
        (entities: { [id: string]: Player }, player) => {
          return {
            ...entities,
            [player._links.self.href]: player
          };
        },
        {
          ...state.entities
        }
      );
      return {
        ...state,
        entities,
        loaded: true,
        loading: false
      };
    }

    case PlayerActions.UPDATE_PLAYER: {
      const player = action.payload;
      const entities = {
        ...state.entities,
        [player._links.self.href]: player
      };
      return {
        ...state,
        entities
      };
    }

    // case SessionActions.JOIN_SUCCESS: {
    //   let updatedPlayer = (<SessionActions.JoinSuccessAction>action).payload;
    //   return {
    //     ...state,
    //     players: [updatedPlayer, ...state.players.filter(p => p.name != updatedPlayer.name)]
    //   }
    // }

    default: {
      return state;
    }
  }
}

export const getPlayerEnities = (state: PlayerState) => state.entities;
export const getPlayerLoading = (state: PlayerState) => state.loading;
export const getPlayerLoaded = (state: PlayerState) => state.loaded;
