import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketService } from './web-socket.service';

const CHAT_URL = 'ws://localhost:300/api/';

export interface Message {
	author: string,
	message: string
}

@Injectable()
export class ChatService {


  public messages: Subject<Message>;

  	constructor(wsService: WebSocketService) {
  		this.messages = <Subject<Message>>wsService
  			.connect(CHAT_URL)
  			.map((response: MessageEvent): Message => {
  				let data = JSON.parse(response.data);
  				return {
  					author: data.author,
  					message: data.message
  				}
  			});
  	}
}
