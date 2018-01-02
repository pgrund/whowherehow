import { Action } from '@ngrx/store';
import { Player } from '../model/player';
import { Login } from '../model/login';

export const LOGIN         =  '[Login] login user'
export const LOGIN_SUCCESS =  '[Login] user logged in'
export const LOGIN_FAILURE =  '[Login] user NOT logged in'
export const PING          =  '[Login] ping server'
export const PING_SUCCESS  =  '[Login] ping server available'
export const PING_FAILURE  =  '[Login] ping server NOT available'
export const SET_SERVER    =  '[Login] set server'

export class LoginRequestAction implements Action {
  readonly type = LOGIN;
  constructor(public payload:Login) {};
}
export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload:Player) {};
}
export class LoginFailureAction implements Action {
  readonly type = LOGIN_FAILURE;
}
export class PingRequestAction implements Action {
  readonly type = PING;
  constructor(public payload: string) {};
}
export class PingSuccessAction implements Action {
  readonly type = PING_SUCCESS;
  constructor() {};
}
export class PingFailureAction implements Action {
  readonly type = PING_FAILURE;
  constructor() {};
}
export class SetServerAction implements Action {
  readonly type = SET_SERVER;
  constructor(public payload: string) {};
}
export type All =
  LoginRequestAction | LoginSuccessAction | LoginFailureAction |
  SetServerAction |
  PingRequestAction | PingSuccessAction | PingFailureAction ;
