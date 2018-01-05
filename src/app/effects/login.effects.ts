import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {Store,  Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
//import 'rxjs/add/operator/flatMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';

import { Actions as RouterActions,
  Go
} from '@app/actions/router.actions';

import { Actions as LoginActions,
  LoginRequestAction, LoginSuccessAction, LoginFailureAction,
  LogoutRequestAction, LogoutSuccessAction, LogoutFailureAction,
  ReLoginRequestAction,
  LOGIN, LOGOUT, RE_LOGIN
} from '@app/actions/login.actions';

import { Actions as PlayerActions } from '@app/actions/player.actions';

import { State } from '@app/reducers';

import { Player } from '@app/model/player';
import { Login } from '@app/model/login';

@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions, private http: HttpClient, private store:Store<State> ) {
      console.log('init logineffects', store);
    }


    @Effect()
    loginUser$: Observable<LoginActions | RouterActions> = this.actions$.ofType(LOGIN)
      .map((action: LoginRequestAction) => action.payload)
      .mergeMap((login:Login) => {
        console.log('user login', login);
        return this.http.post<Player>('/api/players', login)
          .flatMap( (data:Player) => [
              new LoginSuccessAction(data),
              new Go({ path: login.returnUrl.split('/').filter(s => s.trim().length > 0)})
          ])
          .catch( err => Observable.of(new LoginFailureAction(err)))

      });

    @Effect()
    logoutUser$: Observable<LoginActions | RouterActions> = this.actions$.ofType(LOGOUT)
      .map((action: LogoutRequestAction) => action.payload)
      .mergeMap((user:Player) => {
        console.log('user logout', '/api' + user._links.self.href);
        return this.http.delete('/api' + user._links.self.href, { responseType: 'text'})
          .flatMap(() => [
            new LogoutSuccessAction(),
            new Go({ path: ['' ]})
          ])
          .catch( err => Observable.of(new LogoutFailureAction(err)));
      });

    @Effect()
    reLoginUser$: Observable<LoginActions> = this.actions$.ofType(RE_LOGIN)
      .map((action: ReLoginRequestAction) => action.payload)
      .mergeMap((user:Player) => {
        console.log('re-login', user);
        return this.http.put<Player>('/api' + user._links.self.href, { privateId: user.privateId })
          .map( (data:Player) => new LoginSuccessAction(data))
          .catch( err => Observable.of(new LoginFailureAction(err)))
      });
}
