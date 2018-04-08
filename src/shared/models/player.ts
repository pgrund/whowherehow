import { PersonCard, Card } from './card';
import { Hal, HalLinks, HalLink } from './hal';

export enum PlayerState {
  PLAYER,
  DIRECTOR,
  OPEN
}
export class Player extends Hal {
  name: string;
  privateId?: number;
  teamId?: PersonCard;
  position?: {
    x: number;
    y: number;
  };
  currentDice?: number;
  numberOfCards?: number;
  cards?: Card[];

  constructor() {
    super();
  }
}
