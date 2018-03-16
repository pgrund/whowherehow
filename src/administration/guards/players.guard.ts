import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { tap, filter, take, switchMap, catchError } from "rxjs/operators";

import * as fromStore from "../store";

@Injectable()
export class PlayersGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<fromStore.AdministrationState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log("players guard, canActivateChild ...");
    return this.canActivate();
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPlayersLoaded).pipe(
      tap(loaded => {
        console.log("players guard tapped loaded", loaded);
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPlayersAction());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
