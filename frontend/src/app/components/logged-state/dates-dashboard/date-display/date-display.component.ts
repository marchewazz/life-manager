import { Component, Input, OnInit } from '@angular/core';

import { DatesService } from 'src/app/services/datesService/dates.service';

@Component({
  selector: 'app-date-display',
  templateUrl: './date-display.component.html',
  styleUrls: ['./date-display.component.scss']
})
export class DateDisplayComponent implements OnInit {

  @Input() dateData: any;
  @Input() userData: any = {};
  
  constructor(private ds: DatesService) { }

  ngOnInit(): void {
  }

  deleteDate(dateID: string) {
    this.ds.deleteDate({"userID": this.userData._id, "token": localStorage.getItem("token"), "dateID": dateID})
  }

}
