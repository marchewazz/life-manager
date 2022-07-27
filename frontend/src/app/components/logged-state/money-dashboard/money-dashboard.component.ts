import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MoneyService } from 'src/app/services/moneyService/money.service';

@Component({
  selector: 'app-money-dashboard',
  templateUrl: './money-dashboard.component.html',
  styleUrls: ['./money-dashboard.component.scss']
})
export class MoneyDashboardComponent implements OnInit {

  @Input() userData: any = {};

  balanceControl: FormControl = new FormControl();
  titleControl: FormControl = new FormControl("");
  dateTimeControl: FormControl = new FormControl("");
  directionControl: FormControl = new FormControl("ingoing");
  secondSideControl: FormControl = new FormControl("");
  amountControl: FormControl = new FormControl("0.00");

  editBalance: boolean = false;

  constructor(private ms: MoneyService) { }

  ngOnInit(): void {
    this.balanceControl.setValue(this.userData.balance.toString());
  }

  sendBalance(): void {
    this.ms.updateBalance({"userID": this.userData._id, "token": localStorage.getItem("token"), "newBalance": this.balanceControl.value});
    this.balanceControl.setValue(this.balanceControl.value);
    this.editBalance = false;
  }

  saveOperation(): void {
    if(!this.titleControl.value || !this.amountControl.value) {
      console.log(`error`);
    } else {
      this.ms.saveOperation({
        "userID": this.userData._id, 
        "token": localStorage.getItem("token"), 
        "title": this.titleControl.value,
        "dateTime": this.dateTimeControl.value, 
        "direction": this.directionControl.value,
        "secondSide": this.secondSideControl.value,
        "amount": this.amountControl.value
      })
    }
  }

  clearForm(): void {
    this.titleControl.setValue("");
    this.dateTimeControl.setValue("");
    this.secondSideControl.setValue("");
    this.amountControl.setValue("0.00");
  }

}
