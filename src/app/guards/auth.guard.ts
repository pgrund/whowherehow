import { Injectable } from "@angular/core";
import {
  Route, Router,
  ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate, CanActivateChild, CanLoad,
} from '@angular/router';

// import rxjs
import { Observable } from "rxjs";
import { of } from 'rxjs/observable/of';

import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

// import @ngrx
import { Store } from "@ngrx/store";
import * as RouterActions from "@app/actions/router.actions";

import { isAuthenticated, State } from '@app/reducers';
import { Player } from '@app/model/player'
/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthGuard implements CanActivate{ //}, CanActivateChild, CanLoad {

  /**
   * @constructor
   */
  constructor(private store: Store<State>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkStore(state.url).pipe(
      switchMap(() => {console.debug('auth allows ' + state.url);return of(true)}),
      catchError(() => {console.debug('auth denies ' + state.url);return of(false)})
    )
  }

  checkStore(url: string = ''): Observable<boolean> {
    return this.store.select(isAuthenticated)
      .pipe(
        tap(authenticated => {
          console.log(isAuthenticated && document.cookie.indexOf('privateId')>-1);
          if(!authenticated) {
            let go = new RouterActions.Go({
              path:['login'],
              query: {
                returnUrl: url
              }
            });
            console.debug('auth redirects', url);
            this.store.dispatch(go);
          }
        }),
        take(1)
      );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkStore(state.url);
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    console.log('auth checks for loading')
    return this.checkStore();
  }
}
