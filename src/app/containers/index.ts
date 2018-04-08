import { NavComponent } from "./nav/nav.component";
import { AppComponent } from "./app/app.component";
import { ChatComponent } from "./chat/chat.component";
import { NotificationComponent } from "./notification/notification.component";

export const containers = [
  NavComponent,
  AppComponent,
  ChatComponent,
  NotificationComponent
];

export * from "./nav/nav.component";
export * from "./app/app.component";
export * from "./chat/chat.component";
export * from "./notification/notification.component";
