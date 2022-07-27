import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  constructor(private socket: Socket) { }

  updateBalance(balance: any) {
    this.socket.emit("updateBalance", balance)
  }

}
