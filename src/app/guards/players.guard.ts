import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { State, getPlayersLoaded } from '@app/reducers';
import { LoadAllAction } from '@app/actions/player.actions';

@Injectable()
export class PlayersGuard implements CanActivate {
  constructor(private store:Store<State>) {}

  canActivate(): Observable<boolean> {
    console.log('check players guard')
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    )
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getPlayersLoaded)
      .pipe(
        tap(loaded => {
          if(!loaded) {
            this.store.dispatch(new LoadAllAction());
          }
        }),
        filter(loaded => {console.log('loaded', loaded);return loaded}),
        take(1)
      );
  }
}
