import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private socket: Socket) { }

  sendNote(note: any) {
    this.socket.emit("sendNote", note)
  }

  deleteNote(note: any) {
    this.socket.emit("deleteNote", note)
  }
}
