import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DatesService } from 'src/app/services/datesService/dates.service';
import { getNowDateTime } from 'src/app/utilities';

@Component({
  selector: 'app-dates-form',
  templateUrl: './dates-form.component.html',
  styleUrls: ['./dates-form.component.scss']
})
export class DatesFormComponent implements OnInit {

  @Input() userData: any = {};

  titleControl: FormControl = new FormControl("");
  descriptionControl: FormControl = new FormControl("");
  dateTimeControl: FormControl = new FormControl(getNowDateTime());

  constructor(private ds: DatesService) { }

  ngOnInit(): void {
    console.log(this.dateTimeControl.value.toString());
  }

  saveDate(): void {
    if (!this.titleControl.value) {
      console.log(`error`);
    } else {
      this.ds.saveDate({
        "userID": this.userData._id, 
        "token": localStorage.getItem("token"), 
        "title": this.titleControl.value,
        "description": this.descriptionControl.value,
        "dateTime": this.dateTimeControl.value
      })
    }
  }

}
