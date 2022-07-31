import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-logged-state',
  templateUrl: './logged-state.component.html',
  styleUrls: ['./logged-state.component.scss']
})
export class LoggedStateComponent implements OnInit {

  userData: any = {};

  tabs: string[] = ["calendar", "dates", "notes", "money", "profile"];
  tabControl: FormControl = new FormControl(this.tabs[0])
  ready: boolean = false;

  constructor(private as: AuthService) { }

  ngOnInit(){ 
    this.getUserData()
  }
  
  getUserData() {
    this.as.getUserData();
    this.as.onGetUserData().subscribe((res: any) => {
      this.userData = res.userData;
      this.ready = true;
    })
  }
}
