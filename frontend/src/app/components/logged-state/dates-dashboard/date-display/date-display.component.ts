import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';

import { DatesService } from 'src/app/services/datesService/dates.service';

import { countRemainingTime } from 'src/app/utilities';

@Component({
  selector: 'app-date-display',
  templateUrl: './date-display.component.html',
  styleUrls: ['./date-display.component.scss']
})
export class DateDisplayComponent implements OnInit, OnDestroy {

  @Input() dateData: any;
  @Input() userData: any = {};
  
  titleControl: FormControl = new FormControl("");
  descriptionControl: FormControl = new FormControl("");
  dateTimeControl: FormControl = new FormControl("");

  countdownTimer: any;

  editData: boolean = false;

  constructor(private ds: DatesService) { }

  ngOnInit(): void {
    this.titleControl.setValue(this.dateData.title);
    this.descriptionControl.setValue(this.dateData.description);
    this.dateTimeControl.setValue(this.dateData.dateTime);

    let nowDate = new Date();
    nowDate.setSeconds(0);
    nowDate.setMilliseconds(0);
    // FIRST OF ALL WE CLEAR SECONDS AND MILLISECONDS
    // BECAUSE IT IS NOT AVAILABLE IN FORMS WE USE
    if (nowDate < new Date(this.dateData.dateTime)) {
      // ONCE DATE IN THE EVENT IS IN PAST THERE IS NO POINT TO CHECK ANYTHING
      this.dateData["in"] = countRemainingTime(new Date(this.dateData.dateTime))
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
        if (nowDate.getTime() >= new Date(this.dateData.dateTime).getTime()) {
          // IF USER WILL STAY FOR LONG LONG TIME ON SCREEN AND TIME WILL COME
          // WE CLEAR TEXT AND STOP INTERVAL
          this.dateData["in"] = "";
          clearInterval(this.countdownTimer);
        } else {
          // COUNT THE TIME
          this.dateData["in"] = countRemainingTime(new Date(this.dateData.dateTime))
        }
      }
    }, 1000)
    return countdownInterval
  }

  deleteDate(dateID: string) {
    this.ds.deleteDate({"userID": this.userData._id, "token": localStorage.getItem("token"), "dateID": dateID})
  }

  editDate() {
    const formDateData = {
      dateID: this.dateData.dateID,
      title: this.titleControl.value,
      description: this.descriptionControl.value,
      dateTime: this.dateTimeControl.value,
      token: localStorage.getItem("token"),
      userID: this.userData._id
    }    
    if (!formDateData.title) {
      this.editData = false;
    } else if (formDateData.title == this.dateData.title && formDateData.description == this.dateData.description && formDateData.dateTime == this.dateData.dateTime) {
      this.editData = false;
    } else {
      this.ds.editDate(formDateData);
    }
  }
}
