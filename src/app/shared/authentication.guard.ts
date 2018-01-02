import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";

// import rxjs
import { Observable } from "rxjs/Observable";

// import @ngrx
import { Store } from "@ngrx/store";
import * as RouterActions from "./router.actions";

import { isAuthenticated, State } from '../app.reducers';
import { Player } from '../model/player'
/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {

  /**
   * @constructor
   */
  constructor(private store: Store<State>) {}

  /**
   * True when user is authenticated
   * @method canActivate
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // get observable
    const observable = this.store.select(isAuthenticated);

    // redirect to sign in page if user is not authenticated
    observable.subscribe((authenticated:boolean) => {
      if (!authenticated) {
        this.store.dispatch(new RouterActions.Go({path: ['/users/sign-in']}));
      }
    });

    return observable;
  }
}
