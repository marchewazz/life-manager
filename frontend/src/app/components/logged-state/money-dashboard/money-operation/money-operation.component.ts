import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MoneyService } from 'src/app/services/moneyService/money.service';

@Component({
  selector: 'app-money-operation',
  templateUrl: './money-operation.component.html',
  styleUrls: ['./money-operation.component.scss']
})
export class MoneyOperationComponent implements OnInit {

  @Input() operationData: any;
  @Input() userData: any = {};
  
  titleControl: FormControl = new FormControl("");
  dateTimeControl: FormControl = new FormControl("");
  directionControl: FormControl = new FormControl("");
  secondSideControl: FormControl = new FormControl("");
  amountControl: FormControl = new FormControl((Math.round(0 * 100) / 100).toFixed(2));

  editData: boolean = false;

  constructor(private ms: MoneyService) { }

  ngOnInit(): void {
    this.titleControl.setValue(this.operationData.title);
    this.dateTimeControl.setValue(this.operationData.dateTime);
    this.directionControl.setValue(this.operationData.direction);
    this.secondSideControl.setValue(this.operationData.secondSide);
    this.amountControl.setValue((Math.round(this.operationData.amount * 100) / 100).toFixed(2))
  }

  deleteOperation() {
    this.ms.deleteOperation({"userID": this.userData._id, "token": localStorage.getItem("token"), "operationID": this.operationData.operationID})
  }

  editOperation() {
    const formOperationData = {
      operationID: this.operationData.operationID,
      title: this.titleControl.value,
      dateTime: this.dateTimeControl.value,
      direction: this.directionControl.value,
      secondSide: this.secondSideControl.value,
      amount: this.amountControl.value,
      token: localStorage.getItem("token"),
      userID: this.userData._id
    }
    if(!this.titleControl.value || !this.amountControl.value) {
      this.editData = false;
    } else {
      formOperationData.amount = (Math.round(Math.abs(formOperationData.amount) * 100) / 100).toFixed(2)
      this.ms.editOperation(formOperationData)
    }
  }

}
