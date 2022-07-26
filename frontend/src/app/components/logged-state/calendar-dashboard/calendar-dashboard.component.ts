import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html',
  styleUrls: ['./calendar-dashboard.component.scss']
})
export class CalendarDashboardComponent implements OnInit {

  @Input() userData: any = {};
  
  constructor() { }

  ngOnInit(): void {
  }

}
