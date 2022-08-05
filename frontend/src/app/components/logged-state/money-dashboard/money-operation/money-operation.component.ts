import { Component, Input, OnInit } from '@angular/core';

import { MoneyService } from 'src/app/services/moneyService/money.service';

@Component({
  selector: 'app-money-operation',
  templateUrl: './money-operation.component.html',
  styleUrls: ['./money-operation.component.scss']
})
export class MoneyOperationComponent implements OnInit {

  @Input() operationData: any;
  @Input() userData: any = {};
  
  constructor(private ms: MoneyService) { }

  ngOnInit(): void {
  }

  deleteOperation(operationID: string) {
    this.ms.deleteOperation({"userID": this.userData._id, "token": localStorage.getItem("token"), "operationID": operationID})
  }

}
