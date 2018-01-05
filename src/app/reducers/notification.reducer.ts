import * as notify from '@app/actions/notification.actions';

export type State = {
  error: Error[],
  info: string[],
}

export const initialState: State = {
  error: [],
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

    default: {
      return state;
    }
  }
}

export const getErrors = (state:State) => state.error;
export const getInfos = (state:State) => state.info;
