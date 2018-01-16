import { AuthGuard } from './auth.guard';
import { PlayersGuard } from './players.guard';
import { SessionsGuard } from './sessions.guard';
import { ActiveSessionGuard } from './active-session.guard';

export const guards:any[] = [
  AuthGuard,
  PlayersGuard,
  SessionsGuard,
  ActiveSessionGuard
];

export * from './auth.guard';
export * from './players.guard';
export * from './sessions.guard';
export * from './active-session.guard';
