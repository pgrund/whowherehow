import { Action } from '@ngrx/store';

import { Chat } from '@app/model/chat';

export const ERROR_ADD     =        '[Error] add error';
export const ERROR_ACK     =        '[Error] ack error';
export const ERROR_ACK_ALL =        '[Error] ack all errors';
export const RECEIVED_MESSAGE =     '[Chat] Received Message';
export const SEND_MESSAGE =         '[Chat] Send Message';
export const SEND_MESSAGE_SUCCESS = '[Chat] Send Message successfull';


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


export type Actions =
  | ReceivedAction | SendAction | SendSuccessAction
  | AddErrorAction
  | AckErrorAction | AckAllErrorAction;
