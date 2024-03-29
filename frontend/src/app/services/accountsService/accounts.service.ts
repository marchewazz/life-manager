import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Socket } from 'ngx-socket-io';

import { RegisteringUserModel } from 'src/app/models/registeringUserModel.model';
import { LoggingUserModel } from 'src/app/models/loggingUserModel.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient, private socket: Socket) { }

  registerUser(userData: RegisteringUserModel): Observable<Object> {
    return this.http.post(`http://localhost:3000/accounts/register`, userData)
  }

  loginUser(userData: LoggingUserModel): Observable<Object> {
    return this.http.post(`http://localhost:3000/accounts/login`, userData)
  }

  editUserData(userData: any) {
    this.socket.emit("editUserData", userData);
  }

}
