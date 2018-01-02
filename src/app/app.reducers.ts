import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Routes, RouterModule, Params, RouterStateSnapshot } from '@angular/router';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer, RouterReducerState,
  RouterStateSerializer} from "@ngrx/router-store";

// import * as users from './users/users.reducers';
import * as login from './reducers/login.reducer';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
  player: login.State
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    const params = route.params;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  player: login.reducer
};

export const getPlayer = (state:State) => state.player;

export const getMyInfo = createSelector(getPlayer, login.getMe);
export const isAuthenticated = createSelector(getMyInfo, (player) => player != null && player.privateId != null);
export const getPlayers = createSelector(getPlayer, login.getPlayers);
