import { Injectable } from '@angular/core';
import { Subject, Observer, Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { State } from '@app/reducers';
import { ReceivedAction } from '@app/actions/notification.actions';

import { Chat } from '@app/model/chat';

@Injectable()
export class WebSocketService {

 private readonly DEFAULT_URL = 'ws://localhost:3000/api';

 private subject: Subject<MessageEvent>;
 private socket$;

 constructor(private store:Store<State>) {
   console.log('init websocket ...');
   this.socket$ = Observable.webSocket('ws://localhost:3000/api');

   this.socket$.retry().subscribe(
       (msg) => {
         console.log('message received: ' , msg);
         if(msg.type == 'CHAT') {
           this.store.dispatch(new ReceivedAction(msg.data));
         } else {
           console.warn('unknown ws received', msg);
         }
       },
       (err) => console.log(err),
       () => console.log('complete')
     );


 }

 public sendMessage(msg:Chat) {
   this.socket$.next(JSON.stringify({
     type: 'CHAT',
     data: msg
   }));
 }
 public connect() {
   return new Subject();
 }

//  public connect(url = this.DEFAULT_URL): Subject<MessageEvent> {
//    if (!this.subject) {
//      this.subject = this.create(url);
//      console.log("Successfully connected: " + url);
//    } else {
//      console.log('already connected ...')
//    }
//    return this.subject;
//  }
//
//  private create(url): Subject<MessageEvent> {
//    let ws = new WebSocket(url);
//
//    let observable = Observable.create(
//      (obs: Observer<MessageEvent>) => {
//        ws.onmessage = (data ) => { console.log('DATA', data)}// obs.next.bind(obs);
//        ws.onerror = obs.error.bind(obs);
//        ws.onclose = obs.complete.bind(obs);
//        console.log(ws, obs);
//        return ws.close.bind(ws);
//      })
//    let observer = {
//        next: (data: Object) => {
//          if (ws.readyState === WebSocket.OPEN) {
//            ws.send(JSON.stringify(data));
//          }
//        }
//      }
//     return Subject.create(observer, observable);
//  }
//
//  public chat(): Subject<Chat> {
//    return <Subject<Chat>>this.connect()
//     //  .filter((msg: MessageEvent) => true) // TODO filter for chat only
//       .map((response: MessageEvent): Chat => {
//         console.log('chat message received', response);
//         let data = JSON.parse(response.data);
// 				return <Chat>data;
// 			});
//
// }




  // private socket:WebSocket
  //
  // constructor(private store:Store<State>) {
  //   this.socket = new WebSocket('ws://localhost:3000/api');
  //   this.socket.on('open' , () => {
  //     console.log('connected !!!')
  //     this.socket.send('new player ... ');
  //   }).on('close', (code, reason) => {
  //     console.warn('closing connection (%s): %s', code, reason);
  //   });
  //   this.socket.on('message', (data) => {
  //     console.log(event);
  //     this.store.dispatch(new ReceivedAction(data));
  //   });
  // }
  //
  //
  // public send(message:any) {
  //   if(!this.socket) {
  //     throw new Error('not connected');
  //   }
  //   this.socket.send(JSON.stringify(message));
  //   return true
  // }
}
