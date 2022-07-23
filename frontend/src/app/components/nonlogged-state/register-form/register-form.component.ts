import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RegisteringUserModel } from 'src/app/models/registeringUserModel.model';

import { AccountsService } from 'src/app/services/accountsService/accounts.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  nameControl: FormControl = new FormControl("");
  emailControl: FormControl = new FormControl("");
  passwordControl: FormControl = new FormControl("");
  reapatedPasswordControl: FormControl = new FormControl("");

  info: string = "";

  constructor(private as: AccountsService) { }

  ngOnInit(): void { }

  registerUser() {

    const userData: RegisteringUserModel = {
      "accountName": this.nameControl.value,
      "accountEmail": this.emailControl.value,
      "accountPassword": this.passwordControl.value
    }

    if (!Object.values(userData).some((element: string) => element != "")) {
      this.info = "smth empty";
    } else if (!new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$").test(userData.accountEmail)){
      this.info = "wrogn email";
    } else if (userData.accountPassword != this.reapatedPasswordControl.value) {
      this.info = "password doesnt match";
    } else if (!new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$").test(userData.accountPassword)) {
      this.info = "password wrong";
    } else {
      this.as.registerUser(userData).subscribe((res: any) => {
        this.info = res.message;
        setTimeout(() => {
          this.info = "";
        }, 5000);
      })
    }
  }

}
