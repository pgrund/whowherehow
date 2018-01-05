import { Action } from '@ngrx/store';

import { Login } from '@app/model/login';
import { Player } from '@app/model/player';

export const LOGIN =                    '[Login] login'
export const LOGIN_SUCCESS =            '[Login] login success'
export const LOGIN_FAILURE =            '[Login] login failed'
export const RE_LOGIN =                 '[Login] re-login'
export const RE_LOGIN_SUCCESS =         '[Login] re-login success'
export const RE_LOGIN_FAILURE =         '[Login] re-login failed'
export const LOGOUT =                   '[Login] logout'
export const LOGOUT_SUCCESS =           '[Login] logout success'
export const LOGOUT_FAILURE =           '[Login] logout failed'
/**
 * Load Player Actions
 */

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

 constructor(public payload:Error) {
   this.payload.message = '[LOGIN] ' + this.payload.message;
 };
}

export class LogoutRequestAction implements Action {
 readonly type = LOGOUT;

 constructor(public payload:Player) {};
}
export class LogoutSuccessAction implements Action {
 readonly type = LOGOUT_SUCCESS;
}
export class LogoutFailureAction implements Action {
 readonly type = LOGOUT_FAILURE;

  constructor(public payload:Error) {
    this.payload.message = '[LOGOUT] ' + this.payload.message;
  }
}

export class ReLoginRequestAction implements Action {
 readonly type = RE_LOGIN;

 constructor(public payload:Player) {};
}

export type Actions =
  | LoginRequestAction | LoginSuccessAction | LoginFailureAction
  | ReLoginRequestAction
  | LogoutRequestAction | LogoutSuccessAction | LogoutFailureAction;
