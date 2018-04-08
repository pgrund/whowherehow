import { createSelector } from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromFeature from '../reducers';
import * as fromSession from '../reducers/sessions.reducer';

import { Session } from '@shared/models/session';

export const getSessionEntities = createSelector(
  fromFeature.getSessionState,
  fromSession.getSessionEntities
);

export const getSelectedSession = createSelector(
  getSessionEntities,
  fromRoot.getRouterState,
  (entities, router): Session => {
    return (
      router.state && entities['/sessions/' + router.state.params.sessionId]
    );
  }
);

export const getAllSessions = createSelector(getSessionEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getSessionLoaded = createSelector(
  fromFeature.getSessionState,
  fromSession.getSessionsLoaded
);

export const getSessionLoading = createSelector(
  fromFeature.getSessionState,
  fromSession.getSessionsLoading
);
