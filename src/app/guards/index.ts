import { AuthGuard } from './auth.guard';
import { PlayersGuard } from './players.guard';
import { SessionsGuard } from './sessions.guard';

export const guards:any[] = [
  AuthGuard,
  PlayersGuard,
  SessionsGuard
];

export * from './auth.guard';
export * from './players.guard';
export * from './sessions.guard';
