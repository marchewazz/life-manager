import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  isLogged: boolean = false;

  constructor() { 
    setInterval(() => {
      if (localStorage.getItem("token")) this.isLogged = true;
      else this.isLogged = false
    } ,1)
  }
}

