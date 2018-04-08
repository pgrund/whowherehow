import { Injectable } from '@angular/core';
import {
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad
} from '@angular/router';

// import rxjs
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

// import @ngrx
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromAuth from '../store';

import { Player } from '@shared/models/player';
/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthGuard implements CanActivate {
  // }, CanActivateChild, CanLoad {

  /**
   * @constructor
   */
  constructor(
    private store: Store<fromAuth.AuthState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore(state.url).pipe(
      switchMap(() => {
        console.log('auth allows ' + state.url);
        return of(true);
      }),
      catchError(() => {
        console.log('auth denies ' + state.url);
        return of(false);
      })
    );
  }

  checkStore(url: string = ''): Observable<boolean> {
    return this.store.select(fromAuth.isAuthenticated).pipe(
      tap(authenticated => {
        console.log('auth guard tapped loaded', authenticated);
        if (!authenticated) {
          console.log('auth redirects', url);
          this.store.dispatch(
            new fromRoot.Go({
              path: ['login'],
              query: {
                returnUrl: url
              }
            })
          );
        }
      }),
      take(1)
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.checkStore(state.url);
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    return this.checkStore();
  }
}
