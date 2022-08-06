import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AccountsService } from 'src/app/services/accountsService/accounts.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {

  @Input() userData: any = {};

  editData: boolean = false;

  nameControl: FormControl = new FormControl();
  emailControl: FormControl = new FormControl();

  info: string = "";

  constructor(private as: AccountsService) { }

  ngOnInit(): void {
    this.nameControl.setValue(this.userData.accountName);
    this.emailControl.setValue(this.userData.accountEmail);
  }

  submitData(): void {
    if (!this.nameControl.value || !this.emailControl.value) {
      console.log(`error`);
    } else {
      if (this.nameControl.value != this.userData.accountName || this.emailControl.value != this.userData.accountEmail) {
        const data = {
          accountEmail: this.emailControl.value,
          accountName: this.nameControl.value,
          accountID: this.userData._id,
          token: localStorage.getItem("token")
        }
        this.as.editUserData(data)
      }
      this.editData = false;
    }
  }

}
