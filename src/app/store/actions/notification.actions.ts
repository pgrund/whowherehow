import { Action } from "@ngrx/store";

import { Chat } from "@app/models/chat";
import { HalLink } from "@app/models/hal";

export const ERROR_ADD = "[Error] Add Error";
export const ERROR_ACK = "[Error] Ack Error";
export const ERROR_ACK_ALL = "[Error] Ack All Errors";
export const RECEIVED_MESSAGE = "[Chat] Received Message";
export const SEND_MESSAGE = "[Chat] Send Message";
export const SEND_MESSAGE_SUCCESS = "[Chat] Send Message Successfull";
export const SEND_MESSAGE_FAILURE = "[Chat] Send Message Failed";
export const NOTIFY_PLAYER_DROPPED = "[Notification] Player Dropped Out";
export const NOTIFY_PLAYER_DROPPED_SESSION =
  "[Notification] Player Dropped Out Of Session";
export const NOTIFY_PLAYER_ADDED = "[Notification] Player Added";
export const NOTIFY_PLAYER_RELOGIN = "[Notification] Player Re-Login";
export const NOTIFY_PLAYER_INVITED = "[Notification] Player Invited";
export const NOTIFY_PLAYER_JOIN_REQUEST =
  "[Notification] Player Join Session Request";
export const NOTIFY_PLAYER_JOINED = "[Notification] Player Joined";
export const NOTIFY_SESSION_ADDED = "[Notification] Session Added";
export const NOTIFY_SESSION_CLOSED = "[Notification] Session Closed";
export const NOTIFY_SESSION_DROPPED = "[Notification] Sesion Dropped Out";

/**
 * Load Error Actions
 */
export class AddErrorAction implements Action {
  readonly type = ERROR_ADD;

  constructor(public payload: Error) {}
}

export class AckErrorAction implements Action {
  readonly type = ERROR_ACK;

  constructor(public payload: number) {}
}

export class AckAllErrorAction implements Action {
  readonly type = ERROR_ACK_ALL;
}

/**
 * Chat Actions
 */
export class ReceivedAction implements Action {
  readonly type = RECEIVED_MESSAGE;

  constructor(public payload: Chat) {}
}

export class SendAction implements Action {
  readonly type = SEND_MESSAGE;

  constructor(public payload: Chat) {}
}

export class SendSuccessAction implements Action {
  readonly type = SEND_MESSAGE_SUCCESS;

  constructor(public payload: Chat) {}
}

export class SendFailureAction implements Action {
  readonly type = SEND_MESSAGE_FAILURE;

  constructor(public payload: Error) {}
}
/**
 * Notification Actions
 */

export class NotifyPlayerAddedAction implements Action {
  readonly type = NOTIFY_PLAYER_ADDED;

  constructor(public payload: HalLink) {}
}

export class NotifyPlayerReLoginAction implements Action {
  readonly type = NOTIFY_PLAYER_RELOGIN;

  constructor(public payload: HalLink) {}
}

export class NotifyPlayerDroppedAction implements Action {
  readonly type = NOTIFY_PLAYER_DROPPED;

  constructor(public payload: HalLink) {}
}

export class NotifyPlayerDroppedSessionAction implements Action {
  readonly type = NOTIFY_PLAYER_DROPPED_SESSION;

  constructor(public payload: HalLink) {}
}

export class NotifyPlayerInvitedAction implements Action {
  readonly type = NOTIFY_PLAYER_INVITED;

  constructor(public payload: HalLink) {}
}

export class NotifySessionAddedAction implements Action {
  readonly type = NOTIFY_SESSION_ADDED;

  constructor(public payload: HalLink) {}
}
export class NotifySessionClosedAction implements Action {
  readonly type = NOTIFY_SESSION_CLOSED;

  constructor(public payload: HalLink) {}
}

export class NotifySessionDroppedAction implements Action {
  readonly type = NOTIFY_SESSION_DROPPED;

  constructor(public payload: HalLink) {}
}

export type NotificationActions =
  | ReceivedAction
  | SendAction
  | SendSuccessAction
  | SendFailureAction
  | NotifyPlayerAddedAction
  | NotifyPlayerDroppedAction
  | NotifyPlayerInvitedAction
  | NotifyPlayerDroppedSessionAction
  | NotifyPlayerReLoginAction
  | NotifySessionClosedAction
  | NotifySessionDroppedAction
  | NotifySessionAddedAction
  | AddErrorAction
  | AckErrorAction
  | AckAllErrorAction;
