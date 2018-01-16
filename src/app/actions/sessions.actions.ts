import { Action } from '@ngrx/store';

import { Session } from '@app/model/session';

export const LOAD_ALL =               '[Sessions] Load All';
export const LOAD_ALL_SUCCESS =       '[Sessions] Load All Success';
export const LOAD_FAIL =              '[Sessions] Load Fail';
export const JOIN =                   '[Sessions] Join';
export const JOIN_SUCCESS =           '[Sessions] Join Success';
export const KICK_OUT =               '[Sessions] Kick Out Player';
export const KICK_OUT_SUCCESS =       '[Sessions] Kick Out Player Success';
export const CREATE_SESSION =         '[Sessions] Create New Session';
export const CREATE_SESSION_SUCCESS = '[Sessions] Create Session Success';
export const CLOSE_SESSION =          '[Sessions] Close Session';
export const CLOSE_SESSION_SUCCESS =  '[Sessions] Close Session Success';
/**
 * Load Sessions Actions
 */
export class LoadAllAction implements Action {
  readonly type = LOAD_ALL;
}

export class LoadAllSuccessAction implements Action {
  readonly type = LOAD_ALL_SUCCESS;

  constructor(public payload: Session[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: Error) {
    this.payload.message = '[SESSION] ' + this.payload.message;
  }
}

export class JoinAction implements Action {
  readonly type = JOIN;

  constructor(public payload: string) {}
}

export class JoinSuccessAction implements Action {
  readonly type = JOIN_SUCCESS;

  constructor(public payload: Session) { }
}

export class KickOutAction implements Action {
  readonly type = KICK_OUT;

  constructor(public payload: {session:string, player:string}) {}
}

export class KickOutSuccessAction implements Action {
  readonly type = KICK_OUT_SUCCESS;

  constructor(public payload: Session) { }
}

export class CreateSessionAction implements Action {
  readonly type = CREATE_SESSION;

  constructor(public payload: string) { }
}
export class CreateSessionSuccessAction implements Action {
  readonly type = CREATE_SESSION_SUCCESS;

  constructor(public payload: Session) { }
}

export class CloseSessionAction implements Action {
  readonly type = CLOSE_SESSION;

  constructor(public payload: string) { }
}

export class CloseSessionSuccessAction implements Action {
  readonly type = CLOSE_SESSION_SUCCESS;

  constructor(public payload: Session) { }
}


export type Actions =
  | LoadAllAction | LoadAllSuccessAction
  | JoinAction | JoinSuccessAction
  | KickOutAction | KickOutSuccessAction
  | CreateSessionAction | CreateSessionSuccessAction
  | CloseSessionAction | CloseSessionSuccessAction
  | LoadFailAction;
