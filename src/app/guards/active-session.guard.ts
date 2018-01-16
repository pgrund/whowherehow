import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild,
ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { tap, filter, take, switchMap, catchError, map} from 'rxjs/operators';

import { State, getActiveSession} from '@app/reducers';
import * as RouterActions from "@app/actions/router.actions";
import { Session } from '@app/model/session';

@Injectable()
export class ActiveSessionGuard implements CanActivate {

  constructor(private store:Store<State>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.checkStore(state.url).pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
    }

    checkStore(url: string = ''): Observable<boolean> {
      let sessId = +url.split("/")[2];
      console.log('active session guard for id ', sessId);
      return this.store.select(getActiveSession(sessId))
      .pipe(
        tap(isActive => {
          if(!isActive) {
            let go = new RouterActions.Go({
              path:['sessions']
            });
            console.debug('active session redirects', url);
            this.store.dispatch(go);
          }
        }),
        take(1)
      );
    }
}
