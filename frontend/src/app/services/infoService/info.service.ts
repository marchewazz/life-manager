import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private socket: Socket) { }

  onGetInfo() {
    return this.socket.fromEvent("sendInfo");
  }
}
