import { Action } from '@ngrx/store';

import { Chat } from '@app/model/chat';
import { Player } from '@app/model/player';
import { Session } from '@app/model/session';

export const ERROR_ADD     =         '[Error] Add Error';
export const ERROR_ACK     =         '[Error] Ack Error';
export const ERROR_ACK_ALL =         '[Error] Ack All Errors';
export const RECEIVED_MESSAGE =      '[Chat] Received Message';
export const SEND_MESSAGE =          '[Chat] Send Message';
export const SEND_MESSAGE_SUCCESS =  '[Chat] Send Message Successfull';
export const NOTIFY_PLAYER_DROPPED = '[Notification] Player Dropped Out';
export const NOTIFY_PLAYER_DROPPED_SESSION = '[Notification] Player Dropped Out Of Session';
export const NOTIFY_PLAYER_ADDED =   '[Notification] Player Added';
export const NOTIFY_PLAYER_RELOGIN = '[Notification] Player Re-Login;
export const NOTIFY_PLAYER_INVITED = '[Notification] Player Invited;
export const NOTIFY_SESSION_CLOSED = '[Notification] Session Closed';
export const NOTIFY_SESSION_DROPPED ='[Notification] Sesion Dropped Out';


/**
 * Load Error Actions
 */
export class AddErrorAction implements Action {
  readonly type = ERROR_ADD;

  constructor(public payload: Error){}
}

export class AckErrorAction implements Action {
  readonly type = ERROR_ACK;

  constructor(public payload: number) { }
}

export class AckAllErrorAction implements Action {
  readonly type = ERROR_ACK_ALL;
}

/**
 * Chat Actions
 */
export class ReceivedAction implements Action {
  readonly type = RECEIVED_MESSAGE;

  constructor(public payload: Chat){}
}

export class SendAction implements Action {
  readonly type = SEND_MESSAGE;

  constructor(public payload: Chat) { }
}

export class SendSuccessAction implements Action {
  readonly type = SEND_MESSAGE_SUCCESS;

  constructor(public payload: Chat) { }
}

/**
 * Notification Actions
 */

 export class NotifyPlayerAddedAction implements Action {
   readonly type = NOTIFY_PLAYER_ADDED;

   constructor(public payload: Player) { }
 }

 export class NotifyPlayerReLoginAction implements Action {
   readonly type = NOTIFY_PLAYER_RELOGIN;

   constructor(public payload: string) { }
 }

 export class NotifyPlayerDroppedAction implements Action {
   readonly type = NOTIFY_PLAYER_DROPPED;

   constructor(public payload: string) { }
 }

 export class NotifyPlayerDroppedSessionAction implements Action {
   readonly type = NOTIFY_PLAYER_DROPPED_SESSION;

   constructor(public payload: Player) { }
 }

 export class NotifyPlayerInvitedAction implements Action {
   readonly type = NOTIFY_PLAYER_INVITED;

   constructor(public payload: string) { }
 }

 export class NotifySessionClosedAction implements Action {
   readonly type = NOTIFY_SESSION_CLOSED;

   constructor(public payload: Session) { }
 }

 export class NotifySessionDroppedAction implements Action {
   readonly type = NOTIFY_SESSION_DROPPED;

   constructor(public payload: string) { }
 }

export type Actions =
  | ReceivedAction | SendAction | SendSuccessAction
  | NotifyPlayerAddedAction | NotifyPlayerDroppedAction | NotifyPlayerInvitedAction
  | NotifyPlayerDroppedSessionAction | NotifyPlayerReLoginAction
  | NotifySessionClosedAction | NotifySessionDroppedAction
  | AddErrorAction
  | AckErrorAction | AckAllErrorAction;
