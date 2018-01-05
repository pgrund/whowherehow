import { Player } from './player';
import { Session } from './session';

export interface Chat {
  sender: Player,
  receiver: Player | Session,
  message: string
}
