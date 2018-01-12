import * as notify from '@app/actions/notification.actions';

import { Chat } from '@app/model/chat';

export type State = {
  error: Error[],
  messages: Chat[],
}

export const initialState: State = {
  error: [],
  messages: []
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

    case notify.SEND_MESSAGE_SUCCESS:
    case notify.RECEIVED_MESSAGE: {
      return {
        ...state,
        messages: [(<notify.ReceivedAction>action).payload, ...state.messages],
      };
    }

    default: {
      return state;
    }
  }
}

export const getErrors = (state:State) => state.error;
export const getMessages = (state:State) => state.messages;
