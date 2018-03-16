import { createSelector } from "@ngrx/store";

import * as fromRoot from "@app/store";
import * as fromFeature from "../reducers";
import * as fromPlayer from "../reducers/player.reducer";

import { Player } from "@app/models/player";

export const getPlayerEntities = createSelector(
  fromFeature.getPlayerState,
  fromPlayer.getPlayerEnities
);

export const getSelectedPlayer = createSelector(
  getPlayerEntities,
  fromRoot.getRouterState,
  (entities, router): Player => {
    return router.state && entities["/players/" + router.state.params.playerId];
  }
);

export const getAllPlayers = createSelector(getPlayerEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getPlayersLoaded = createSelector(
  fromFeature.getPlayerState,
  fromPlayer.getPlayerLoaded
);

export const getPlayersLoading = createSelector(
  fromFeature.getPlayerState,
  fromPlayer.getPlayerLoading
);
