import { Action } from '@ngrx/store';

import { Session } from '@shared/models/session';
import { Player } from '@shared/models/player';
import { HalLink } from '@shared/models/hal';

export const LOAD_SESSIONS = '[Sessions] Load All';
export const LOAD_SESSIONS_SUCCESS = '[Sessions] Load All Success';
export const LOAD_SESSIONS_FAIL = '[Sessions] Load Fail';
export const JOIN_SESSION = '[Sessions] Join';
export const JOIN_SESSION_SUCCESS = '[Sessions] Join Success';
export const INVITE_SESSION = '[Sessions] Invite';
export const INVITE_SESSION_SUCCESS = '[Sessions] Invite Success';
export const KICK_OUT_SESSION = '[Sessions] Kick Out Player';
export const KICK_OUT_SESSION_SUCCESS = '[Sessions] Kick Out Player Success';
export const APPROVE_SESSION = '[Sessions] Approve Player';
export const APPROVE_SESSION_SUCCESS = '[Sessions] Approve Player Success';
export const CREATE_SESSION = '[Sessions] Create New Session';
export const CREATE_SESSION_SUCCESS = '[Sessions] Create Session Success';
export const CLOSE_SESSION = '[Sessions] Close Session';
export const CLOSE_SESSION_SUCCESS = '[Sessions] Close Session Success';
export const ACTIVE_SESSION = '[Sessions] Active Session';
export const SELECT_SESSION = '[Sessions] Select Session';
export const UPDATE_SESSION = '[Sessions] Update Session';
export const ACTIVE_SESSION_SUCCESS = '[Sessions] Active Session Success';
/**
 * Load Sessions Actions
 */
export class LoadSessionsAction implements Action {
  readonly type = LOAD_SESSIONS;
}

export class LoadSessionsSuccessAction implements Action {
  readonly type = LOAD_SESSIONS_SUCCESS;

  constructor(public payload: Session[]) {}
}

export class LoadSessionsFailAction implements Action {
  readonly type = LOAD_SESSIONS_FAIL;

  constructor(public payload: Error) {
    this.payload.message = '[SESSION] ' + this.payload.message;
  }
}

export class JoinSessionAction implements Action {
  readonly type = JOIN_SESSION;

  constructor(public payload: string) {}
}

export class JoinSessionSuccessAction implements Action {
  readonly type = JOIN_SESSION_SUCCESS;

  constructor(public payload: Player) {}
}

export class InviteSessionAction implements Action {
  readonly type = INVITE_SESSION;

  constructor(public payload: string) {}
}

export class InviteSessionSuccessAction implements Action {
  readonly type = INVITE_SESSION_SUCCESS;

  constructor(public payload: Player) {}
}

export class ApproveSessionAction implements Action {
  readonly type = APPROVE_SESSION;

  constructor(public payload: string) {}
}

export class ApproveSessionSuccessAction implements Action {
  readonly type = APPROVE_SESSION_SUCCESS;

  constructor(public payload: Player) {}
}

export class KickOutSessionAction implements Action {
  readonly type = KICK_OUT_SESSION;

  constructor(public payload: { session: string; player: string }) {}
}

export class KickOutSessionSuccessAction implements Action {
  readonly type = KICK_OUT_SESSION_SUCCESS;

  constructor(public payload: Session) {}
}

export class CreateSessionAction implements Action {
  readonly type = CREATE_SESSION;

  constructor(public payload: string) {}
}
export class CreateSessionSuccessAction implements Action {
  readonly type = CREATE_SESSION_SUCCESS;

  constructor(public payload: Session) {}
}

export class CloseSessionAction implements Action {
  readonly type = CLOSE_SESSION;

  constructor(public payload: string) {}
}

export class CloseSessionSuccessAction implements Action {
  readonly type = CLOSE_SESSION_SUCCESS;

  constructor(public payload: Session) {}
}

export class ActiveSessionAction implements Action {
  readonly type = ACTIVE_SESSION;
}

export class ActiveSessionSuccessAction implements Action {
  readonly type = ACTIVE_SESSION_SUCCESS;

  constructor(public payload: HalLink) {}
}

export class SelectSessionAction implements Action {
  readonly type = SELECT_SESSION;

  constructor(public payload: HalLink) {}
}

export class UpdateSessionAction implements Action {
  readonly type = UPDATE_SESSION;

  constructor(public payload: Session) {}
}

export type SessionActions =
  | LoadSessionsAction
  | LoadSessionsSuccessAction
  | LoadSessionsFailAction
  | JoinSessionAction
  | JoinSessionSuccessAction
  | ApproveSessionAction
  | ApproveSessionSuccessAction
  | InviteSessionAction
  | InviteSessionSuccessAction
  | KickOutSessionAction
  | KickOutSessionSuccessAction
  | UpdateSessionAction
  | CreateSessionAction
  | CreateSessionSuccessAction
  | CloseSessionAction
  | CloseSessionSuccessAction
  | ActiveSessionAction
  | ActiveSessionSuccessAction
  | SelectSessionAction;
