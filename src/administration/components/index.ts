import { PlayerDetailComponent } from "./player-detail/player-detail.component";
import { PlayerListComponent } from "./player-list/player-list.component";

import { SessionListComponent } from "./session-list/session-list.component";
import { SessionDetailComponent } from "./session-detail/session-detail.component";
import { SessionNewComponent } from "./session-new/session-new.component";
import { SessionLinksComponent } from "./session-links/session-links.component";
import { SessionActionsComponent } from "./session-actions/session-actions.component";

export const components = [
  PlayerListComponent,
  PlayerDetailComponent,
  SessionListComponent,
  SessionDetailComponent,
  SessionNewComponent,
  SessionLinksComponent,
  SessionActionsComponent
];

export const entryComponents = [];

export * from "./player-detail/player-detail.component";
export * from "./player-list/player-list.component";
export * from "./session-list/session-list.component";
export * from "./session-detail/session-detail.component";
export * from "./session-new/session-new.component";
export * from "./session-links/session-links.component";
export * from "./session-actions/session-actions.component";
