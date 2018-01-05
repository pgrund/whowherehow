import { ActionReducerMap, createSelector, Action } from '@ngrx/store';
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

import * as session from './sessions.reducer';
import * as player from './player.reducer';
import * as login from './login.reducer';
import * as router from './router.reducer';
import * as error from './error.reducer';

export interface State {
  routerReducer: RouterReducerState<router.RouterStateUrl>
  player: player.State
  auth: login.State
  session: session.State
  errors: Error[]
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  auth: login.reducer,
  player: player.reducer,
  session: session.reducer,
  errors: error.reducer
};

export const getErrors  = (state:State) => state.errors;

export const getAuth    = (state:State) => state.auth;
export const getMyInfo = createSelector(getAuth, login.getMyInfo);
export const isAuthenticated = createSelector(getAuth, login.isAuthenticated);

export const getPlayer  = (state:State) => state.player;
export const getPlayers = createSelector(getPlayer, player.getPlayers);
export const getPlayersLoaded = createSelector(getPlayer, (player) => player.loaded);

export const getSession = (state: State) => state.session;
export const getSessions = createSelector(getSession, session.getSessions);
