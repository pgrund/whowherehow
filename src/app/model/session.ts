import { Player } from './player';
import { Hal, HalLinks, HalLink } from './hal';

export enum SessionState { OPEN, CLOSED };
export class Session extends Hal {
  activePlayer?: HalLink;
  sessionName: string;
  // sessionId?: number,
  director: HalLink

  constructor() {
    super();
  }

}
