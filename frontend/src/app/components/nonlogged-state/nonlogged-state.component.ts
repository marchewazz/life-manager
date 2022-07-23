import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nonlogged-state',
  templateUrl: './nonlogged-state.component.html',
  styleUrls: ['./nonlogged-state.component.scss']
})
export class NonloggedStateComponent implements OnInit {

  tab: string = "login";

  constructor() { }

  ngOnInit(): void { }

}
