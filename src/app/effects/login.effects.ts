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
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';

import * as LoginActions from '../actions/login';

import { Player } from '../model/player';
import { Login } from '../model/login';

@Injectable()
export class LoginEffects {

  private BASE_URL = "/api";
  constructor(private actions$: Actions, private http: HttpClient, private store:Store<{users:any}> ) {
      console.log('init logineffects', store);
    }


    @Effect()
    loginUser$: Observable<LoginActions.All> = this.actions$.ofType(LoginActions.LOGIN)
      .map((action: LoginActions.LoginRequestAction) => action.payload)
      .mergeMap((login:Login) => {
        console.log('user login', login);
        return this.http.post<Player>(`${this.BASE_URL}/users`, login)
          .map( (data:Player) => new LoginActions.LoginSuccessAction(data))
          .catch( err => Observable.of(new LoginActions.LoginFailureAction()))

      });

    @Effect()
    pingServer$: Observable<LoginActions.All> = this.actions$.ofType(LoginActions.PING)
      .map((action: LoginActions.PingRequestAction) => action.payload)
      .mergeMap((server:string) => {
        console.log('check server', `${server}/api/`);
        return this.http.head(server +'/api/', {responseType:'text'})
         .catch(err => Observable.of(new LoginActions.PingFailureAction()))
         .map( data => new LoginActions.PingSuccessAction());
      });
}
