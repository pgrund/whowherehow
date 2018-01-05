import { Action } from '@ngrx/store';

import { Session } from '@app/model/session';

export const LOAD_ALL =             '[Sessions] Load All';
export const LOAD_ALL_SUCCESS =     '[Sessions] Load All Success';
export const LOAD_FAIL =            '[Sessions] Load Fail';

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

export type Actions =
  | LoadAllAction | LoadAllSuccessAction
  | LoadFailAction;
