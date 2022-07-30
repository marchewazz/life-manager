import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NotesService } from 'src/app/services/notesService/notes.service';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss']
})
export class NotesFormComponent implements OnInit {

  @Input() userData: any = {};

  titleControl: FormControl = new FormControl("");
  descriptionControl: FormControl = new FormControl("");

  info: string = "";

  constructor(private ns: NotesService) { }

  ngOnInit(): void {
  }

  sendNote(): void {
    if (!this.titleControl.value && !this.descriptionControl.value) this.info = "You need to pass atleast one infomation"
    else {
      this.ns.sendNote({"userID": this.userData._id, "token": localStorage.getItem("token"), "title": this.titleControl.value, "description": this.descriptionControl.value})
      this.clearForm();
    }  
    setTimeout(() => {
      this.info = ""
    }, 5000);
  }

  clearForm(): void {
    this.titleControl.setValue("");
    this.descriptionControl.setValue("");
  }

}
