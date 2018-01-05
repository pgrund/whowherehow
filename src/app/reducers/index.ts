import { ActionReducerMap, createSelector, Action } from '@ngrx/store';
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

import * as session from './sessions.reducer';
import * as player from './player.reducer';
import * as login from './login.reducer';
import * as router from './router.reducer';
import * as notify from './notification.reducer';

export interface State {
  routerReducer: RouterReducerState<router.RouterStateUrl>
  player: player.State
  auth: login.State
  session: session.State
  messages: notify.State
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  auth: login.reducer,
  player: player.reducer,
  session: session.reducer,
  messages: notify.reducer
};

export const getMessages    = (state:State) => state.messages;
export const getErrors      = createSelector(getMessages, notify.getErrors);
export const getLastError   = createSelector(getErrors, errors => errors.length > 0 ? errors[0] : null);
export const getInfos       = createSelector(getMessages, notify.getInfos);

export const getAuth    = (state:State) => state.auth;
export const getMyInfo = createSelector(getAuth, login.getMyInfo);
export const isAuthenticated = createSelector(getAuth, login.isAuthenticated);

export const getPlayer  = (state:State) => state.player;
export const getPlayers = createSelector(getPlayer, player.getPlayers);
export const getPlayersLoaded = createSelector(getPlayer, (player) => player.loaded);

export const getSession = (state: State) => state.session;
export const getSessions = createSelector(getSession, session.getSessions);
export const getSessionsLoaded = createSelector(getSession, (session) => session.loaded);
