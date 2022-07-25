import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AccountsService } from 'src/app/services/accountsService/accounts.service';

import { LoggingUserModel } from 'src/app/models/loggingUserModel.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  emailControl: FormControl = new FormControl("");
  passwordControl: FormControl = new FormControl("");

  info: string = "";

  constructor(private as: AccountsService) { }

  ngOnInit(): void {
  }

  loginUser() {
    const userData: LoggingUserModel = {
      accountEmail: this.emailControl.value,
      accountPassword: this.passwordControl.value
    }

    if (!Object.values(userData).some((element: string) => element != "")) {
      this.info = "smth empty";
    } else if (!new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$").test(userData.accountEmail)){
      this.info = "wrogn email";
    } else {
      this.as.loginUser(userData).subscribe((res: any) => {
        localStorage.setItem("token", res.token)
      })
    }
  }

}
