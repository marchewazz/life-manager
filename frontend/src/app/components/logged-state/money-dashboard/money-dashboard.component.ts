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

  balanceControl: FormControl = new FormControl()
  
  editBalance: boolean = false;

  constructor(private ms: MoneyService) { }

  ngOnInit(): void {
    this.balanceControl.setValue(this.userData.balance.toString());
  }

  sendBalance(): void {
    this.ms.updateBalance({"userID": this.userData._id, "token": localStorage.getItem("token"), "newBalance": this.balanceControl.value});
    this.balanceControl.setValue(this.userData.balance.toString());
    this.editBalance = false;
  }

}
