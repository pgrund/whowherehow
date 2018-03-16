import { BreadcrumbListComponent } from "./breadcrumb-list/breadcrumb-list.component";
import { ChatNotificationComponent } from "./chat-notification/chat-notification.component";
import { ChatItemComponent } from "./chat-item/chat-item.component";
import { ErrorNotificationComponent } from "./error-notification/error-notification.component";
import { ChatSendComponent } from "./chat-send/chat-send.component";
import { CardComponent } from "./card/card.component";

export const components = [
  BreadcrumbListComponent,
  ChatNotificationComponent,
  ChatItemComponent,
  ChatSendComponent,
  ErrorNotificationComponent,
  CardComponent
];

export const entryComponents = [
  ChatNotificationComponent,
  ErrorNotificationComponent
];

export * from "./card/card.component";
export * from "./breadcrumb-list/breadcrumb-list.component";
export * from "./chat-item/chat-item.component";
export * from "./chat-send/chat-send.component";
export * from "./chat-notification/chat-notification.component";
export * from "./error-notification/error-notification.component";
