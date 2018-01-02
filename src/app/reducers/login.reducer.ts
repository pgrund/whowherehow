import * as LoginActions from '../actions/login';
// import { Config } from '../model/config';
import { Player } from '../model/player';

import { createSelector, createFeatureSelector} from '@ngrx/store';

export type Action = LoginActions.All;

export interface State {
  me: Player | null,
  players: Player[],
  errors: any[]
}

const defaultState: State  = {
    me: null,
    players: [],
    errors: []
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
}

export function reducer (state = defaultState, action: Action ) {
  console.log('login reducer', state, action);
  switch(action.type) {
    case LoginActions.LOGIN_SUCCESS:
      let loginSuccess:LoginActions.LoginSuccessAction = action;
      console.log('reducer:', loginSuccess);
      return newState(state,{ me : loginSuccess.payload});
    case LoginActions.LOGIN_FAILURE:
      return newState(defaultState, {errors: [...state.errors, 'Login Failed']});
    case LoginActions.SET_SERVER:
    case LoginActions.PING_SUCCESS:
    case LoginActions.PING_FAILURE:
      console.log('not used any more ...', action.type)
      return state;
    // case ConfigActions.UPDATE_URLS:
    //   return newState(state, {urls: action['payload']});
    // case ConfigActions.UPDATE_SPARQL_URL:
    //   return newState(state, { urls: newState(state.urls, {ontology: action['payload']})})
    // case ConfigActions.UPDATE_CLUSTER_URL:
    //   return newState(state, { urls: newState(state.urls, {cluster: action['payload']})})
    // case ConfigActions.LOADING:
    //   return newState(state, { loading: true});
    // case ConfigActions.LOADING_DONE:
    //   return newState(state, { loading: false});
    default:
      return state;
  }
}

export const getMe = (state:State) => state.me;
export const getPlayers = (state:State) => state.players;
// export const getLoading = createSelector(getConfig, (c:Config) => c.loading);
// export const getUrls = createSelector(getConfig, (c:Config) => c.urls);
