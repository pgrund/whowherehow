import { PersonCard } from './card';
import { Hal } from './hal';

type PlayerState = 'PLAYER' | 'DIRECTOR';
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
