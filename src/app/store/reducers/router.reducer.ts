import { StoreModule, ActionReducerMap } from "@ngrx/store";
import {
  Params,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlHandlingStrategy,
  ActivatedRoute
} from "@angular/router";
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from "@ngrx/router-store";

export interface Breadcrumb {
  name: string;
  path?: string;
}
export interface RouterStateUrl {
  url: string;
  queryParams?: Params;
  params?: Params;
  breadcrumbs?: Breadcrumb[];
}

export interface RouterState {
  routerReducer: RouterReducerState<RouterStateUrl>;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    let breadcrumbs = [];

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      if (state.data && state.data.hasOwnProperty("breadcrumb")) {
        let name = state.data.breadcrumb;
        if (!name && state.params) {
          name = state.params[state.routeConfig.path.substr(1)];
        }
        const path =
          "/" +
          state.pathFromRoot
            .map(u => u.url)
            .filter(s => s.length > 0)
            .join("/");
        breadcrumbs.push({
          name,
          path
        });
      }
      state = state.firstChild;
    }
    if (state.data && state.data.hasOwnProperty("breadcrumb")) {
      let name = state.data.breadcrumb;
      if (!name && state.params) {
        name = state.params[state.routeConfig.path.substr(1)];
      }
      const path =
        "/" +
        state.pathFromRoot
          .map(u => u.url)
          .filter(s => s.length > 0)
          .join("/");
      breadcrumbs.push({
        name,
        path
      });
    }

    //this.getBreadcrumbs(routerState.root);
    const { params } = state;
    return { url, queryParams, params, breadcrumbs };
  }
}

export const reducers: ActionReducerMap<RouterState> = {
  routerReducer: routerReducer
};
