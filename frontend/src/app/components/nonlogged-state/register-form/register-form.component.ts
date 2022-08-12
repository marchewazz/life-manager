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
      "accountPassword": this.passwordControl.value,
      "accountRepeatedPassword": this.reapatedPasswordControl.value,
    }

    if (Object.values(userData).some((element: string) => element == "")) {
      this.info = "Some inputs are empty";
    } else if (!new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$").test(userData.accountEmail)){
      this.info = "Wrong email format";
    } else if (userData.accountPassword != this.reapatedPasswordControl.value) {
      this.info = "Passwords are not the same";
    } else if (!new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$").test(userData.accountPassword)) {
      this.info = "Password doesn't match requirments (1 upper case, 1 lower case, 1 number, at least 8 digits)";
    } else {
      this.as.registerUser(userData).subscribe((res: any) => {
        this.info = res.message;
      })
    }
    setTimeout(() => {
      this.info = "";
    }, 5000);
  }

  clearForm() {
    this.emailControl.setValue("");
    this.nameControl.setValue("");
    this.passwordControl.setValue("");
    this.reapatedPasswordControl.setValue("");
  }

}
