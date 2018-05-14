import { MySelfService } from './my-self.service';
import { WebSocketService } from './web-socket.service';

export const services = [MySelfService, WebSocketService];

export * from './my-self.service';
export * from './web-socket.service';
