import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor(private socket: Socket) { }

  saveDate(date: any) { 
    this.socket.emit("saveDate", date);
  }

  deleteDate(date: any) { 
    this.socket.emit("deleteDate", date);
  }

  editDate(date: any) {
    this.socket.emit("editDate", date)
  }

}
