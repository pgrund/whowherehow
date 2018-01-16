import * as notify from '@app/actions/notification.actions';

import { Chat } from '@app/model/chat';
import { Player } from '@app/model/player';

export type State = {
  error: Error[],
  messages: Chat[],
  info: (Player |string)[],
}

export const initialState: State = {
  error: [],
  messages: [],
  info: []
}

export function reducer(state = initialState, action: notify.Actions): State {
  console.debug('NOTIFICATION', action);
  switch (action.type) {
    case notify.ERROR_ADD: {
      return {
        ...state,
        error: [(<notify.AddErrorAction>action).payload, ...state.error ]

      };
    }

    case notify.ERROR_ACK: {
      let index:number = (<notify.AckErrorAction>action).payload;
      return {
        ...state,
        error: state.error.filter((_, idx) => idx != index)
      };
    }

    case notify.ERROR_ACK_ALL: {
      return {
        ...state,
        error: []
      };
    }

    case notify.RECEIVED_MESSAGE: {
      return {
        ...state,
        messages: [(<notify.ReceivedAction>action).payload, ...state.messages],
      };
    }

    case notify.NOTIFY_PLAYER_ADDED:
    case notify.NOTIFY_PLAYER_DROPPED: {
      return {
        ...state,
        info: [(<Player>action.payload), ...state.info],
      };
    }
    default: {
      return state;
    }
  }
}

export const getErrors = (state:State) => state.error;
export const getMessages = (state:State) => state.messages;
export const getInfos = (state:State) => state.info;
