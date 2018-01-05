import { Player } from './player';
import { Hal } from './hal';

type SessionState = 'OPEN' | 'CLOSED';
export interface Session extends Hal {
  teamMates: Player[],
  activePlayer: Player,
  state: SessionState
  sessionName: string,
  sessionId: number,
  director: Player
}
