import * as sessions from '@app/actions/sessions.actions';
import { Session } from '@app/model/session';

export interface State {
  sessions: Session[];
  loaded: boolean,
  loading: boolean,
  current: Session;
}

export const initialState: State = {
  sessions: [],
  loaded: false,
  loading: false,
  current: null
}


export function reducer(state = initialState, action: sessions.Actions): State {
  console.debug('SESSION', action);
  switch (action.type) {

    case sessions.LOAD_ALL:
    case sessions.KICK_OUT:
    case sessions.JOIN:
    case sessions.CREATE_SESSION:
    case sessions.CLOSE_SESSION: {
      return {
        ...state,
        loaded: false,
        loading: true
      }
    }
    case sessions.LOAD_ALL_SUCCESS: {
      return {
        sessions: (<sessions.LoadAllSuccessAction>action).payload,
        loaded: true,
        loading: false,
        current: null
      };
    }
    case sessions.JOIN_SUCCESS: {
      let updated: Session = (<sessions.JoinSuccessAction>action).payload;
      return {
        ...state,
        sessions: state.sessions.filter(s => s.sessionName != updated.sessionName).concat(updated),
        loaded: true,
        loading: false,
      };
    }
    case sessions.KICK_OUT_SUCCESS: {
      let updated: Session = (<sessions.KickOutSuccessAction>action).payload;
      return {
        ...state,
        sessions: state.sessions.filter(s => s.sessionName != updated.sessionName).concat(updated),
        loaded: true,
        loading: false,
      };
    }
    case sessions.CREATE_SESSION_SUCCESS: {
      return {
        ...state,
        sessions: [...state.sessions, (<sessions.CreateSessionSuccessAction>action).payload],
        loaded: true,
        loading: false,
      };
    }
    case sessions.CLOSE_SESSION_SUCCESS: {
      let updated: Session = (<sessions.CloseSessionSuccessAction>action).payload;
      return {
        ...state,
        sessions: state.sessions.filter(s => s.sessionName != updated.sessionName).concat(updated),
        loaded: true,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const getSessions = (state:State) => state.sessions;
