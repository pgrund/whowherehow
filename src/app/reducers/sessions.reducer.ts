import * as sessions from '@app/actions/sessions.actions';
import { Session } from '@app/model/session';

export interface State {
  sessions: Session[];
  current: Session;
}

export const initialState: State = {
  sessions: [],
  current: null
}

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
}

export function reducer(state = initialState, action: sessions.Actions): State {
  console.debug('SESSION', action);
  switch (action.type) {

    case sessions.LOAD_ALL_SUCCESS: {
      return newState(state, {sessions: (<sessions.LoadAllSuccessAction>action).payload});
    }

     case sessions.LOAD_FAIL: {
      console.error('load fialed, ' + action.payload);
    }

    default: {
      return state;
    }
  }
}

export const getSessions = (state:State) => state.sessions;
