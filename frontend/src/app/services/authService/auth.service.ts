import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private socket: Socket) { }

  getUserData() { 
    this.socket.emit("userData", {"token": localStorage.getItem("token")});
  }

  onGetUserData() {
    return this.socket.fromEvent("userData");
  }

  logout(userID: string) {
    this.socket.emit("logout", {"userID": userID, "token": localStorage.getItem("token")})
  }
}
