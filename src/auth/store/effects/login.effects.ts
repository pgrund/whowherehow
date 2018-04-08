import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/flatMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';

import * as fromRoot from '@app/store';
import * as fromActions from '../actions';

import { WebSocketService } from '@app/services/web-socket.service';
import { AuthState, getMyInfo } from '../reducers';

import { Player } from '@shared/models/player';
import { Login } from '../../models/login';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private http: HttpClient,
    private ws: WebSocketService
  ) {}

  @Effect()
  loginUser$: Observable<
    fromActions.LoginActions | fromRoot.RouterActions
  > = this.actions$
    .ofType(fromActions.LOGIN)
    .map((action: fromActions.LoginAction) => action.payload)
    .mergeMap((login: Login) => {
      return this.http
        .post<Player>('/api/players', login)
        .do(() => {
          console.log('connecting WS');
          this.ws.connect();
        })
        .flatMap((data: Player) => [
          new fromActions.LoginSuccessAction(data),
          new fromRoot.Go({
            path: (login.returnUrl ? login.returnUrl : 'home')
              .split('/')
              .filter(s => s.trim().length > 0)
          })
        ])
        .catch(err => Observable.of(new fromActions.LoginFailureAction(err)));
      // .shareReplay();
    });

  @Effect()
  logoutUser$: Observable<
    fromActions.LoginActions | fromRoot.RouterActions
  > = this.actions$
    .ofType(fromActions.LOGOUT)
    .withLatestFrom(this.store.select(getMyInfo))
    .mergeMap(([action, user]) => {
      return this.http
        .delete('/api' + user._links.self.href, { responseType: 'text' })
        .flatMap(() => [
          new fromActions.LogoutSuccessAction(),
          // new fromActions.LogoutDoneAction(),
          new fromRoot.Go({ path: ['/login'], extras: { replaceUrl: true } })
        ])
        .do(() => {
          this.ws.close();
        })
        .catch(err => Observable.of(new fromActions.LogoutFailureAction(err)));
    });

  @Effect()
  reLoginUser$: Observable<fromActions.LoginActions> = this.actions$
    .ofType(fromActions.RE_LOGIN)
    .map((action: fromActions.ReLoginRequestAction) => action.payload)
    .mergeMap((user: Player) => {
      return this.http
        .put<Player>('/api' + user._links.self.href, {
          privateId: user.privateId
        })
        .do(() => {
          console.log('connecting WS');
          this.ws.connect();
        })
        .map((data: Player) => new fromActions.LoginSuccessAction(data))
        .catch(err => Observable.of(new fromActions.LoginFailureAction(err)));
    });
}
