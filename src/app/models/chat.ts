export class Chat {
  sender?: string;
  receiverId?: number;
  time?: Date;
  message: string;

  constructor(msg: string, owner: string, receiver: number = null) {
    this.sender = owner;
    this.message = msg;
    if (receiver) {
      this.receiverId = receiver;
    }
  }
}
