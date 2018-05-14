import { getPlayersLoaded } from './../selectors/player.selector';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromPlayer from './player.reducer';
import * as fromSession from './sessions.reducer';

export interface AdministrationState {
  players: fromPlayer.PlayerState;
  sessions: fromSession.SessionState;
}

export const reducers: ActionReducerMap<AdministrationState> = {
  players: fromPlayer.reducer,
  sessions: fromSession.reducer
};

export const getAdministrationState = createFeatureSelector<
  AdministrationState
>('admin');

export const getPlayerState = createSelector(
  getAdministrationState,
  (state: AdministrationState) => state.players
);
export const getPlayerLoaded = createSelector(
  getPlayerState,
  fromPlayer.getPlayerLoaded
);

export const getSessionState = createSelector(
  getAdministrationState,
  (state: AdministrationState) => state.sessions
);
