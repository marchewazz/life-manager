import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisteringUserModel } from 'src/app/models/registeringUserModel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  registerUser(userData: RegisteringUserModel): Observable<Object> {
    return this.http.post(`http://localhost:3000/accounts/register`, userData)
  }

}
