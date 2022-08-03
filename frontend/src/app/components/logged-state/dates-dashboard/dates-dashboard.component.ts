import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { getDatesPastAndUpcoming } from 'src/app/utilities';

@Component({
  selector: 'app-dates-dashboard',
  templateUrl: './dates-dashboard.component.html',
  styleUrls: ['./dates-dashboard.component.scss']
})
export class DatesDashboardComponent implements OnInit {

  @Input() userData: any = {};
  
  datesTabControl: FormControl = new FormControl("");
  pastAndUpcomingDates: any = {};

  datesTabs: string[] = ["past", "upcoming"];

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.pastAndUpcomingDates = getDatesPastAndUpcoming(this.userData.dates.dates)
    }, 1000)
  }

}
