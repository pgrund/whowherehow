import { createSelector } from "@ngrx/store";

import * as fromRoot from "@app/store";
import * as fromFeature from "../reducers";
import * as fromNotification from "../reducers/notification.reducer";

import { Chat } from "@app/models/chat";

export const getMessageState = createSelector(
  fromFeature.getNotificationState,
  fromNotification.getMessages
);
export const getAllMessages = createSelector(
  getMessageState,
  fromNotification.getAllMessages
);
export const getLastMessage = createSelector(
  getAllMessages,
  (messages: Chat[]) => messages.length > 0 && messages.slice(-1)[0]
);

export const getErrorState = createSelector(
  fromFeature.getNotificationState,
  fromNotification.getErrors
);

export const getAllErrors = createSelector(
  getErrorState,
  fromNotification.getAllErrors
);
export const getLastError = createSelector(
  getAllErrors,
  (errors: Error[]) => errors.slice(-1)[0]
);
