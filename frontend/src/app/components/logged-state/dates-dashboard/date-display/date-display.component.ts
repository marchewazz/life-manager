import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-display',
  templateUrl: './date-display.component.html',
  styleUrls: ['./date-display.component.scss']
})
export class DateDisplayComponent implements OnInit {

  @Input() dateData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
