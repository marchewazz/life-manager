import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DatesService } from 'src/app/services/datesService/dates.service';

@Component({
  selector: 'app-date-display',
  templateUrl: './date-display.component.html',
  styleUrls: ['./date-display.component.scss']
})
export class DateDisplayComponent implements OnInit {

  @Input() dateData: any;
  @Input() userData: any = {};
  
  titleControl: FormControl = new FormControl("");
  descriptionControl: FormControl = new FormControl("");
  dateTimeControl: FormControl = new FormControl("");

  editData: boolean = false;

  constructor(private ds: DatesService) { }

  ngOnInit(): void {
    this.titleControl.setValue(this.dateData.title);
    this.descriptionControl.setValue(this.dateData.description);
    this.dateTimeControl.setValue(this.dateData.dateTime)
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
