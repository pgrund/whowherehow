import { ActionReducerMap, createSelector, Action } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as fromRouter from './router.reducer';
import * as notify from './notification.reducer';

export interface State {
  routerReducer: RouterReducerState<fromRouter.RouterStateUrl>;
  notifications: notify.NotificationState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  notifications: notify.reducer
};

export const getRouterState = (state: State) => state.routerReducer;
export const getBreadcrumbs = createSelector(getRouterState, router => {
  const res = router && router.state && router.state.breadcrumbs;
  return res || [];
});

export const getNotificationState = (state: State) => state.notifications;

export { CustomSerializer } from './router.reducer';
