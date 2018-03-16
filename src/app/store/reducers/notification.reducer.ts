import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as notify from "../actions/notification.actions";

import { Chat } from "@app/models/chat";
import { HalLink } from "@app/models/hal";

export interface ErrorState extends EntityState<Error> {}
export interface MessageState extends EntityState<Chat> {}
export interface InfoState extends EntityState<string> {}

export type NotificationState = {
  errors: ErrorState;
  messages: MessageState;
  infos: InfoState;
};

export const errorAdapter: EntityAdapter<Error> = createEntityAdapter<Error>();
export const messageAdapter: EntityAdapter<Chat> = createEntityAdapter<Chat>();
export const infoAdapter: EntityAdapter<string> = createEntityAdapter<string>();

export const initialState: NotificationState = {
  errors: errorAdapter.getInitialState(),
  messages: messageAdapter.getInitialState({
    ids: [1, 2],
    entities: {
      1: {
        message: "from 'spieler1' to 'spieler1'",
        receiverId: 1,
        sender: "spieler1",
        time: new Date(Date.parse("2018-01-16T11:40:47.428Z"))
      },
      2: {
        message: "from 'spieler2' to game",
        receiverId: null,
        sender: "spieler2",
        time: new Date(Date.parse("2018-01-16T11:40:35.111Z"))
      }
    }
  }),
  infos: infoAdapter.getInitialState()
};

export function reducer(
  state = initialState,
  action: notify.NotificationActions
): NotificationState {
  console.debug("NOTIFICATION", action);
  switch (action.type) {
    case notify.ERROR_ADD: {
      const errors = errorAdapter.addOne(action.payload, state.errors);
      return {
        ...state,
        errors
      };
    }

    case notify.ERROR_ACK: {
      const errors = errorAdapter.removeOne(action.payload, state.errors);
      return {
        ...state,
        errors
      };
    }

    case notify.ERROR_ACK_ALL: {
      const errors = errorAdapter.removeAll({ ...state.errors });
      return {
        ...state,
        errors
      };
    }

    case notify.RECEIVED_MESSAGE: {
      const messages = messageAdapter.addOne(action.payload, state.messages);
      return {
        ...state,
        messages
      };
    }

    case notify.NOTIFY_PLAYER_ADDED: {
      const infos = infoAdapter.addOne(
        `player ${action.payload.name} added`,
        state.infos
      );
      return {
        ...state,
        infos
      };
    }
    case notify.NOTIFY_PLAYER_DROPPED: {
      const infos = infoAdapter.addOne(
        `player ${action.payload.name} dropped out`,
        state.infos
      );
      return {
        ...state,
        infos
      };
    }
    case notify.NOTIFY_SESSION_ADDED: {
      const infos = infoAdapter.addOne(
        `game ${action.payload.name} added`,
        state.infos
      );
      return {
        ...state,
        infos
      };
    }
    case notify.NOTIFY_SESSION_DROPPED: {
      const infos = infoAdapter.addOne(
        `game ${action.payload.name} dropped`,
        state.infos
      );
      return {
        ...state,
        infos
      };
    }
    case notify.NOTIFY_SESSION_CLOSED: {
      const infos = infoAdapter.addOne(
        `game ${action.payload.name} closed`,
        state.infos
      );
      return {
        ...state,
        infos
      };
    }
    default: {
      return state;
    }
  }
}

export const getErrors = (state: NotificationState) => state.errors;
export const getMessages = (state: NotificationState) => state.messages;
export const getInfos = (state: NotificationState) => state.infos;

export const {
  selectIds: getMessageIds,
  selectEntities: getMessageEntities,
  selectAll: getAllMessages,
  selectTotal: getMessagesTotal
} = messageAdapter.getSelectors();

export const {
  selectIds: getErrorIds,
  selectEntities: getErrorEntities,
  selectAll: getAllErrors,
  selectTotal: getErrorsTotal
} = errorAdapter.getSelectors();
