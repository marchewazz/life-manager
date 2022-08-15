import { Component, Input, OnInit } from '@angular/core';

import { sortDatesArray } from 'src/app/utilities';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {

  @Input() userData: any = {};

  upcomingEvents: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.upcomingEvents = sortDatesArray((this.userData.dates.dates.concat(this.userData.dates.money)).filter((date: any) => new Date(date.dateTime) > new Date())).slice(0, 3);
    // THIS LINE CONCATS ARRAY OF DATES AND ARRAY OF MONEY OPERATIONS
    // THEN IT CHOOSES ONLY FUTURE
    // AFTER IT GETS FIRST THREE 
    console.log(this.upcomingEvents);
    
  }

  isOperation(date: any) {
    if ("amount" in date) return true
    else return false
  }
}
