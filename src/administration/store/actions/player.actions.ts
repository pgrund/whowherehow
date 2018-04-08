import { Action } from '@ngrx/store';
import { Player } from '@shared/models/player';

export const LOAD_PLAYERS = '[Player] Load All';
export const LOAD_PLAYERS_SUCCESS = '[Player] Load All Success';
export const LOAD_PLAYERS_FAIL = '[Player] Load Fail';
export const UPDATE_PLAYER = '[Player] Update';

/**
 * Load Player Actions
 */

export class LoadPlayersAction implements Action {
  readonly type = LOAD_PLAYERS;
}

export class LoadPlayersSuccessAction implements Action {
  readonly type = LOAD_PLAYERS_SUCCESS;

  constructor(public payload: Player[]) {}
}

export class UpdatePlayerAction implements Action {
  readonly type = UPDATE_PLAYER;

  constructor(public payload: Player) {}
}

export class LoadPlayersFailAction implements Action {
  readonly type = LOAD_PLAYERS_FAIL;

  constructor(public payload: Error) {
    this.payload.message = '[Player] ' + this.payload.message;
  }
}

export type PlayerActions =
  | LoadPlayersAction
  | LoadPlayersSuccessAction
  | UpdatePlayerAction
  | LoadPlayersFailAction;
