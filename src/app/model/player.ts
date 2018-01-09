import { PersonCard } from './card';
import { Hal, HalLinks, HalLink } from './hal';

export enum PlayerState { PLAYER, DIRECTOR };
export type Position = {
  x: number,
  y: number
}
export interface Player extends Hal {
  name: string,
  privateId?: number,
  teamId?: PersonCard,
  position?: Position,
  currentDice?: number,
  numberOfCards?: number
}

export class InternalPlayer implements Player {

  name:string;
  _links:HalLinks;

  constructor(player: Player) {
    Object.keys(player).forEach( key => {
      this[key] = player[key];
    })
  }


  public joinedSession(): HalLink|null {
    return this._links.game;
  }

  public isAdmin(): HalLink|null {
    return this._links.admin;
  }
}
