import { Action } from '@ngrx/store';
import { Player } from '@app/model/player';
import { Login } from '@app/model/login';

export const LOAD_ALL =              '[Player] Load All';
export const LOAD_ALL_SUCCESS =      '[Player] Load All Success';
export const LOAD_FAIL =             '[Player] Load Fail';


/**
 * Load Player Actions
 */


export class LoadAllAction implements Action {
  readonly type = LOAD_ALL;
}

export class LoadAllSuccessAction implements Action {
  readonly type = LOAD_ALL_SUCCESS;

  constructor(public payload: Player[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload:Error) {
    this.payload.message = '[Player] ' + this.payload.message;
  }
}

export type Actions =
  | LoadAllAction | LoadAllSuccessAction
  | LoadFailAction;
