import * as sessions from "../actions/sessions.actions";
import { Session } from "@app/models/session";

export interface SessionState {
  entities: { [id: string]: Session };
  loaded: boolean;
  loading: boolean;
  selected: Session;
}

export const initialState: SessionState = {
  entities: {},
  loaded: false,
  loading: false,
  selected: null
};

export function reducer(
  state = initialState,
  action: sessions.SessionActions
): SessionState {
  console.debug("SESSION", action);
  switch (action.type) {
    case sessions.LOAD_SESSIONS:
    case sessions.KICK_OUT_SESSION:
    case sessions.CREATE_SESSION:
    case sessions.CLOSE_SESSION: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case sessions.LOAD_SESSIONS_SUCCESS: {
      const sessions = action.payload;
      const entities = sessions.reduce(
        (entities: { [id: string]: Session }, session) => {
          return {
            ...entities,
            [session._links.self.href]: session
          };
        },
        {
          ...state.entities
        }
      );
      return {
        ...state,
        entities,
        loaded: true,
        loading: false,
        selected: null
      };
    }
    case sessions.CREATE_SESSION_SUCCESS:
    case sessions.UPDATE_SESSION: {
      const session: Session = action.payload;
      const entities = {
        ...state.entities,
        [session._links.self.href]: session
      };
      return {
        ...state,
        entities
      };
    }

    case sessions.SELECT_SESSION: {
      const session = state.entities[action.payload.href];
      return {
        ...state,
        selected: session
      };
    }
    default: {
      return state;
    }
  }
}

export const getSessionEntities = (state: SessionState) => state.entities;
export const getSessionsLoaded = (state: SessionState) => state.loaded;
export const getSessionsLoading = (state: SessionState) => state.loading;
export const getSessionsSelected = (state: SessionState) => state.selected;
