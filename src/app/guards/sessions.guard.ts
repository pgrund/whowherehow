import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild,
ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { State, getSessionsLoaded } from '@app/reducers';
import { LoadAllAction } from '@app/actions/sessions.actions';

@Injectable()
export class SessionsGuard implements CanActivate, CanActivateChild {

  constructor(private store:Store<State>) {}

  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    )
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getSessionsLoaded)
      .pipe(
        tap(loaded => {
          if(!loaded) {
            this.store.dispatch(new LoadAllAction());
          }
        }),
        filter(loaded => loaded),
        take(1)
      );
  }
}
