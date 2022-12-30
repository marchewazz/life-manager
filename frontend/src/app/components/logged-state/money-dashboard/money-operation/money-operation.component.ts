import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MoneyService } from 'src/app/services/moneyService/money.service';

import { countRemainingTime } from 'src/app/utilities';

@Component({
  selector: 'app-money-operation',
  templateUrl: './money-operation.component.html',
  styleUrls: ['./money-operation.component.scss']
})
export class MoneyOperationComponent implements OnInit, OnDestroy {

  @Input() operationData: any;
  @Input() userData: any = {};
  
  titleControl: FormControl = new FormControl("");
  dateTimeControl: FormControl = new FormControl("");
  directionControl: FormControl = new FormControl("");
  secondSideControl: FormControl = new FormControl("");
  amountControl: FormControl = new FormControl((Math.round(0 * 100) / 100).toFixed(2));

  countdownTimer: any;

  editData: boolean = false;

  constructor(private ms: MoneyService) { }

  ngOnInit(): void {
    this.titleControl.setValue(this.operationData.title);
    this.dateTimeControl.setValue(this.operationData.dateTime);
    this.directionControl.setValue(this.operationData.direction);
    this.secondSideControl.setValue(this.operationData.secondSide);
    this.amountControl.setValue((Math.round(this.operationData.amount * 100) / 100).toFixed(2))

    let nowDate = new Date();
    nowDate.setSeconds(0);
    nowDate.setMilliseconds(0);
    // FIRST OF ALL WE CLEAR SECONDS AND MILLISECONDS
    // BECAUSE IT IS NOT AVAILABLE IN FORMS WE USE
    if (nowDate < new Date(this.operationData.dateTime)) {
      // ONCE DATE IN THE EVENT IS IN PAST THERE IS NO POINT TO CHECK ANYTHING
      this.operationData["in"] = countRemainingTime(new Date(this.operationData.dateTime))
      this.countdownTimer = this.initInterval();
    }
  } 

  ngOnDestroy(): void {
    clearInterval(this.countdownTimer)
  }

  initInterval() {
    let nowDate = new Date();
    nowDate.setSeconds(0);
    nowDate.setMilliseconds(0);
    const countdownInterval = setInterval(() => {
      // EVERY SECOND WE CHECK IF MINUTE DIDNT CHANGE TO REFRESH THE TEXT
      if (nowDate.getMinutes() != new Date().getMinutes()){
        nowDate = new Date();
        nowDate.setSeconds(0);
        nowDate.setMilliseconds(0);
        // CLEARING MS AGAIN
        if (nowDate.getTime() >= new Date(this.operationData.dateTime).getTime()) {
          // IF USER WILL STAY FOR LONG LONG TIME ON SCREEN AND TIME WILL COME
          // WE CLEAR TEXT AND STOP INTERVAL
          this.operationData["in"] = "";
          clearInterval(this.countdownTimer);
        } else {
          // COUNT THE TIME
          this.operationData["in"] = countRemainingTime(new Date(this.operationData.dateTime))
        }
      }
    }, 1000)
    return countdownInterval
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
