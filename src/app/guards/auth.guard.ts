import { Injectable } from "@angular/core";
import {
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad
} from "@angular/router";

// import rxjs
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";

import { tap, filter, take, switchMap, catchError } from "rxjs/operators";

// import @ngrx
import { Store } from "@ngrx/store";
import { Go, State, isAuthenticated } from "../store";

import { Player } from "../models/player";
/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthGuard implements CanActivate {
  //}, CanActivateChild, CanLoad {

  /**
   * @constructor
   */
  constructor(private store: Store<State>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore(state.url).pipe(
      switchMap(() => {
        console.debug("auth allows " + state.url);
        return of(true);
      }),
      catchError(() => {
        console.debug("auth denies " + state.url);
        return of(false);
      })
    );
  }

  checkStore(url: string = ""): Observable<boolean> {
    return this.store.select(isAuthenticated).pipe(
      tap(authenticated => {
        console.log("auth guard tapped loaded", authenticated);
        if (!authenticated) {
          let go = new Go({
            path: ["login"],
            query: {
              returnUrl: url
            }
          });
          console.debug("auth redirects", url);
          this.store.dispatch(go);
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
