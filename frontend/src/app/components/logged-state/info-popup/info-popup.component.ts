import { Component, OnInit } from '@angular/core';

import { InfoService } from 'src/app/services/infoService/info.service';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {

  info: string = "";

  constructor(private is: InfoService) { }

  ngOnInit(): void {
    this.is.onGetInfo().subscribe((res: any) => {
      this.info = res.message;
      setTimeout(() => {
        this.info = "";
      }, 5000);
    })
  }

}
