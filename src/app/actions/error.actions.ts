import { Action } from '@ngrx/store';

export const ERROR_ADD =   '[Error] add error';
export const ERROR_ACK =   '[Error] add error';

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

export type Actions =
  | AddErrorAction
  | AckErrorAction;
