import { PersonCard, Card } from "@app/models/card";
import { Hal, HalLinks, HalLink } from "@app/models/hal";

export enum PlayerState {
  PLAYER,
  DIRECTOR,
  OPEN
}
export type Position = {
  x: number;
  y: number;
};
export class Player extends Hal {
  name: string;
  privateId?: number;
  teamId?: PersonCard;
  position?: Position;
  currentDice?: number;
  numberOfCards?: number;
  cards?: Card[];

  constructor() {
    super();
  }
}
