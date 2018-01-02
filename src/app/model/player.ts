type PlayerState = 'PLAYER' | 'DIRECTOR';
export interface Player {
  name: string,
  playerId: number,
  state: PlayerState,
  privateId?: number
}
