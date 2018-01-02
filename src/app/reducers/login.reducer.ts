import * as LoginActions from '../actions/login';
// import { Config } from '../model/config';
// import { URLs } from '../model/config';

import { createSelector, createFeatureSelector} from '@ngrx/store';

export type Action = LoginActions.All;

const defaultState = {
    server: {
      host: location.protocol + "//" + location.host,
      validated: false
    },
    user: '',
    errors: []
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
}

export function reducer (state = defaultState, action: Action ) {
  console.log('login reducer', state, action);
  switch(action.type) {
    case LoginActions.LOGIN_SUCCESS:
      return newState(state,{ user: action['payload']['user'],
              server:{ host: action['payload']['server'], validated: true }});
    case LoginActions.LOGIN_FAILURE:
      return newState(defaultState, {errors: [...state.errors, 'Login Failed']});
    case LoginActions.SET_SERVER:
      return newState( state, {server: newState(state.server, { host: action['payload'] })});
    case LoginActions.PING_SUCCESS:
      return newState( state, {server:newState(state.server, { validated: true })});
    case LoginActions.PING_FAILURE:
      return newState( state, {server:newState(state.server, { validated: false })});
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

// export const getConfig = createFeatureSelector<Config>('config')
// export const getLoading = createSelector(getConfig, (c:Config) => c.loading);
// export const getUrls = createSelector(getConfig, (c:Config) => c.urls);
