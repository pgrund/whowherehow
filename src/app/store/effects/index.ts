import { RouterEffects } from "./router.effects";
import { LoginEffects } from "./login.effects";
import { NotificationEffects } from "./notification.effects";

export const effects: any[] = [
  RouterEffects,
  LoginEffects,
  NotificationEffects
];

export * from "./router.effects";
export * from "./login.effects";
export * from "./notification.effects";
