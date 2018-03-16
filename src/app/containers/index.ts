import { LoginComponent } from "./login/login.component";
import { NavComponent } from "./nav/nav.component";
import { AppComponent } from "./app/app.component";
import { ChatComponent } from "./chat/chat.component";
import { NotificationComponent } from "./notification/notification.component";

export const containers = [
  LoginComponent,
  NavComponent,
  AppComponent,
  ChatComponent,
  NotificationComponent
];

export * from "./login/login.component";
export * from "./nav/nav.component";
export * from "./app/app.component";
export * from "./chat/chat.component";
export * from "./notification/notification.component";
