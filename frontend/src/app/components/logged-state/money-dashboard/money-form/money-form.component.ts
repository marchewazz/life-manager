import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MoneyService } from 'src/app/services/moneyService/money.service';
import { getDateTime } from 'src/app/utilities';

@Component({
  selector: 'app-money-form',
  templateUrl: './money-form.component.html',
  styleUrls: ['./money-form.component.scss']
})
export class MoneyFormComponent implements OnInit {

  @Input() userData: any = {};
  @Input() selectedDate: any = new Date();

  titleControl: FormControl = new FormControl("");
  dateTimeControl: FormControl = new FormControl(getDateTime(this.selectedDate));
  directionControl: FormControl = new FormControl("ingoing");
  secondSideControl: FormControl = new FormControl("");
  amountControl: FormControl = new FormControl("0.00");

  constructor(private ms: MoneyService) { }

  ngOnInit(): void {
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
