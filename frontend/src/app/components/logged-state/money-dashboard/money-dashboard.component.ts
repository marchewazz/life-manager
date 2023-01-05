import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MoneyService } from 'src/app/services/moneyService/money.service';
import { getDatesPastAndUpcoming } from 'src/app/utilities';

@Component({
  selector: 'app-money-dashboard',
  templateUrl: './money-dashboard.component.html',
  styleUrls: ['./money-dashboard.component.scss']
})
export class MoneyDashboardComponent implements OnInit {

  @Input() userData: any = {};
  @Input() mobileLayout: any;
  
  balanceControl: FormControl = new FormControl();
 
  editBalance: boolean = false;

  operationsTabControl: FormControl = new FormControl("");
  pastAndUpcomingOperations: any = {};

  operationsTabs: string[] = ["past", "upcoming"];
  
  mobileTabs: string[] = ["Money", "add"];
  // money doesnt not work dont know why
  mobileTabControl: FormControl = new FormControl(this.mobileTabs[0]);

  constructor(private ms: MoneyService) { }

  ngOnInit(): void {
    this.balanceControl.setValue(this.userData.balance.toString());
    setInterval(() => {
      this.pastAndUpcomingOperations = getDatesPastAndUpcoming(this.userData.dates.money);
    }, 1000)
  }

  sendBalance(): void {
    this.ms.updateBalance({"userID": this.userData._id, "token": localStorage.getItem("token"), "newBalance": this.balanceControl.value});
    this.balanceControl.setValue(this.balanceControl.value);
    this.editBalance = false;
  }
}
