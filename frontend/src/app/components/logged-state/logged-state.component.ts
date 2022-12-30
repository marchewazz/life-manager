import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/authService/auth.service';
import { sortDatesArray } from 'src/app/utilities';

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

  width: number = window.innerWidth

  constructor(private as: AuthService) { }

  ngOnInit(){  
    this.getUserData()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = window.innerWidth
  }

  getUserData() {
    this.as.getUserData();
    this.as.onGetUserData().subscribe((res: any) => {
      if (res.valid) {
        this.userData = res.userData;
        this.userData.dates.money = sortDatesArray(this.userData.dates.money);
        this.userData.dates.dates = sortDatesArray(this.userData.dates.dates);
        this.ready = true;
      } else {
        localStorage.setItem("token", "")
      }
    })
  }

  logout() {
    this.as.logout(this.userData._id)
    localStorage.setItem("token", "")
  }

}
