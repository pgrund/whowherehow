import * as error from '@app/actions/error.actions';

export type State = Error[];

export const initialState: State = []

export function reducer(state = initialState, action: error.Actions): State {
  console.debug('ERROR', action);
  switch (action.type) {
    case error.ERROR_ADD: {

      return [...state, (<error.AddErrorAction>action).payload];
    }

    case error.ERROR_ACK: {
      let index:number = (<error.AckErrorAction>action).payload;
      return state.filter((_, idx) => idx != index);
    }

    default: {
      return state;
    }
  }
}
