import { PlayersGuard } from "./players.guard";
import { SessionsGuard } from "./sessions.guard";

export const guards: any[] = [PlayersGuard, SessionsGuard];

export * from "./players.guard";
export * from "./sessions.guard";
