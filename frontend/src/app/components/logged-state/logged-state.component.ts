import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-logged-state',
  templateUrl: './logged-state.component.html',
  styleUrls: ['./logged-state.component.scss']
})
export class LoggedStateComponent implements OnInit {

  userData: any = {};

  tab: string = "calendar";
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
