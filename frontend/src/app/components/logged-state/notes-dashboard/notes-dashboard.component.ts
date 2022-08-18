import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-dashboard',
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.scss']
})
export class NotesDashboardComponent implements OnInit {

  @Input() userData: any = {};

  constructor() { }

  ngOnInit(): void { }

}
