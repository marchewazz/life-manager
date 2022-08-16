import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/authService/auth.service';

import { monthsNames, daysNames, sortDatesArray } from 'src/app/utilities';

@Component({
  selector: 'app-calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html',
  styleUrls: ['./calendar-dashboard.component.scss']
})
export class CalendarDashboardComponent implements OnInit {

  @Input() userData: any = {};
  
  daysControl: FormControl = new FormControl();
  monthsControl: FormControl = new FormControl();
  yearsControl: FormControl = new FormControl();

  monthsNames: string[] = monthsNames;
  daysNames: string[] = daysNames;
  years: string[] = [];
  days: Date[] = [];

  formTabs: string[] = ["date", "money", "note"];
  formTabControl: FormControl = new FormControl(this.formTabs[0]);

  rightSideTabs: string[] = ["add", "upcoming"];
  rightSideTabsControl: FormControl = new FormControl(this.rightSideTabs[0]);

  selectedDate: Date = new Date(this.yearsControl.value, this.monthsControl.value - 1, this.daysControl.value);
  isDateLater: boolean = false;
  estimatedBalance: number = this.userData.balance;
  eventsOnSelectedDay: any[] = [];

  constructor(private as: AuthService) {
    for(let i = 2010; i<= 2024; i++) this.years.push(i.toString())
  }

  ngOnInit(): void {    
    this.goToToday();  
    this.as.onGetUserData().subscribe((res: any) => {
      this.userData = res.userData;
      this.onChangeDate();
    }) 
  }

  getNumberOfDays(): void {
    this.days = [];
    const numberOfDays = new Date(this.yearsControl.value, this.monthsControl.value, 0).getDate();
    for(let i = 1; i <= numberOfDays; i++) this.days.push(new Date(this.yearsControl.value, this.monthsControl.value - 1, i))
    if (parseInt(this.daysControl.value) > numberOfDays) this.daysControl.setValue(numberOfDays.toString());
  }

  getEventsOnSelectedDay(): void {
    this.eventsOnSelectedDay = [];
    this.selectedDate = new Date(this.yearsControl.value, this.monthsControl.value - 1, this.daysControl.value);
    
    for(const section of Object.keys(this.userData.dates)) {
      for (const date of this.userData.dates[section]) {
        if (date.dateTime) {
          const dateTime = new Date(date.dateTime);
          if (this.selectedDate.getFullYear() === dateTime.getFullYear() 
            && this.selectedDate.getMonth() === dateTime.getMonth() 
            && this.selectedDate.getDate() === dateTime.getDate()) {
              this.eventsOnSelectedDay.push(date)
            }
        }
      }
    }
    this.eventsOnSelectedDay = sortDatesArray(this.eventsOnSelectedDay);
  }

  onChangeDate(): void {
    this.getEventsOnSelectedDay();
    this.isDateLater = this.selectedDate > new Date();
    if (this.isDateLater) {
      this.estimatedBalance = this.userData.balance;
      let moneyOperationToSelectedDate = [];
      for (const operation of this.userData.dates.money) {
        if (operation.dateTime) {
          const operationDate = new Date(new Date(operation.dateTime).getFullYear(), new Date(operation.dateTime).getMonth(), new Date(operation.dateTime).getDate());
          if (operationDate <= this.selectedDate && operationDate >= new Date()) moneyOperationToSelectedDate.push(operation)
        }        
      }
      for (const operation of moneyOperationToSelectedDate) {
        if (operation.direction == "ingoing") this.estimatedBalance = this.estimatedBalance + parseFloat(operation.amount)
        if (operation.direction == "outgoing") this.estimatedBalance = this.estimatedBalance - parseFloat(operation.amount)
      }
      this.estimatedBalance = parseFloat(this.estimatedBalance.toFixed(2));
    }
  }

  isOperation(date: any) {
    if ("amount" in date) return true
    else return false
  }

  goToToday() {
    this.daysControl.setValue(new Date().getDate().toString()); 
    this.monthsControl.setValue((new Date().getMonth() + 1).toString()); 
    this.yearsControl.setValue(new Date().getFullYear().toString()); 
    this.getNumberOfDays();
    this.onChangeDate();
  }
}
