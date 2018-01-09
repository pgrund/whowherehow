import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild,
  ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { State, getPlayersLoaded } from '@app/reducers';
import { LoadAllAction } from '@app/actions/player.actions';

@Injectable()
export class PlayersGuard implements CanActivate, CanActivateChild {

  constructor(private store:Store<State>) {}

  canActivate(): Observable<boolean> {return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    )
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate();
	}

  checkStore(): Observable<boolean> {
    return this.store.select(getPlayersLoaded)
      .pipe(
        tap(loaded => {
          console.log('players guard tpped loaded', loaded);
          if(!loaded) {
            this.store.dispatch(new LoadAllAction());
          }
        }),
        filter(loaded => loaded),
        take(1)
      );
  }
}
