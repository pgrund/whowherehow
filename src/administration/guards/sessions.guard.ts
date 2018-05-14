import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable ,  of } from "rxjs";

import { tap, filter, take, switchMap, catchError } from "rxjs/operators";

import * as fromStore from "../store";

@Injectable()
export class SessionsGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<fromStore.AdministrationState>) {}

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getSessionLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadSessionsAction());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
