import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-notes-dashboard',
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.scss']
})
export class NotesDashboardComponent implements OnInit {

  @Input() userData: any = {};
  @Input() mobileLayout: any;

  mobileTabs: any[] = ["Notes", "add"];

  mobileTabControl: FormControl = new FormControl(this.mobileTabs[0]);

  constructor() { }

  ngOnInit(): void { }

}
