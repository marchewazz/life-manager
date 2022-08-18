import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NotesService } from 'src/app/services/notesService/notes.service';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.scss']
})
export class NoteDisplayComponent implements OnInit {

  @Input() noteData: any;
  @Input() userData: any = {};

  titleControl: FormControl = new FormControl("");
  descriptionControl: FormControl = new FormControl("");
  
  editData: boolean = false;

  constructor(private ns: NotesService) { }

  ngOnInit(): void {
    this.titleControl.setValue(this.noteData.title);
    this.descriptionControl.setValue(this.noteData.description);
  }

  deleteNote(noteID: string): void {
    this.ns.deleteNote({"userID": this.userData._id, "token": localStorage.getItem("token"), "noteID": noteID})
  }
  
  editNote(): void {
    const formNoteData = {
      noteID: this.noteData.noteID,
      title: this.titleControl.value,
      description: this.descriptionControl.value,
      token: localStorage.getItem("token"),
      userID: this.userData._id
    }
    if (!formNoteData.title && !formNoteData.description) {
      this.editData = false;
    } else if (formNoteData.title == this.noteData.title && formNoteData.description == this.noteData.description) {
      this.editData = false;
    } else {
      this.ns.editNote(formNoteData);
    }
  }
}
