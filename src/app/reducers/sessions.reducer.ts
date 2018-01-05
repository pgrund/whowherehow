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

    case sessions.LOAD_ALL: {
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

    default: {
      return state;
    }
  }
}

export const getSessions = (state:State) => state.sessions;
