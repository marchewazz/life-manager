import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { monthsNames, daysNames } from 'src/app/utilities';

@Component({
  selector: 'app-calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html',
  styleUrls: ['./calendar-dashboard.component.scss']
})
export class CalendarDashboardComponent implements OnInit {

  @Input() userData: any = {};
  
  daysControl: FormControl = new FormControl(new Date().getDate().toString());
  monthsControl: FormControl = new FormControl(new Date().getMonth().toString());
  yearsControl: FormControl = new FormControl(new Date().getFullYear().toString());

  monthsNames: string[] = monthsNames;
  daysNames: string[] = daysNames;
  years: string[] = [];
  days: Date[] = [];

  constructor() {
    for(let i = 2010; i<= 2024; i++) this.years.push(i.toString())
  }

  ngOnInit(): void {
    this.getNumberOfDays()
  }

  getNumberOfDays(): void {
    this.days = [];
    const numberOfDays = new Date(this.yearsControl.value, this.monthsControl.value, 0).getDate();
    for(let i = 1; i <= numberOfDays; i++) this.days.push(new Date(this.yearsControl.value, this.monthsControl.value - 1, i))
    if (parseInt(this.daysControl.value) > numberOfDays) this.daysControl.setValue(numberOfDays.toString());
  }
}
