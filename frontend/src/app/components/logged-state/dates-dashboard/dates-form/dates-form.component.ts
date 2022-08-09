import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DatesService } from 'src/app/services/datesService/dates.service';
import { getDateTime } from 'src/app/utilities';

@Component({
  selector: 'app-dates-form',
  templateUrl: './dates-form.component.html',
  styleUrls: ['./dates-form.component.scss']
})
export class DatesFormComponent implements OnInit {

  @Input() userData: any = {};
  @Input() selectedDate: any = new Date();

  titleControl: FormControl = new FormControl("");
  descriptionControl: FormControl = new FormControl("");
  dateTimeControl: FormControl = new FormControl(getDateTime(this.selectedDate));

  info: string = "";

  constructor(private ds: DatesService) { }

  ngOnInit(): void { }

  saveDate(): void {
    if (!this.titleControl.value) {
      this.info = "Pass necessary data";
    } else {
      this.ds.saveDate({
        "userID": this.userData._id, 
        "token": localStorage.getItem("token"), 
        "title": this.titleControl.value,
        "description": this.descriptionControl.value,
        "dateTime": this.dateTimeControl.value
      })
    }
    setTimeout(() => {
      this.info = "";
    }, 5000);
  }

  clearForm(): void {
    this.titleControl.setValue("");
    this.descriptionControl.setValue("");
    this.dateTimeControl.setValue(getDateTime(this.selectedDate));
  }

}
