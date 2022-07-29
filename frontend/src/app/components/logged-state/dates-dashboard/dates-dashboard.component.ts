import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dates-dashboard',
  templateUrl: './dates-dashboard.component.html',
  styleUrls: ['./dates-dashboard.component.scss']
})
export class DatesDashboardComponent implements OnInit {

  @Input() userData: any = {};
  
  constructor() { }

  ngOnInit(): void {
  }

}
