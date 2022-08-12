import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nonlogged-state',
  templateUrl: './nonlogged-state.component.html',
  styleUrls: ['./nonlogged-state.component.scss']
})
export class NonloggedStateComponent implements OnInit {

  tabs: string[] = ["login", "register"];
  tabControl: FormControl = new FormControl("login");

  constructor() { }

  ngOnInit(): void { }

}
