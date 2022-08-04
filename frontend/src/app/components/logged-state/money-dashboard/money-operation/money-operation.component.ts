import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-money-operation',
  templateUrl: './money-operation.component.html',
  styleUrls: ['./money-operation.component.scss']
})
export class MoneyOperationComponent implements OnInit {

  @Input() operationData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
